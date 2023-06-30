var Redis = require("ioredis");
const { DynamoDBClient, ScanCommand, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

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

    let userCount;

    // 1. Scan the GameRoomUser's associated with the tournament
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
    const dbScanCommand = new ScanCommand(dbInput);
    try {
        const response = await dbClient.send(dbScanCommand);
        userCount = response.Items.length;
    } catch (err) {
        console.log(err);
    }

    // 2. Delete each retrieved GameRoomUser
    console.log("deleting GameRoomUsers...");
    for (let i = 0; i < userCount; i++) {
        const dbInput = {
            TableName: "GameRoomUser-lv5ggagqpvhzrgebeq7lccsfuy-staging",
            Key: {
                "id": { S: response.Items[i].id.S }
            }
        }
    }
    const dbDeleteCommand = new DeleteItemCommand(dbInput);
    try {
        const response = await dbClient.send(dbDeleteCommand);
        console.log("dbDeleteCommand response: " + JSON.stringify(response));
    } catch (err) {
        console.log(err);
    }

    // 3. Delete the GameRoom (tournament)
    // 4. Delete the Redis cache for the tournament
    // clear 'user-list'
    console.log("attempting to remove all cache lists from tournament...");
    try {
        await redisClient.del("init-lichess-list");
        await redisClient.del("cur-lichess-list");
        await redisClient.del("fin-lichess-list");
    } catch (err) {
        console.log(err);
    }

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
};
