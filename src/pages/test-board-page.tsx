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
// import { useMatchmaker } from './page_components/matchmaker';

export const TestBoardPage = () => {

    const auth = useAuth();

    const [currentGameRoomId, setCurrentGameRoomId] = useState("");
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [color, setColor] = useState("");
    const [draw, setDraw] = useState(false);
    const [resign, setResign] = useState(false);

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

    const matchMaking = async () => {
        /**
         * 1. get a list of current open rooms
         * 2. if there are none then create a new room with open status and enter ranking of player
         * 3. if there is a room that is open and has a ranking within range then join
         */
        console.log("listing open game rooms");

        try {
            const openRooms = await API.graphql(
                graphqlOperation(queries.listGameRooms, {
                    filter: {
                        and: [
                            { rating: { between: [700, 900] } },
                            { open: { eq: true } }
                        ]
                    }
                })
            )

            const gameRooms = JSON.parse(JSON.stringify(openRooms));
            const items = gameRooms.data.listGameRooms.items
            if (items.length == 0) {
                console.log("no open game rooms");
                // create a new game room and join it
                createGameRoom();
            } else {
                const newRoom = items[0].id
                console.log("joining game room " + newRoom);
                setCurrentGameRoomId(newRoom);
            }
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

    return (
        <>
            <div>
                <div>
                    Current Game Room: {currentGameRoomId}
                </div>
                <div>
                    Did Join: {joinedRoom}
                </div>
            </div>
            <div className="flex flex-col">
                <div>
                    <input
                        onChange={(e) => setCurrentGameRoomId(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={matchMaking}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Matchmaking
                </button>
                {/* <button
                    type="button"
                    onClick={Matchmaker(auth.userId, 800)}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Matchmaker
                </button> */}
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
                <div>
                    Color:
                    <input
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
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