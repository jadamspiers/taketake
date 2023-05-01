const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const lambdaClient = new LambdaClient({ region: 'us-east-2' });

exports.handler = async (event) => {

    console.log("calling websocket lambda in east region");
    const input = {
        FunctionName: "wsMatchmakingApiHandler-staging"
    }
    const command = new InvokeCommand(input);
    try {
        const response = await lambdaClient.send(command);
        console.log("response: " + JSON.stringify(response));
    } catch (error) {
        console.log(error);
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
