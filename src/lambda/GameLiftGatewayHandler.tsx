'use strict';
console.log('Loading game lift gateway handler function');

import { 
    GameLiftClient,
    SearchGameSessionsCommand,
    CreatePlayerSessionCommand,
    CreateGameSessionCommand,
    StartMatchmakingCommand,
    Player,
    AttributeValue,
    DescribeMatchmakingCommand,
    DescribeMatchmakingCommandInput
} from '@aws-sdk/client-gamelift';
import { AwsCredentialIdentity } from '@aws-sdk/types';
import { create } from 'domain';

export const handler = async (event: any, context: any) => {
    // POST - searchGameSession
    // POST - createPlayerSession
    // POST -start matchmaking

    // TODO
    // 1. make a single endpoint that delegates the work to other functions
    //  - just do this for simpicity reasons at first

    let action = "";
    let value = "";
    let client;
    let gameSessionsData;
    let selectedGameSession;
    let response;
    const SUCCESS_RESPONSE_CODE = 200;

    let access_key_id: string = ""
    let secret_access_key: string = ""

    if (process.env.REACT_APP_ACCESS_KEY_ID && process.env.REACT_APP_SECRET_ACCESS_KEY) {
        access_key_id = process.env.REACT_APP_ACCESS_KEY_ID
        secret_access_key = process.env.REACT_APP_SECRET_ACCESS_KEY
    } else {
        console.log("ERROR: environment variables not found")
    }


    const creds: AwsCredentialIdentity = {
        accessKeyId: access_key_id,
        secretAccessKey: secret_access_key
    }

    if (event.body) {
        action = JSON.parse(event.body.action);
        value = JSON.parse(event.body.value);

        client = new GameLiftClient({ region: 'us-west-2', credentials: creds });

        // search for any game sessions
        const command = new SearchGameSessionsCommand({ FleetId: 'fleet-f0e5ae02-127e-4a97-9f8a-eeb723cc1e46' });
        try {
            const data = await client.send(command);
            gameSessionsData = data;
        } catch (error) {
            console.log("error: " + error);
        } 

        if (action == "SearchGameSession") {
            response = {
                statusCode: SUCCESS_RESPONSE_CODE,
                body: JSON.stringify(gameSessionsData?.GameSessions)
            }
        } else if (action == "CreatePlayerSession") {
            // search for any game sessions with available players
            // if there are then join that game session
            // if not then create a new game session
            if (gameSessionsData?.GameSessions?.length == 0) {
                // there are no game sessions so create one
                const create_game_cmd = new CreateGameSessionCommand({
                    MaximumPlayerSessionCount: 2,
                    FleetId: 'fleet-f0e5ae02-127e-4a97-9f8a-eeb723cc1e46'
                })
                try {
                    const data = await client.send(create_game_cmd);
                    selectedGameSession = data.GameSession;
                } catch (error) {
                    console.log("error: " + error);
                }
            } else {
                if (gameSessionsData && gameSessionsData.GameSessions) {
                    selectedGameSession = gameSessionsData.GameSessions[0];
                }
            }

            // create a player session now that we have a game session
            if (selectedGameSession != null) {
                const create_player_cmd = new CreatePlayerSessionCommand({
                    GameSessionId: selectedGameSession.GameSessionId,
                    PlayerId: context.awsRequestId
                });

                try {
                    const data = await client.send(create_player_cmd);
                    response = {
                        statusCode: SUCCESS_RESPONSE_CODE,
                        body: JSON.stringify(data.PlayerSession)
                    }
                } catch (error) {
                    console.log("error: " + error);
                }
            } else {
                response = {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: "Unable to find game session, check GameLift API status"
                    })
                }
            }

        }
    } else {
        console.log("ERROR: no body found");
    }


    return response;
}