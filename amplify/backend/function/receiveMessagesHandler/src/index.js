const {
    SQSClient,
    ReceiveMessagesCommand
} = require('@aws-sdk/client-sqs');

/*
 * [GET] "/receivemessages"
 *      - invokes ReceiveMessagesCommand
 */

exports.handler = async (event) => {
    let access_key_id = ""
    let secret_access_key = ""
    let gameSessions;
    let response;

    if (process.env.ACCESS_KEY_ID && process.env.SECRET_ACCESS_KEY) {
        access_key_id = process.env.ACCESS_KEY_ID
        secret_access_key = process.env.SECRET_ACCESS_KEY
    } else {
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: "Missing enviro variables"
            })
        }
        console.log("ERROR: Missing environment variables")
        return response;
    }

    const creds = {
        accessKeyId: access_key_id,
        secretAccessKey: secret_access_key
    }

    // get the ticket from the event body
    const body = JSON.parse(event.body);
    console.log("body: " + body);
    const ticket = body.ticket;

    // const client = new GameLiftClient({ region: 'us-west-2', credentials: creds });
    const client = new SQSClient({ region: "us-west-2", creds: creds });

    // describe the player session given a game session
    const command = new ReceiveMessagesCommand({
        QueueUrl: "https://sqs.us-west-2.amazonaws.com/107762387091/TakeTakeTopicQueue",
        WaitTimeSeconds: 60
    });
    try {
        const data = await client.send(command);
        response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: data
        }
    } catch (error) {
        console.log("error: " + error);
        response = {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify({
                message: "Unable to describe matchmaking ticket"
            })
        };
    }

    return response;
};
