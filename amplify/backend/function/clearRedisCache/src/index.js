var Redis = require("ioredis");

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
    // clear redis cache
    console.log("attempting to remove all items from list");
    try {
        await redisClient.del("user-list");
        console.log("successfully deleted the list");
    } catch (err) {
        console.log(err);
    }
    
    // check to see if empty
    console.log("listing redis cache");
    try {
        const all = await redisClient.lrange("user-list", 0, -1);
        console.log("all: " + all);
    } catch (err) {
        console.log(err);
    }

    console.log(`EVENT: ${JSON.stringify(event)}`);
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
