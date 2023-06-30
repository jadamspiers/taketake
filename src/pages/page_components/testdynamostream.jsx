const Redis = require('ioredis');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 exports.handler = async (event) => {
    // const redis = new Redis({
    //     host: 'clustercfg.matchmakingcluster.aydxwu.use2.cache.amazonaws.com',
    //     port: 6379
    // });
    
    // redis.on("error", (err) => {
    //     redis.quit();
    //     console.log("redis_error: " + err);
    //     return {
    //         statusCode: 200,
    //          headers: {
    //              "Access-Control-Allow-Origin": "*",
    //              "Access-Control-Allow-Headers": "*"
    //          }, 
    //         body: JSON.stringify('Hello from Lambda!'),
    //     };
    // });
    
    // redis.on("ready", () => {
    //     console.log("REDIS IS READY");
    // });
    
    // console.log("redis: " + JSON.stringify(redis));
    
    // // redis.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

    // // // ioredis supports the node.js callback style
    // // redis.get("mykey", (err, result) => {
    // //   if (err) {
    // //     console.error("redis_error: " + err);
    // //   } else {
    // //     console.log("redis_value: " + result); // Prints "value"
    // //   }
    // // });
    
    // const user = {
    //     name: "Bob",
    //     age: "20",
    //     description: "I am a programmer",
    // };
    
    // try {
    //     await redis.mset(user);
    // } catch (error) {
    //     console.log(error);
    // }
    
    // try {
    //     const name = await redis.get("name");
    //     console.log("name: " + name);
    // } catch (error) {
    //     console.log(error);
    // }


    // console.log(`EVENT: ${JSON.stringify(event)}`);
    
    // const users = [];

    // // build a list of users and constantly update it when a new user is given

    // // before parsing the mongodb event, lo
    
    // event.Records.forEach((record) => {
    //     console.log('Stream record: ', JSON.stringify(record, null, 2));
    //     if (record.eventName == 'INSERT') {
    //         var name = JSON.stringify(record.dynamodb.NewImage.name.S);
    //         var rating = JSON.stringify(record.dynamodb.NewImage.rating.N);
    //         var status = JSON.stringify(record.dynamodb.NewImage.status.S);
    //         console.log("{ name : " + name + " , rating: " + rating + ", status: " + status + " }");
    //     }
    // })
    
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
};
