import { 
    GameLiftClient,
    SearchGameSessionsCommand,
    CreateGameSessionCommand,
    StartMatchmakingCommand,
    Player,
    AttributeValue,
    DescribeMatchmakingCommand,
    DescribeMatchmakingCommandInput
} from '@aws-sdk/client-gamelift';
import {
    SQSClient,
    ReceiveMessageCommand
} from '@aws-sdk/client-sqs';
import { AwsCredentialIdentity } from '@aws-sdk/types';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { API } from 'aws-amplify';
// import { GameLiftRealtimeClient } from '../gamelift-realtime-client';
// import { ConnectClient } from '../gamelift-realtime-client/src/connectClient';
// import { ConnectClient } from '../gamelift-realtime-client/functions/connectClient';

export const StartPage = () => {

    const [session, setSession] = useState("");
    const [skill, setSkill] = useState("");
    const [playerId, setPlayerId] = useState("");
    const [gameSessionId, setGameSessionId] = useState("");
    const [playerSessonId, setPlayerSessionId] = useState("");
    const [ticket, setTicket] = useState("");

    const auth = useAuth();

    const BASE_URL = "https://l9enhqw3xd.execute-api.us-west-2.amazonaws.com/test"
    const SEARCH_GAME_SESSION_URL = "/searchgamesession"
    const CREATE_GAME_SESSION_URL = "/creategamesession"
    const START_MATCHMAKING_URL = "/startmatchmaking"
    const ACTUAL_URL = "https://nt6eri5mp6.execute-api.us-west-2.amazonaws.com/test1/searchgamesessions"
    const TARGET_ALIAS_ARN = "";
    const GAMELIFT_USE_SSL = false;

    const hello = async () => {
        const requestInfo = {
            headers: { Authorization: auth.token }
        }
        await API.get('taketakeapi', '/hello', requestInfo)
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getActiveQueue = async () => {

        const requestInfo = {
            headers: { Authorization: auth.token }
        }

        await API.get('taketakeapi', '/getactivequeue', requestInfo)
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const createGameSession = async () => {

        const requestInfo = {
            body: { 
                "skill": "900",
                "playerId": "player2"
            },
            headers: { Authorization: auth.token }
        }

        const data = await API.post('taketakeapi', '/createplayersession', requestInfo);
        console.log({ data });
    }

    const searchGameSessions = async () => {
        const requestInfo = {
            headers: { Authorization: auth.token }
        }
        await API.get('taketakeapi', '/searchgamesessions', requestInfo)
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const receiveMessages = async () => {
        const requestInfo = {
            headers: { Authorization: auth.token }
        }
        await API.get('taketakeapi', '/receivemessages', requestInfo)
            .then((response) => {
                console.log({ response });
                console.log(response.Messages[0].Body);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // TODO: describe player sessions
    const describePlayerSessions = async () => {
        const requestInfo = {
            body: {
                gameSessionId: gameSessionId
            },
            headers: { Authorization: auth.token }
        }
        await API.post('taketakeapi', '/describeplayersessions', requestInfo)
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // connect player session to the realtime game server
    // const connectPlayer = async () => {
    //     // connect player to realtime server

    // }

    const startMatchmaking = async () => {
        const requestInfo = {
            body: {
                skill: "900",
                playerId: "player320"
            },
            headers: { Authorization: auth.token }
        }
        await API.post('taketakeapi', '/startmatchmaking', requestInfo)
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const printToken = async () => {
        console.log(auth.token);
    }

    const joinGame = async () => {

        // info we need
        // 1. session ID

        const requestInfo = {
            body: {
                opCode: "1",
                skill: "900",
                playerId: "player2"
            },
            headers: { Authorization: auth.token }
        }

        await API.post('taketakeapi', '/joingame', requestInfo)
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const describeMatchMaking = async () => {

        const requestInfo = {
            body: {
                ticket: ticket
            },
            headers: { Authorization: auth.token }
        }

        await API.post('taketakeapi', '/describematchmaking', requestInfo)
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const connectRealTime = async () => {
        // create a ConnectionToken using our given endpoint
        // components along with our PlayerSessionId
        // const protocol = GAMELIFT_USE_SSL ? 'wss' : 'ws';
        // const connectionToken: any = {
        //     serverEndpoint: `${protocol}://${playerSession['DnsName']}:${playerSession['Port']}`,
        //     playerSessionId: playerSession['PlayerSessionId']
        // }

        // construct the GameLiftRealtimeClient object
        // const gameLiftRealtimeClient = new GameLiftRealtimeClient(connectionToken);

        let game_session_id;
        let player_session_id = "";
        let connection_token;
        let dns_name;
        let port;
        // 1. join matchmaking as player1
        const requestInfo1 = {
            body: {
                skill: "900",
                playerId: "player600"
            },
            headers: { Authorization: auth.token }
        }
        console.log("calling join matchmaking 1");
        await API.post('taketakeapi', '/startmatchmaking', requestInfo1)
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log(error);
            });
        // 2. join matchmaking as plyaer2
        const requestInfo2 = {
            body: {
                skill: "900",
                playerId: "player601"
            },
            headers: { Authorization: auth.token }
        }
        console.log("calling join matchmaking 2");
        await API.post('taketakeapi', '/startmatchmaking', requestInfo2)
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log(error);
            });
        // 3. get the player session of player 1 (search game sessions)
        //  - collect the GAME SESSION ID

        const requestInfo3 = {
            headers: { Authorization: auth.token }
        }
        console.log("searching game sessions");
        await API.get('taketakeapi', '/searchgamesessions', requestInfo3)
            .then((response) => {
                console.log("response: " + JSON.stringify(response));
                game_session_id = response.game_sessions.GameSessions[0].GameSessionId;
                console.log("game_session_id: " + game_session_id);
            })
            .catch((error) => {
                console.log(error);
            });

        
        // 4. describe the player 1 session given the game session
        //  - collect the PLAYER SESSION ID
        const requestInfo4 = {
            body: {
                gameSessionId: game_session_id
            },
            headers: { Authorization: auth.token }
        }
        await API.post('taketakeapi', '/describeplayersessions', requestInfo4)
            .then((response) => {
                console.log({ response });
                player_session_id = response.player_sessions.PlayerSessions[0].PlayerSessionId;
                dns_name = response.player_sessions.PlayerSessions[0].DnsName;
                port = response.player_sessions.PlayerSessions[0].Port;
                console.log("player_session_id: " + player_session_id);
                console.log("dns_name: " + dns_name);
                console.log("port: " + port);
            })
            .catch((error) => {
                console.log(error);
            });

        // 5. connect the player to the realtime game client
        // connectGame(dns_name, port, player_session_id);




        // const connectionToken: ConnectionToken = {
        //     serverEndpoint: `${protocol}://${playerSession['DnsName']}:${playerSession['Port']}`,
        //     playerSessionId: playerSession['PlayerSessionId']
        // };
        // TODO: import realtime package as local package
        // connection_token = {
        //     serverEndpoint: `ws://${dns_name}:${port}`,
        //     playerSessionId: player_session_id,
        //     connectedPeerId: 0
        // }
        // // Then construct the GameLiftRealtimeClient object
        // const gameLiftRealtimeClient = new GameLiftRealtimeClient(connection_token);

    }


    return (
        <>
            <div className="flex flex-col">
                <button
                    type="button"
                    onClick={hello}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Hello
                </button>
                <button
                    type="button"
                    onClick={printToken}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Print Token
                </button>
                <button
                    type="button"
                    onClick={searchGameSessions}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Search Game Sessions
                </button>
                <button
                    type="button"
                    onClick={createGameSession}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Create New Game Session
                </button>
                <button
                    type="button"
                    onClick={startMatchmaking}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Start Matchmaking
                </button>
                <button
                    type="button"
                    onClick={getActiveQueue}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Get Active Queue
                </button>
                <div>
                    <input
                        onChange={(e) => setGameSessionId(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={describePlayerSessions}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Describe Player Sessions
                </button>
                <div>
                    Session: 
                    <input 
                        onChange={(e) => setSession(e.target.value)}
                    />
                    Skill:
                    <input 
                        onChange={(e) => setSkill(e.target.value)}
                    />
                    PlayerID:
                    <input 
                        onChange={(e) => setPlayerId(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={joinGame}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Join Game Session
                </button>
                <button
                    type="button"
                    onClick={connectRealTime}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Connect Realtime
                </button>
                <div>
                    Ticket: 
                    <input 
                        onChange={(e) => setTicket(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={describeMatchMaking}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Describe Matchmaking
                </button>
                <button
                    type="button"
                    onClick={receiveMessages}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Receive Messages
                </button>
                <button
                    type="button"
                    onClick={receiveMessages}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Receive Messages
                </button>
            </div>
        </>
    );
}