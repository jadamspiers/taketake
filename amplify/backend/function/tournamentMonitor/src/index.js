var Redis = require("ioredis");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    let lichessUsername;
    let gameCount;
    let lichessList;
    let mode;
    
    if (event.mode) {
        mode = event.mode;
        console.log("mode: " + mode);
    }

    /**
     * Scan the GameRoomUser's associated with the tournament
     * (right now just grab the first user)
     */
    console.log("setting up DBClient...");
    const gameRoomId = "b5e86ac9-55b3-42eb-baf4-ef5e3fa96bab";
    const dbClient = new DynamoDBClient({ region: "us-east-2" });
    const dbInput = {
        TableName: "GameRoomUser-lv5ggagqpvhzrgebeq7lccsfuy-staging",
        ExpressionAttributeValues: {
            ':gid' : { S: gameRoomId },
        },
        FilterExpression: "gameRoomId = :gid"
    }

    console.log("invoking ScanCommand...");
    const dbCommand = new ScanCommand(dbInput);
    try {
        const response = await dbClient.send(dbCommand);
        lichessUsername = response.Items[0].lichessUsername.S;
        gameCount = response.Items[0].gameCount.N
        console.log("response: " + JSON.stringify(response));
    } catch (err) {
        console.log(err);
    }

    /**
     * Connect to Redis
     */
        /**
     * Store the user in the redis cache if not already there
     */
    console.log("establishing connection to redis...");
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

    redisClient.on('connect', function() {
        console.log("connected to redis");
    })

    /**
     * Execute selected mode
     */
    switch (mode) {
        case 'initial':
            /* Set the initial data of all users in the tournament (init-lichess-list) */
            // add the user to the list
            const newLichessUser = {
                lichessUsername: lichessUsername,
                gameCount: gameCount
            }
            console.log("adding new user to 'init-lichess-list'...");
            try {
                await redisClient.lpush("init-lichess-list", JSON.stringify(newLichessUser));
            } catch (err) {
                console.log(err);
            }

            // then return the initial list
            console.log("getting 'init-lichess-list'...");
            try {
                lichessList = await redisClient.lrange("init-lichess-list", 0, -1);
                console.log("init-lichess-list: " + lichessList);
            } catch (err) {
                console.log(err);
            }
            break;
        case 'current':
            // set the current data of all users in the tournament (cur-lichess-list)
            const updatedLichessUser = {
                lichessUsername: lichessUsername,
                gameCount: gameCount
            }
            console.log("adding current user to 'cur-lichess-list'...");
            try {
                await redisClient.lpush("cur-lichess-list", JSON.stringify(updatedLichessUser));
            } catch (err) {
                console.log(err);
            }
            
            // then return the current list
            console.log("getting 'init-lichess-list'...");
            try {
                lichessList = await redisClient.lrange("cur-lichess-list", 0, -1);
                console.log("cur-lichess-list: " + lichessList);
            } catch (err) {
                console.log(err);
            }
            break;
        default:
            // no mode specified
            console.log("no mode specified");
    }



    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
};
