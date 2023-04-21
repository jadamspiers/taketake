import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";
import { Auth, Amplify, API, graphqlOperation } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE, GraphQLSubscription } from '@aws-amplify/api';
import { userConfig } from "hardhat";
import { isReturnStatement } from "typescript";
import { create } from "domain";
import { 
    OnCreateMessageSubscription, 
    CreateGameRoomUserInput,
    CreateGameRoomInput
} from "../API";

export const ApiPage = () => {
    const auth = useAuth();

    const [currentGameRoomId, setCurrentGameRoomId] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    // create a useEffect hook to constantly monitor the state of 
    // "isSubscribed"
    // useEffect(() => {
    //     console.log("isSubscribed: " + isSubscribed);
    //     // retrieve messages real-time
    //     const sub = API.graphql<GraphQLSubscription<OnCreateMessageSubscription>>(
    //         graphqlOperation(subscriptions.onCreateMessage)).subscribe({
    //             next: ({ value }) => console.log(value.data?.onCreateMessage?.text),
    //             error: (error) => console.log(error)
    //         });

    //     if (!isSubscribed) {
    //         console.log("unsubscribing");
    //         sub.unsubscribe();
    //         return;
    //     }
    // }, [isSubscribed]);

    /**
     * 1. subscribe to all messages within the current gameroom
     */
    useEffect(() => {
        console.log("isSubscribed: " + isSubscribed);
        // retrieve messages real-time
        const sub = API.graphql<GraphQLSubscription<OnCreateMessageSubscription>>(
            graphqlOperation(subscriptions.onCreateMessage, {
                filter: { gameroomId: { eq: currentGameRoomId }},
            })).subscribe({
                next: ({ value }) => console.log(value.data?.onCreateMessage?.text),
                error: (error) => console.log(error)
            });

        if (!isSubscribed) {
            console.log("unsubscribing");
            sub.unsubscribe();
            return;
        }
    })

    const fetchUser = async () => {
        if (auth.isAuthenticated) {

            const userData = await API.graphql({
                query: queries.getUser,
                variables: { id: auth.userId },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            })

            console.log("userData: " + JSON.stringify(userData));

        } else {
            console.log("not authenticated");
        }
    }

    const createUser = async () => {
        if (auth.isAuthenticated) {

            try {
                const userData = await API.graphql(
                    graphqlOperation(queries.getUser, { id: auth.userId })
                );

                const userDataStr = JSON.stringify(userData);
                const userDataObj = JSON.parse(userDataStr);
                if (userDataObj.data.getUser) {
                    console.log("User already exists in DB");
                    return;
                }
            } catch (error) {
                console.log(error);
            }

            const newUser = {
                id: auth.userId,
                name: "User2",
                status: "hi"
            }

            try {
                // const result = await API.graphql({
                //     query: mutations.createUser,
                //     variables: { input: newUser },
                //     authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                // })
    
                const result = await API.graphql(
                    graphqlOperation(mutations.createUser, { input: newUser })
                );
    
                console.log("result: " + JSON.stringify(result));
            } catch (error) {
                console.log(error);
            }


        } else {
            console.log("not authenticated");
        }
    }

    const getUserId = () => {
        console.log(auth.userId);
    }

    const listUsers = async () => {
        if (auth.isAuthenticated) {

            const result = await API.graphql({
                query: queries.listUsers,
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            })

            console.log("result: " + JSON.stringify(result));

        } else {
            console.log("not authenticated");
        }
    }

    const createGameRoom = async () => {
        let newGameRoom;

        // create a new game room
        try {

            const newGameRoomData = await API.graphql(
                graphqlOperation(mutations.createGameRoom, { input: {} })
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

            console.log("Added User (" + auth.userId + ") to GameRoom (" + currentGameRoomId + ")");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex flex-col">
                <div>
                    Current game room: {currentGameRoomId}
                </div>
                <button
                    type="button"
                    onClick={getUserId}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Get User Id
                </button>
                <button
                    type="button"
                    onClick={fetchUser}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Fetch User Data
                </button>
                <button
                    type="button"
                    onClick={createUser}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Create User
                </button>
                <button
                    type="button"
                    onClick={listUsers}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    List Users
                </button>
                <button
                    type="button"
                    onClick={createGameRoom}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Create Game Room
                </button>
                <div>
                    <input
                        onChange={(e) => setCurrentGameRoomId(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={joinGameRoom}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Join Game Room
                </button>
                <button
                    type="button"
                    onClick={() => isSubscribed ? setIsSubscribed(false) : setIsSubscribed(true)}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Subscribe To Messages
                </button>
            </div>
        </>
    )
}