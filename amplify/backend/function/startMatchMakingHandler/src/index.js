const {
    GameLiftClient,
    StartMatchmakingCommand
} = require('@aws-sdk/client-gamelift');

/*
 * [POST] "/startmatchmaking"
 *      - start a matchmaking session 
 *      - body: { skill, playerId }
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

    if (event.body) {
        console.log("## EVENT");
        console.log(event);
        
        console.log("## BODY");
        console.log(event.body);
        const body = JSON.parse(event.body);

        const skill = body.skill;
        const playerId = body.playerId;
        

        if (!skill || !playerId) {
            console.log("ERROR: Missing skill or playerId")
            response = {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                }, 
                body: JSON.stringify({
                    message: "Missing \'skill\' or \'playerId\'"
                })
            };
            return response;
        }

        console.log("## SKILL");
        console.log(skill);
        console.log("## PLAYERID");
        console.log(playerId);

        const attributes = {
            "skill": {"N": parseInt(skill)}
        }

        const player = {
            PlayerAttributes: attributes,
            PlayerId: playerId.toString()
        }

        const command = new StartMatchmakingCommand({ ConfigurationName: 'TakeTakePvPMatchmakingConfig', Players: [player] })
        try {
            let ticketId;
            const data = await client.send(command);
            console.log("## DATA");
            console.log(JSON.stringify(data));
            if (data.MatchmakingTicket.TicketId) {
                ticketId = data.MatchmakingTicket.TicketId;
            } else {
                console.log("ERROR: Unable to find matchmaking ticket");
                response = {
                    statusCode: 500,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*"
                    }, 
                    body: JSON.stringify({
                        message: "Environment variables not found"
                    })
                };
                return response;
            }
            response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                }, 
                body: JSON.stringify({
                    ticket_id: ticketId
                })
            }
            
        } catch (error) {
            console.log("error: " + error)
            response = {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                }, 
                body: JSON.stringify({
                    message: "Error sending matchmaking command"
                })
            };
            return response;
        }
    } else {
        response = {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify({
                message: "Missing body"
            })
        };
        return response;
    }

    return response;

}