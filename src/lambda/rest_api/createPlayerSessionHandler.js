import {
    GameLiftClient,
    SearchGameSessionsCommand,
    CreateGameSessionCommand,
    CreatePlayerSessionCommand
} from '@aws-sdk/client-gamelift';

/*
 * [POST] "/createplayersession"
 *      - create a player session
 */

export const handler = async (event, context) => {

    let access_key_id = ""
    let secret_access_key = ""
    let gameSessions;
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

    // search for any existing game sessions
    const command = new SearchGameSessionsCommand({ 
        FleetId: 'fleet-f0e5ae02-127e-4a97-9f8a-eeb723cc1e46',
        FilterExpression: 'hasAvailablePlayerSessions=true'
    });

    try {
        const data = await client.send(command);
        gameSessions = data.GameSessions;
    } catch (error) {
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: "Unable to find game session, check GameLift API status"
            })
        }
    }

    // if there are no sessions, then create one
    // else get the first game session available
    let selectedGameSession;
    if (gameSessions.length == 0) {
        console.log("No game session detected, creating a new one");
        const create_gam_cmd = new CreateGameSessionCommand({
            MaximumPlayerSessionCount: 2,
            FleetId: 'fleet-f0e5ae02-127e-4a97-9f8a-eeb723cc1e46'
        });
        try {
            const data = await client.send(create_gam_cmd);
            selectedGameSession = data.GameSession
        } catch (error) {
            response = {
                statusCode: 500,
                body: JSON.stringify({
                    message: "Unable to create game session, check GameLift API status"
                })
            }
        }
    } else {
        // get the first game session
        selectedGameSession = gameSessions[0];
    }

    if (selectedGameSession != null) {
        console.log("Creating player session");
        const create_pla_cmd = new CreatePlayerSessionCommand({
            GameSessionId: selectedGameSession.GameSessionId,
            PlayerId: context.awsRequestId
        });
        try {
            const data = await client.send(create_pla_cmd);
            response = {
                statusCode: 200,
                body: JSON.stringify(data.PlayerSession)
            }
        } catch (error) {
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Unable to create player session, check GameLift API status"
                })
            }
        }
    }

    return response;

}