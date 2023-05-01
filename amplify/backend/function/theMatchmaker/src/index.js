var Redis = require("ioredis");

console.log("check_01")
// if (typeof client === 'undefined') {
//     var client = new Redis.Cluster({
//         port: 6379,
//         host: "clustercfg.matchmakingcluster.aydxwu.use2.cache.amazonaws.com",
//         tls: {},
//     });;
// }

if (typeof client === 'undefined') {
    var client = new Redis.Cluster([
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

exports.handler = async (event) => {
    let foundMatch = false;
    let opponentUser;
    console.log("event: " + JSON.stringify(event));
    if (event.Records[0].eventName === "INSERT") {
        client.on("error", (err) => {
            client.quit();
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
    
        client.on('connect', function() {
            console.log("connected to redis");
        })
        console.log("check_05")
    
        // grab and store into variable the newly added user that triggered this event
        const newUser = {
            name: event.Records[0].dynamodb.NewImage.name.S,
            rating: event.Records[0].dynamodb.NewImage.rating.N,
            createdAt: event.Records[0].dynamodb.NewImage.createdAt.S
        }
        const newUserStr = JSON.stringify(newUser);
        console.log("newUser: " + JSON.stringify(newUser));
        console.log("newUser type: " + typeof newUserStr);
        // iterate through the redis cache list
        // - if no users then add the new user and return
        // - if no users in range then add the new user and return
        // - if found match then
        //     - remove opponent from cache [O]
        //     - add newUser and opponent to game room [X]
        //     - remove both players from waiting lobby [X]
        //     - update the User object of both players [X]
    
        // await client.lpush("user-list", newUserStr);
        
        // const popped = await client.lpop("new-list");
        // console.log("popped: " + popped);
        const all = await client.lrange("user-list", 0, -1);
        if (all.length === 0) {
            console.log("NO USERS");
            await client.lpush("user-list", newUserStr);
        } else {
            console.log("LISTING USERS");
            for (let i = 0; i < all.length; i++) {
                console.log("user_" + i + ": " + all[i]);
                const curUser = JSON.parse(all[i]);
                if (curUser.rating >= 600 && curUser.rating <= 800) {
                    console.log("FOUND MATCH");
                    foundMatch = true;
                    opponentUser = curUser;
                    await client.lrem("user-list", 0, all[i]);
                }
            }
        }
        
        if (foundMatch) {
            console.log("PAIRING USERS: " + newUserStr + " AND " + JSON.stringify(opponentUser));
            
        } else {
            console.log("NO MATCH FOUND");
            await client.lpush("user-list", newUserStr);
        }
    
    
        console.log("disconnecting");
        client.disconnect();
    }

    let response = {
        'statusCode': 200,
        'body': JSON.stringify({
            result: "result",
        })
    }
    return response;

};