import {
    GameLiftClient,
    StartMatchmakingCommand
} from '@aws-sdk/client-gamelift';
import { verify } from 'crypto';

/*
 * [POST] "/startmatchmaking"
 *      - start a matchmaking session
 *      - body: { skill, playerId }
 */

export const handler = async (event) => {

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

    if (event.body) {
        const body = JSON.parse(event.body);

        const skill = body.skill;
        const playerId = body.playerId;

        if (skill || playerId) {
            console.log("ERROR: missing skill or playerId")
        }

        console.log("## SKILL");
        console.log(skill);
        console.log("## PLAYERID");
        console.log(playerId);

        console.log("CHECK 1")

        const attributes = {
            "skill": {"N": parseInt(skill)}
        }

        const player = {
            PlayerAttributes: attributes,
            PlayerId: playerId.toString()
        }

        console.log("CHECK 2")

        const command = new StartMatchmakingCommand({ ConfigurationName: 'TakeTakePvPMatchmakingConfig', Players: [player] })
        try {
            console.log("CHECK 3")
            let ticketId;
            const data = await client.send(command);
            console.log("## DATA");
            console.log(JSON.stringify(data));
            if (data.MatchmakingTicket.TicketId) {
                ticketId = data.MatchmakingTicket.TicketId;
            } else {
                console.log("ticket not found");
            }
            response = {
                statusCode: 200,
                body: ticketId
            }
            console.log("CHECK 4")
            
        } catch (error) {
            console.log("error: " + error)
        }
    } else {
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: "Missing body"
            })
        }
    }

    return response;

}