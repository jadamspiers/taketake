
const {
    GameLiftClient,
    DescribeGameSessionQueuesCommand
} = require('@aws-sdk/client-gamelift');

/*
 * [POST] "/getactivequeuehandler"
 *      - get an active queue
 */

exports.handler = async (event) => {

    let access_key_id = ""
    let secret_access_key = ""
    let response;

    if (process.env.ACCESS_KEY_ID && process.env.SECRET_ACCESS_KEY) {
        access_key_id = process.env.ACCESS_KEY_ID
        secret_access_key = process.env.SECRET_ACCESS_KEY
    } else {
        console.log("ERROR: environment variables not found")
    }

    const creds = {
        accessKeyId: access_key_id,
        secretAccessKey: secret_access_key
    }

    const client = new GameLiftClient({ region: 'us-west-2', credentials: creds });

    var options = {
        "Limit": 5 // how many GameLift queues to return
    }

    const command = new DescribeGameSessionQueuesCommand(options);
    try {
        const data = await client.send(command);

        if (data.GameSessionsQueues && data.GameSessionsQueues.length > 0) {
            console.log("We have some queues!");

            let selectedGameSessionQueue;
            data.GameSessionsQueues.forEach(queue => {
                if (queue.Name == "TakeTakeQueue") {
                    selectedGameSessionQueue = queue;
                }
            });
            response = {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                }, 
                body: JSON.stringify({
                    game_session_queue: selectedGameSessionQueue
                })
            };
        } else {
            console.log("No queues available");
            response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                }, 
                body: JSON.stringify({
                    message: "No queues available"
                })
            };
            return response;
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
                message: error
            })
        };
        return response;
    }

    return response;
};
