var Redis = require("ioredis");
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const GRAPHQL_API_KEY = process.env.GRAPHQL_API_KEY;

console.log("check_01")
// if (typeof client === 'undefined') {
//     var client = new Redis.Cluster({
//         port: 6379,
//         host: "clustercfg.matchmakingcluster.aydxwu.use2.cache.amazonaws.com",
//         tls: {},
//     });;
// }

if (typeof redisClient === 'undefined') {
    var redisClient = new Redis.Cluster([
        {
            port: 6379,
            host: "matchmakingcluster-0001-001.matchmakingcluster.aydxwu.use2.cache.amazonaws.com",
            tls: {},
        },
        {
            port: 6379,
            host: "matchmakingcluster-0001-002.matchmakingcluster.aydxwu.use2.cache.amazonaws.com",
            tls: {},
        },
        {
            port: 6379,
            host: "matchmakingcluster-0001-003.matchmakingcluster.aydxwu.use2.cache.amazonaws.com",
            tls: {},
        },
    ], {
            dnsLookup: (address, callback) => callback(null, address),
            redisOptions: {
                tls: true
            }
    });
}
console.log("check_02")



async function invokeLambda(user1, user2) {
    console.log("invoking invokeLambda()");
    console.log("user1: " + JSON.stringify(user1));
    console.log("user2: " + JSON.stringify(user2));

    let access_key_id = ""
    let secret_access_key = ""

    if (process.env.ACCESS_KEY_ID && process.env.SECRET_ACCESS_KEY) {
        access_key_id = process.env.ACCESS_KEY_ID
        secret_access_key = process.env.SECRET_ACCESS_KEY
    } else {
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: "Missing environment variables"
            })
        }
        console.log("ERROR: Missing environment variables")
        return response;
    }

    const creds = {
        accessKeyId: access_key_id,
        secretAccessKey: secret_access_key
    }

    const lambdaClient = new LambdaClient({ 
        credentials: creds,
        region: "us-east-2",
    });
    console.log("calling lambda in east region");
    const payload = {
        user_1: JSON.stringify(user1),
        user_2: JSON.stringify(user2)
    }
    const input = {
        FunctionName: "createGameRoom-staging",
        InvocationType: "Event",
        Payload: JSON.stringify(payload)
    }
    const command = new InvokeCommand(input);
    try {
        const response = await lambdaClient.send(command);
        console.log("response: " + JSON.stringify(response));
    } catch (error) {
        console.log(error);
        let response = {
            'statusCode': 200,
            'body': JSON.stringify({
                result: "result",
            })
        }
        return response;
    }
}

exports.handler = async (event) => {
    let foundMatch = false;
    let opponentUser;
    console.log("event: " + JSON.stringify(event));
    if (event.Records[0].eventName === "INSERT") {
        console.log("connecting to redis...");
        try {
            await redisClient.connect(function () {
                console.log("new connection to redis");
            })
        } catch (err) {
            console.log(err);
        }

        redisClient.on("error", (err) => {
            redisClient.quit();
            console.log("redis_error: " + err);
            return {
                statusCode: 200,
                 headers: {
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Headers": "*"
                 }, 
                body: JSON.stringify('Hello from Lambda!'),
            };
        })
        console.log("check_04")
    
        redisClient.on('connect', function() {
            console.log("connected to redis");
        })
        console.log("check_05")
    
        // grab and store into variable the newly added user that triggered this event
        const newUser = {
            id: event.Records[0].dynamodb.NewImage.id.S,
            name: event.Records[0].dynamodb.NewImage.name.S,
            rating: event.Records[0].dynamodb.NewImage.rating.N,
            createdAt: event.Records[0].dynamodb.NewImage.createdAt.S
        }
        const newUserStr = JSON.stringify(newUser);
        console.log("newUser: " + JSON.stringify(newUser));
        // iterate through the redis cache list
        // - if no users then add the new user and return
        // - if no users in range then add the new user and return
        // - if found match then
        //     - remove opponent from cache [O]
        //     - add newUser and opponent to game room [X]
        //     - remove both players from waiting lobby [X]
        //     - update the User object of both players [X]
        let all;
        console.log("START CHECKING CACHE");
        try {
            all = await redisClient.lrange("user-list", 0, -1);
            console.log("success loading all redis users!");
        } catch (err) {
            console.log(err);
        }
        console.log("END CHECKING CACHE");
        console.log("check_06")
        if (all.length === 0) {
            console.log("NO USERS");
            await redisClient.lpush("user-list", newUserStr);
        } else {
            console.log("LISTING USERS");
            for (let i = 0; i < all.length; i++) {
                console.log("user_" + i + ": " + all[i]);
                const curUser = JSON.parse(all[i]);
                if (curUser.rating >= 600 && curUser.rating <= 800) {
                    console.log("FOUND MATCH");
                    foundMatch = true;
                    opponentUser = curUser;
                    console.log("Removing opponent from redis cache");
                    await redisClient.lrem("user-list", 0, all[i]);
                    // Invoke the create game room user lambda function
                    // console.log("CREATING GAME ROOM");
                    // await invokeLambda(newUser, opponentUser);
                }
            }
        }

        console.log("check_07");
        
        if (foundMatch) {
            console.log("PAIRING USERS: " + newUserStr + " AND " + JSON.stringify(opponentUser));
            await invokeLambda(newUserStr, JSON.stringify(opponentUser));
        } else {
            console.log("NO MATCH FOUND");
            await redisClient.lpush("user-list", newUserStr);
        }
        console.log("check_08")
    
        console.log("disconnecting");
        redisClient.disconnect();
    }

    let response = {
        'statusCode': 200,
        'body': JSON.stringify({
            result: "result",
        })
    }
    return response;

};