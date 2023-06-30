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
    /**
     * LIST ALL REDIS CACHE LISTS
     */
    
    console.log("listing 'user-list' redis cache...");
    try {
        const all = await redisClient.lrange("user-list", 0, -1);
        console.log("all: " + all);
    } catch (err) {
        console.log(err);
    }
    
    console.log("listing 'lichess-list' redis cache...");
    try {
        const all = await redisClient.lrange("lichess-list", 0, -1);
        console.log("all: " + all);
    } catch (err) {
        console.log(err);
    }
    
    console.log("listing 'init-lichess-list' redis cache...");
    try {
        const all = await redisClient.lrange("init-lichess-list", 0, -1);
        console.log("all: " + all);
    } catch (err) {
        console.log(err);
    }
    
    console.log("listing 'cur-lichess-list' redis cache...");
    try {
        const all = await redisClient.lrange("cur-lichess-list", 0, -1);
        console.log("all: " + all);
    } catch (err) {
        console.log(err);
    }
    
    console.log("listing 'fin-lichess-list' redis cache...");
    try {
        const all = await redisClient.lrange("fin-lichess-list", 0, -1);
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
