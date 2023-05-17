const { DynamoDBClient, UpdateItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require("@aws-sdk/client-apigatewaymanagementapi");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    
    // 1. updateItem to include the new websocket connectionId
    // 2. store the opponent's connectionId
    // 3. return with a ready status

    const userId = JSON.parse(event.body).data;
    const connectionId = event.requestContext.connectionId;
    let gameRoomId;

    const dbClient = new DynamoDBClient({ region: "us-east-2" });
    const apiClient = new ApiGatewayManagementApiClient({ region: "us-east-2", endpoint: "https://tshpmo9c9j.execute-api.us-east-2.amazonaws.com/production" });
    
    // set the connectionId
    const input = {
        TableName: "GameRoomUser-lv5ggagqpvhzrgebeq7lccsfuy-staging",
        Key: {
            "id": { S: userId }
        },
        UpdateExpression: "set connectionId = :u",
        ExpressionAttributeValues: {
            ":u": { S: connectionId }
        }
    }
    const command = new UpdateItemCommand(input);
    let response;
    try {
        response = await dbClient.send(command);
        console.log("response: " + JSON.stringify(response));
    } catch (err) {
        console.log(err);
    }

    // get the gameRoomId and send message to client
    if (response.$metadata.httpStatusCode === 200) {
        // get the gameRoomId
        const getItemInput = {
            TableName: "GameRoomUser-lv5ggagqpvhzrgebeq7lccsfuy-staging",
            Key: {
                id: { S: userId },
            }
        }
        const getItemCmd = new GetItemCommand(getItemInput);
        try {
            const getItemResponse = await dbClient.send(getItemCmd);
            gameRoomId = getItemResponse.Item.gameRoomId.S
        } catch (err) {
            console.log(err);
        
        }

        // send the success message to the client
        const apiInput = {
            ConnectionId: connectionId,
            Data: "Connected to GameRoom " + gameRoomId
        }
        const command = new PostToConnectionCommand(apiInput);
        try {
            await apiClient.send(command);
        } catch (err) {
            console.log(err);
        }
    } else {
        // send the error message to the client
        const apiInput = {
            ConnectionId: connectionId,
            Data: "Failed to connect to GameRoom"
        }
        const command = new PostToConnectionCommand(apiInput);
        try {
            await apiClient.send(command);
        } catch (err) {
            console.log(err);
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
