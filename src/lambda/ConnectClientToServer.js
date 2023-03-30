// const AWS = require('aws-sdk');
// const GameLift = new AWS.GameLift({region: 'us-west-2'});

import { 
    GameLiftClient,
    SearchGameSessionsCommand
} from '@aws-sdk/client-gamelift';
const client = new GameLiftClient({ region: "us-west-2" })

const TakeTakeFleetID = "fleet-ac1ca312-dcbf-45de-aa5d-30f835dc49a9";

exports.handler = async (event, context) => {
    let response;
    let gameSessions;

    // find any sessions that have available players
    // await GameLift.searchGameSessions({
    //     FleetId: TakeTakeFleetID,
    //     FilterExpression: "hasAvailablePlayerSessions=true"
    // }).promise().then(data => {
    //     gameSessions = data.GameSessions;
    // }).catch(err => {
    //     response = err;
    // });

    // find any sessions that have available players
    const searchGameSessionCmd = new SearchGameSessionsCommand({
        FleetId: 'fleet-f0e5ae02-127e-4a97-9f8a-eeb723cc1e46',
        FilterExpression: 'hasAvailablePlayerSessions=true'
    });
    try {
        const data = await client.send(searchGameSessionCmd);
        gameSessions = data.gameSessions;
    } catch (error) {
        response = err;
    }

    // if the response object has any value at any point before the end of
    // the function that indicates a failure condition so return the response
    if(response != null) 
    {
        return response;
    }

    // if there are no sessions, then we need to create a game session
    // let selectedGameSession;
    // if(gameSessions.length == 0)
    // {
    //     console.log("No game session detected, creating a new one");
    //     await GameLift.createGameSession({
    //         MaximumPlayerSessionCount: 2,   // only two players allowed per game
    //         FleetId: TakeTakeFleetID
    //     }).promise().then(data => {
    //         selectedGameSession = data.GameSession;
    //     }).catch(err => {
    //        response = err; 
    //     });

    //     if(response != null)
    //     {
    //         return response;
    //     }
    // }
    // else
    // {
    //     // we grab the first session we find and join it
    //     selectedGameSession = gameSessions[0];
    //     console.log("Game session exists, will join session ", selectedGameSession.GameSessionId);
    // }

    let selectedGameSession;
    if (gameSessions.length == 0) {
        console.log("No game session detected, creating a new one")
    }
    
    // there isn't a logical way selectedGameSession could be null at this point
    // but it's worth checking for in case other logic is added
    if(selectedGameSession != null) 
    {
        // now we have a game session one way or the other, create a session for this player
        await GameLift.createPlayerSession({
            GameSessionId : selectedGameSession.GameSessionId,
            PlayerId: context.awsRequestId
        }).promise().then(data => {
            console.log("Created player session ID: ", data.PlayerSession.PlayerSessionId);
            response = data.PlayerSession;
        }).catch(err => {
           response = err; 
        });

    }
    else
    {
        response = {
          statusCode: 500,
          body: JSON.stringify({
              message: "Unable to find game session, check GameLift API status"
          })
        };
    }

    return response;
};