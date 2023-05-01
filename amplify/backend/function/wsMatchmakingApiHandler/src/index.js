const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require("@aws-sdk/client-apigatewaymanagementapi");

const ENDPOINT = 'https://p7nu0qlmg4.execute-api.us-east-2.amazonaws.com/production/'
const client = new ApiGatewayManagementApiClient({ region: "us-west-2", endpoint: ENDPOINT });

const sendToOne = async (id, body) => {
    const command = new PostToConnectionCommand({
        Data: Buffer.from(JSON.stringify(body)), // required
        ConnectionId: id, // required
    })
    try {
        const response = await client.send(command);
    } catch (err) {
        console.log(err);
    }
}

const sendToAll = async (ids, body) => {
    const all = ids.map(i => sendToOne(i, body));
    return Promise.all(all);
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    if (event.requestContext) {
        const connectionId = event.requestContext.connectionId;
        const routeKey = event.requestContext.routeKey;
        let body = {};
        try {
            if (event.body) {
                body = JSON.parse(event.body);
            }
        } catch (err) {
            // code
        }

        switch(routeKey) {
            case '$connect':
                break;
            case '$disconnect':
                break;
            case '$default':
                break;
            case 'sendRequest':
                await sendToAll([connectionId], { publicMessage: 'this is a public message' });
                break;
            default:
                // code
        }
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
