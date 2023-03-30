import {
    GameLiftClient,
    SearchGameSessionsCommand
} from '@aws-sdk/client-gamelift';

/*
 *  [GET] "/searchgamesession"
 *      - search for game sessions and return the data
 */

export const handler = async (event) => {

    let access_key_id = ""
    let secret_access_key = ""
    let gameSessionsData;
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


    const client = new GameLiftClient({ region: 'us-west-2'})

    const command = new SearchGameSessionsCommand({
        FleetId: 'fleet-f0e5ae02-127e-4a97-9f8a-eeb723cc1e46'
    })
    try {
        const data = await client.send(command);
        gameSessionsData = data;
        response = {
            statusCode: 200,
            body: JSON.stringify(gameSessionsData)
        }
    } catch (error) {
        console.log("error: " + error)
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: "Unable to find game session, check GameLift API status"
            })
        };
    }

    return response;

}