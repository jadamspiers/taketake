const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require("@aws-sdk/client-apigatewaymanagementapi");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    // TODO:
    // Prerequisite: ensure that the opponent's connectionId is already stored
    // 1. get the client's connectionId
    // 2. search the dynamodb for the GameRoom id associated with the connectionId
    // 3. find the opponent and store their connectionId
    // 4. then send moves
    
    // Modified:
    // 1. accept the gameRoomId and the opponentId
    // 2. search the dynamodb for the connectionId associated with the opponentId
    // 3. send the move to that connectionId

    /**
     * START MOD
     */
    const data = JSON.parse(event.body).data;
    console.log("data: " + data);
    const dataObj = JSON.parse(data);
    console.log("data.gameRoomId: " + dataObj.gameRoomId);
    /**
     * END MOD
     */

    // // just send a message to the current client
    // const userId = JSON.parse(event.body).data;
    // const connectionId = event.requestContext.connectionId;
    // let gameRoomId;

    // // get the GameRoomUser item that is equal to the gameRoomId, but isn't equal
    // // to this current user's id
    // const dbClient = new DynamoDBClient({ region: "us-east-2" });
    // const dbInput = {
    //     TableName: "GameRoomUser-lv5ggagqpvhzrgebeq7lccsfuy-staging",
    //     ExpressionAttributeValues: {
    //         ':uid' : { S: userId },
    //     },
    //     FilterExpression: "userId = :uid"
    // }

    // const dbCommand = new ScanCommand(dbInput);
    // try {
    //     const response = await dbClient.send(dbCommand);
    //     console.log("response: " + JSON.stringify(response));
    //     gameRoomId = response.Items[0].gameRoomId.S;
    // } catch (err) {
    //     console.log(err);
    // }
    
    // // send a message to the client
    // const apiClient = new ApiGatewayManagementApiClient({ region: "us-east-2", endpoint: "https://tshpmo9c9j.execute-api.us-east-2.amazonaws.com/production" });
    // const apiInput = {
    //     ConnectionId: connectionId,
    //     Data: userId
    // }
    // const apiCommand = new PostToConnectionCommand(apiInput);
    // try {
    //     await apiClient.send(apiCommand);
    // } catch (err) {
    //     console.log(err);
    // }

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
