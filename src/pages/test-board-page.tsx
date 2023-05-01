/**
 * 1. GraphQL api calls to do the following
 *      a. join a room
 *      b. send messages upon board interaction
 *      c. monitor user's status for draw, resign, gameover
 */

import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { Auth, Amplify, API, graphqlOperation } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE, GraphQLSubscription, GraphQLQuery } from '@aws-amplify/api';
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";
import { 
    OnCreateMessageSubscription,
    CreateGameRoomInput,
    CreateMessageInput,
    OnUpdateGameRoomSubscription,
    GetGameRoomQuery,
    CreateGameRoomUserInput
} from "../API";
import { TestBoard } from './page_components/testboard';
import { ComponentPropsToStylePropsMap } from '@aws-amplify/ui-react';
import {
    GameLiftClient,
    StartMatchmakingCommand,
    DescribeMatchmakingCommand
} from '@aws-sdk/client-gamelift';
import { SNSClient, SubscribeCommand, ConfirmSubscriptionCommand, GetTopicAttributesCommand } from '@aws-sdk/client-sns';


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

    const subscribeTopic = async () => {

        let access_key_id = ""
        let secret_access_key = ""
    
        if (process.env.REACT_APP_ACCESS_KEY_ID && process.env.REACT_APP_SECRET_ACCESS_KEY) {
            access_key_id = process.env.REACT_APP_ACCESS_KEY_ID
            secret_access_key = process.env.REACT_APP_SECRET_ACCESS_KEY
        } else {
            console.log("ERROR: environment variables not found")
        }
    
        const creds = {
            accessKeyId: access_key_id,
            secretAccessKey: secret_access_key
        }
        const client = new SNSClient({ region: 'us-west-2', credentials: creds });
        const input = { // SubscribeInput
            TopicArn: "arn:aws:sns:us-west-2:107762387091:TakeTakeWestTopic", // required
            Protocol: "SQS", // required
            Endpoint: "arn:aws:sqs:us-west-2:107762387091:TakeTakeTopicQueue",
          };
        const command = new SubscribeCommand(input);
        try {
            const response = await client.send(command);
            console.log("response: " + JSON.stringify(response));
        } catch (error) {
            console.log(error);
        }
    }

    const joinGameRoom = async () => {
        // add the current user to the newly created GameRoom
        try {
            console.log("gameRoomID: " + currentGameRoomId);
            console.log("userID: " + auth.userId);

            const createUserGameRoomInput: CreateGameRoomUserInput = {
                gameRoomId: currentGameRoomId,
                userId: auth.userId
            }

            await API.graphql(
                graphqlOperation(mutations.createGameRoomUser, {
                    input: createUserGameRoomInput,
                })
            )
            setJoinedRoom(true);
            console.log("Added User (" + auth.userId + ") to GameRoom (" + currentGameRoomId + ")");
        } catch (error) {
            console.log(error);
        }
    }
    
    const createGameRoom = async () => {
        let newGameRoom;

        // create a new game room
        try {

            const newGameRoomData = await API.graphql(
                graphqlOperation(mutations.createGameRoom, { 
                    input: {
                        open: true,
                        rating: 800
                    } 
                })
            );

            const gameDataStr = JSON.stringify(newGameRoomData);
            const gameDataObj = JSON.parse(gameDataStr);

            if (!gameDataObj.data?.createGameRoom) {
                console.log("Error creating the game room");
                return;
            }

            newGameRoom = gameDataObj.data?.createGameRoom;

            console.log("Created GameRoom (" + newGameRoom.id + ")");
            setCurrentGameRoomId(newGameRoom.id);

        } catch (error) {
            console.log(error);
        }

    }

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

    const leaveGame = async () => {
        // remove the user from the matchmaking lobby
        try {

            const deleteUserInput = {
                id: "3cb9e655-b47b-49c8-88ba-342fa6154f00",
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
                    Current Game Room: {currentGameRoomId}
                </div>
                <div>
                    Did Join: {joinedRoom}
                </div>
                <div>
                    Opponent Id: {opponentId}
                </div>
            </div>
            <div className="flex flex-col">
                <div>
                    Current Game Room ID:
                    <input
                        onChange={(e) => setCurrentGameRoomId(e.target.value)}
                    />
                    Rating:
                    <input
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                    Ticket: 
                    <input
                        onChange={(e) => setTicket(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={joinGameRoom}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Join Room
                </button>
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
                <button
                    type="button"
                    onClick={subscribeTopic}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Subscribe
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
            </div>

            <div>
                <TestBoard
                    boardWidth={700}
                    joined_room_state={currentGameRoomId}
                    color_state={color}
                    draw_state={draw}
                    resign_state={resign}
                    set_draw_state={setDraw}
                />
            </div>

        </>
    )
}