/**
 * 1. GraphQL api calls to do the following
 *      a. join a room
 *      b. send messages upon board interaction
 *      c. monitor user's status for draw, resign, gameover
 */

import { useAuth } from '../hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
// import { GRAPHQL_AUTH_MODE, GraphQLSubscription, GraphQLQuery } from '@aws-amplify/api';
// import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
// import * as subscriptions from "../graphql/subscriptions";
// import { 
//     OnCreateMessageSubscription,
//     CreateGameRoomInput,
//     CreateMessageInput,
//     OnUpdateGameRoomSubscription,
//     GetGameRoomQuery,
//     CreateGameRoomUserInput
// } from "../API";
import { TestBoard } from './page_components/testboard';
// import { ComponentPropsToStylePropsMap } from '@aws-amplify/ui-react';
// import {
//     GameLiftClient,
//     StartMatchmakingCommand,
//     DescribeMatchmakingCommand
// } from '@aws-sdk/client-gamelift';
// import { SNSClient, SubscribeCommand, ConfirmSubscriptionCommand, GetTopicAttributesCommand } from '@aws-sdk/client-sns';
// // import { DynamoDBStreamsClient, QueryCommand } from "@aws-sdk/client-dynamodb-streams";
// import { DynamoDBClient, ScanCommand, BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";

export const TestBoardPage = () => {

    const auth = useAuth();

    const [currentGameRoomId, setCurrentGameRoomId] = useState("");
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [color, setColor] = useState("");
    const [draw, setDraw] = useState(false);
    const [resign, setResign] = useState(false);
    const [rating, setRating] = useState(0);
    const [lookForUsers, setLookForUser] = useState(false);
    const [opponentId, setOpponentId] = useState("");
    const [ticket, setTicket] = useState("");
    const [msg, setMsg] = useState("");
    const [wsIsOpen, setWsIsOpen] = useState(false);
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket("wss://tshpmo9c9j.execute-api.us-east-2.amazonaws.com/production");
        ws.current.onopen = (event) => {
            setWsIsOpen(true);
            console.log("Websocket connection is open");
        }
        ws.current.onclose = (event) => {
            setWsIsOpen(false);
            console.log("Websocket connection is closed");
        }

        return () => {
            ws.current.close();
        }
    }, [])

    useEffect(() => {
        if (wsIsOpen) {
            ws.current.onmessage = (event) => {
                console.log("Received message: " + event.data);
            }
        }
    }, [wsIsOpen])

    const joinGame = async () => {
        // insert the user into the matchmaking lobby
        try {
            console.log("success creating new lobby user");
            const createUserInput = {
                name: auth.userId,
                lobbyID: "7b36e60f-ecd3-4219-b478-5bdd74c32adf",
                rating: rating,
                status: "queued"
            }
    
            await API.graphql(
                graphqlOperation(mutations.createUser, {
                    input: createUserInput,
                })
            )
        } catch (error) {
            console.log(error);
        }
    }

    const sendWebsocketRoom = async () => {
        if (wsIsOpen) {
            const sendMoveData = {
                action: "sendMove",
                data: msg
            }
            console.log("Sending '" + msg + "'");
            ws.current.send(JSON.stringify(sendMoveData));
        } else {
            console.log("Error: Unable to send move because websocket connection is closed");
        }
    }

    const joinWebsocketRoom = async () => {
        if (wsIsOpen) {
            const joinRoomData = {
                action: "joinRoom",
                data: auth.userId
            }
            ws.current.send(JSON.stringify(joinRoomData));
        } else {
            console.log("Error: Unable to join room because websocket connection is closed");
        }
    }

    const leaveGame = async () => {
        // remove the user from the matchmaking lobby
        try {

            const deleteUserInput = {
                id: "4a1b60a8-13be-4d8b-a0ad-5375b59ebd7c",
                _version: 1
            }
    
            await API.graphql(
                graphqlOperation(mutations.deleteUser, {
                    input: deleteUserInput,
                })
            )
            console.log("success removing lobby user");
        } catch (error) {
            console.log(error);
        }   
    }

    return (
        <>
            <div>
                <div>
                    Did Join: {joinedRoom}
                </div>
                <div>
                    Opponent Id: {opponentId}
                </div>
            </div>
            <div className="flex flex-col">
                <div>
                    Rating:
                    <input
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </div>
                <button
                    type="button"
                    onClick={() => setDraw(true)}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Draw
                </button>
                <button
                    type="button"
                    onClick={() => setResign(true)}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Resign
                </button>
                <div>
                    Color:
                    <input
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={joinGame}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Join Game
                </button>
                <button
                    type="button"
                    onClick={leaveGame}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Leave Game
                </button>
                <button
                    type="button"
                    onClick={joinWebsocketRoom}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Join Websocket Room
                </button>
                <div>
                    Message:
                    <input
                        onChange={(e) => setMsg(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={sendWebsocketRoom}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Send Websocket Room
                </button>
            </div>

            <div>
                <TestBoard
                    boardWidth={700}
                    joined_room_state={currentGameRoomId}
                    color_state={color}
                    draw_state={draw}
                    resign_state={resign}
                    set_draw_state={setDraw}
                    ref={ws}
                />
            </div>

        </>
    )
}