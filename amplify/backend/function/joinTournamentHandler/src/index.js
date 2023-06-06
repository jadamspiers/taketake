const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    let walletAddress;
    let lichessUsername;

    if (event.body) {
        const body = JSON.parse(event.body);
        console.log("body: " + body);
        userId = body.userId;
        console.log("userId: " + userId);
        walletAddress = body.walletAddress;
        console.log("walletAddress: " + walletAddress);
        lichessUsername = body.lichessUsername;
        console.log("lichessUsername: " + lichessUsername); 
    }

    /*
        TODO:
        1. ensure that there is already a GameRoom associated with the
            lichess tournament GameRoom
        2. create a new GameRoomUser entry with the wallet address and
            lichess username
    */

    if (walletAddress && lichessUsername) {
        console.log("Creating new GameRoomUser entry");
        const date = new Date();
        const client = new DynamoDBClient({ region: "us-east-2" });
        const ddbDocClient = DynamoDBDocumentClient.from(client);
        await ddbDocClient.send(
          new PutCommand({
            TableName: "GameRoomUser-lv5ggagqpvhzrgebeq7lccsfuy-staging",
            Item: {
              id: gameRoomId,
              __typename: "GameRoomUser",
              createdAt: date.toISOString(),
              updatedAt: date.toISOString(),
              _version: 1,
              _lastChangedAt: Date.now(),
            },
          })
        );
    }


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
