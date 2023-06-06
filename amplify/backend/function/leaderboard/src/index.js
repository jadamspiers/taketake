const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    // 1. get the gameroomId given by the caller
    // const body = JSON.parse(event.body);
    const body = JSON.parse(event.body);
    console.log("body: " + JSON.stringify(body));
    const gameRoomId = body.gameRoomId;
    console.log("gameRoomId: " + gameRoomId);

    // 2. scan the GameRoomUsers for a list of the GameRoomUsers that
    //    are associated with the GameRoom given
    let response;
    const dbClient = new DynamoDBClient({ region: "us-east-2" });
    const dbInput = {
        TableName: "GameRoomUser-lv5ggagqpvhzrgebeq7lccsfuy-staging",
        ExpressionAttributeValues: {
            ':gid' : { S: gameRoomId },
        },
        FilterExpression: "gameRoomId = :gid"
    }

    const dbCommand = new ScanCommand(dbInput);
    try {
        const response = await dbClient.send(dbCommand);
        console.log("response: " + JSON.stringify(response));
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify(response),
        };
    } catch (err) {
        console.log(err);
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: "success",
    };
};
