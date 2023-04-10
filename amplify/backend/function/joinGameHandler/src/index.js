
const {
    GameLiftClient,
    SearchGameSessionsCommand,
    DescribeGameSessionQueuesCommand,
    StartGameSessionPlacementCommand,
    CreatePlayerSessionCommand
} = require('@aws-sdk/client-gamelift');
const { callbackify } = require('util');

const { v4: uuidv4 } = require('uuid');


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
const TARGET_GAMELIFT_QUEUE_NAME = "TakeTakeQueue";
const REQUEST_FIND_MATCH = "1";
const MAX_PLAYER_COUNT = 2;

async function searchGameSessions(targetAliasARN) {
    var gameSessionFilterExpression = "hasAvailablePlayerSessions=true";

    var searchGameSessionsRequest = {
        AliasId: targetAliasARN,
        FilterExpression: gameSessionFilterExpression,
        SortExpression: "creationTimeMillis ASC"
    }

    const command = new SearchGameSessionsCommand(searchGameSessionsRequest);
    try {
        const data = client.send(command);

        if (data.GameSessions && data.GameSessions.length > 0) {
            console.log("We have game sessions!");
            return data.GameSessions[0];
        } else {
            console.log("No game sessions :(");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function getActiveQueue() {
    var options = {
        "Limit": 5
    }

    const command = new DescribeGameSessionQueuesCommand(options);

    try {
        const data = await client.send(command);
        console.log("getActiveQueue_data: " + JSON.stringify(data));

        if (data.GameSessionQueues && data.GameSessionQueues.length > 0) {
            // for now just grab the first Queue
            console.log("We have some queues");

            let selectedGameSessionQueue;
            data.GameSessionQueues.forEach(queue => {
                console.log("queue.Name: " + queue.Name);
                if (queue.Name == TARGET_GAMELIFT_QUEUE_NAME) {
                    selectedGameSessionQueue = queue;
                }
            });
            return selectedGameSessionQueue;
        }
    } catch (error) {
        console.log("getActiveQueue error:" + error);
        return [];
    }
}

async function createGameSessionPlacement(targetQueueName, playerId) {
    var createSessionInQueueRequest = {
        GameSessionQueueName: targetQueueName,
        PlacementId: uuidv4(),
        MaximumPlayerSessionCount: MAX_PLAYER_COUNT,
        DesiredPlayerSessions: [{
            PlayerId: playerId
        }]
    };
    console.log("Calling startGameSessionPlacement...");
    const command = new StartGameSessionPlacementCommand(createSessionInQueueRequest);
    try {
        const data = await client.send(command);
        return data
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function createPlayerSession(playerId, GameSessionId) {
    var createPlayerSessionRequest = {
        GameSessionId: GameSessionId,
        PlayerId, playerId
    };

    const command = new CreatePlayerSessionCommand(createPlayerSessionRequest);
    try {
        const data = await client.send(command);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.handler = async (event) => {
    console.log("Inside function...");

    let message = JSON.parse(event.body);
    console.log("Message received: %j", message);

    let responseMsg = {};

    if (message && message.opCode) {
        switch (message.opCode) {
            case REQUEST_FIND_MATCH:
                console.log("Request find match opCode hit");

                try {
                    console.log("trying to get active queue...");
                    var activeQueue = await getActiveQueue();
                    console.log("## ACTIVE QUEUE: " + activeQueue);
                } catch (error) {
                    console.log("error getting active queue: " + error);
                }

                // The first destination is hardcoded here.  If you have more than one Alias or your setup is more complex, you’ll have to refactor. 
                var gameSession = await searchGameSessions(activeQueue.Destinations[0].DestinationArn);

                if (gameSession) {
                    console.log("We have a game session to join!");
                    console.log("## GAME SESSION: " + gameSession);

                    console.log("Creating player session...");
                    var playerSession = await createPlayerSession(message.playerId, gameSession.GameSessionId);
                    console.log("Player session created");

                    responseMsg = playerSession.PlayerSession;
                    responseMsg.PlayerSessionStatus = playerSession.PlayerSession.Status;
                    responseMsg.GameSessionId = gameSession.GameSessionId;
                    responseMsg.GameSesionStatus = gameSession.Status;
                } else {
                    console.log("No game sessions to join!" + activeQueue.Name);
                    var gameSessionPlacement = await createGameSessionPlacement(activeQueue.Name, message.playerId);
                    console.log("Game session placement request made");
                    responseMsg = gameSessionPlacement.GameSessionPlacement;
                }

                break;
        }
    }

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify(responseMsg)
    }
    return response;
};
