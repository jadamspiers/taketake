var Redis = require("ioredis");

if (typeof client === 'undefined') {
    var client = new Redis({
        port: 6379,
        host: "clustercfg.matchmakingcluster.aydxwu.use2.cache.amazonaws.com",
        tls: {},
    });;
}
exports.handler = async (event) => {
 
    console.log("client: " + JSON.stringify(client));


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

    client.connect(function () {
        console.log("connected to redis");
    })

    client.set("mykey", "value");
    client.get("mykey", (err, result) => {
        if (err) {
            console.log(err);
            console.log("error");
        } else {
            console.log(result);
            console.log("hello");
        }
    });
    console.log("disconnecting");
    client.disconnect();

    let response = {
        'statusCode': 200,
        'body': JSON.stringify({
            result: "result",
        })
    }
    return response;

};