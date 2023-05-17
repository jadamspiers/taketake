const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require("@aws-sdk/client-apigatewaymanagementapi");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    const data = JSON.parse(event.body).data;
    const connectionId = event.requestContext.connectionId;

    const client = new ApiGatewayManagementApiClient({ region: "us-east-2", endpoint: "https://tshpmo9c9j.execute-api.us-east-2.amazonaws.com/production" });
    const input = {
        ConnectionId: connectionId,
        Data: data
    }
    const command = new PostToConnectionCommand(input);
    try {
        await client.send(command);
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
