const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { util } = require("@aws-appsync/util");

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

async function createGameRoom () {
    console.log("Date: " + Date.now());
    console.log("Time: " + util.time.nowISO8601())
    const client = new DynamoDBClient({ region: "us-east-2" });
    const ddbDocClient = DynamoDBDocumentClient.from(client);
    await ddbDocClient.send(
      new PutCommand({
        TableName: "GameRoom-lv5ggagqpvhzrgebeq7lccsfuy-staging",
        Item: {
          id: "998cd30e-54ae-41c1-9710-429df43c43fc",
          __typename: "GameRoom",
          createdAt: "2023-05-06T18:40:35.490Z",
          updatedAt: "2023-05-06T18:40:35.490Z",
          _version: 1,
          _lastChangedAt: Date.now(),
        },
      })
    );
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log("LAMBDA INVOKED!!");
    await createGameRoom();
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
