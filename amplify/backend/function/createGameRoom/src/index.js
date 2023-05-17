const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

// async function createGameRoom () {
//     const client = new DynamoDBClient({ region: "us-east-2" });
//     const command = new ListTablesCommand({});
//     try {
//         const results = await client.send(command);
//         console.log("results: " + results.TableNames.join("\n"));
//     } catch (err) {
//         console.log("err: " + err);
//     }
// }

async function createGameRoom (gameRoomId) {
    console.log("invoking createGameRoom()");
    const date = new Date();
    const client = new DynamoDBClient({ region: "us-east-2" });
    const ddbDocClient = DynamoDBDocumentClient.from(client);
    await ddbDocClient.send(
      new PutCommand({
        TableName: "GameRoom-lv5ggagqpvhzrgebeq7lccsfuy-staging",
        Item: {
          id: gameRoomId,
          __typename: "GameRoom",
          createdAt: date.toISOString(),
          updatedAt: date.toISOString(),
          _version: 1,
          _lastChangedAt: Date.now(),
        },
      })
    );
}

async function createGameRoomUser (gameRoomId, userId, name, rating) {
    console.log("invoking createGameRoomUser()");
    const date = new Date();
    const client = new DynamoDBClient({ region: "us-east-2" });
    const ddbDocClient = DynamoDBDocumentClient.from(client);
    await ddbDocClient.send(
      new PutCommand({
        TableName: "GameRoomUser-lv5ggagqpvhzrgebeq7lccsfuy-staging",
        Item: {
          id: name,
          __typename: "GameRoomUser",
          createdAt: date.toISOString(),
          gameRoomId: gameRoomId,
          updatedAt: date.toISOString(),
          _version: 1,
          _lastChangedAt: Date.now(),
          userId: name,
          rating: rating
        },
      })
    );
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
    console.log("LAMBDA INVOKED!!");
    console.log("context: " + JSON.stringify(context));
    console.log("context.awsRequestId: " + context.awsRequestId);
    await createGameRoom(context.awsRequestId);
    // const userId1 = "111cd30e-54ae-41c1-9710-429df43c43aa";
    // const userId2 = "222cd30e-54ae-41c1-9710-429df43c43bb";
    // await createGameRoomUser(userId1);
    // await createGameRoomUser(userId2);
    console.log(`EVENT: ${JSON.stringify(event)}`);
    if (event.user_1 && event.user_2) {
      const user1 = JSON.parse(JSON.parse(event.user_1));
      const user2 = JSON.parse(JSON.parse(event.user_2));
      console.log("user1_rating: " + user1.rating);
      console.log("user1_rating_type: " + typeof(user1.rating));
      await createGameRoomUser(context.awsRequestId, user1.id, user1.name, user1.rating);
      await createGameRoomUser(context.awsRequestId, user2.id, user2.name, user2.rating);
    }
        // if (event.body) {
        // const body = JSON.parse(event.body);
        // playerId = body.id;
        // playerName = body.name;
        // playerRating = body.rating;
        // console.log("playerId: " + playerId);
    // console.log("body: " + JSON.stringify(event.body));
    // const body = JSON.parse(event.body);
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
