import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";
import { Auth, Amplify, API, graphqlOperation } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE, GraphQLSubscription, GraphQLQuery } from '@aws-amplify/api';
import { userConfig } from "hardhat";
import { isReturnStatement } from "typescript";
import { create } from "domain";
import { 
    OnCreateMessageSubscription,
    CreateGameRoomInput,
    CreateMessageInput,
    OnUpdateGameRoomSubscription,
    GetGameRoomQuery,
    CreateGameRoomUserInput
} from "../API";

export const InteractionPage = () => {
    const auth = useAuth();

    type Message = {
        text: string,
        sender: string
    }

    const [currentGameRoomId, setCurrentGameRoomId] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([],);
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [oppenentHasJoined, setOpponentHasJoined] = useState(false);
    const [chatRoom, setChatRoom] = useState(null);
    const [receivedMsg, setReceivedMsg] = useState(false);


    // useEffect(() => {
    //     let sub: any;
    //     if (joinedRoom) {
    //         // first check that this client has joined a room
    //         // then get the new chatroom (player may have joined)
    //         // then subscribe to the new room
    //         console.log("getting updated chat room");
    //         API.graphql<GraphQLQuery<GetGameRoomQuery>>(graphqlOperation(queries.getGameRoom, { id: currentGameRoomId })).then(
    //             (result: any) => {
    //                 setChatRoom(result.data?.getChatRoom);
    //                 console.log("chat room updated");
    //             }
    //         );

    //         console.log("subscribing to room updates");
    //         sub = API.graphql<GraphQLSubscription<OnUpdateGameRoomSubscription>>(
    //             graphqlOperation(subscriptions.onUpdateGameRoom, { filter: { id: { eq: currentGameRoomId } } })
    //         ).subscribe({
    //             next: ({ value }) => console.log({value}),
    //             error: (error) => console.log(error)
    //         });
    //     }

    //     return () => {
    //         if (sub) {
    //             sub.unsubscribe();
    //         }
    //     }
    // }, [joinedRoom])

    // subscribe to messages and print the message along with the user who sent it
    useEffect(() => {
        let sub: any;
        // ensure that there is another player in the room before subscribing
        if (joinedRoom) {

            /**
             * 1. parse all the existing messages in the room
             * 2. subscribe to new messages in the room
             */

            console.log("subscribing to room messages");
            sub = API.graphql<GraphQLSubscription<OnCreateMessageSubscription>>(
                graphqlOperation(subscriptions.onCreateMessage, {
                    filter: { gameroomID: { eq: currentGameRoomId }},
                })).subscribe({
                    next: ({ value }) => {
                        const newText = value.data?.onCreateMessage?.text;
                        const newSender = value.data?.onCreateMessage?.userID;
                        console.log("text: " + newText + ", sender: " + newSender);
                        if (newText && newSender) {
                            const msg: Message = {
                                text: newText?.toString(),
                                sender: newSender?.toString()
                            }
                            setMessages(prevMessages => [...prevMessages, msg,]);
                        }
                    },
                    error: (error) => console.log(error)
                });
        }

        return () => {
            if (sub) {
                sub.unsubscribe();
            }
        };
    }, [joinedRoom])

    // useEffect(() => {
    //     // check if opponent has joined the room
    //     let sub: any;

    //     if (joinedRoom) {
    //         console.log("subscribing to user changes within the room");
    //         sub = API.graphql<GraphQLSubscription<OnUpdateUserGameRoomSubscription>>(
    //             graphqlOperation(subscriptions.onUpdateUserGameRoom, {
    //                 filter: { gameRoomId: { eq: currentGameRoomId }},
    //             })).subscribe({
    //                 next: ({ value }) => {
    //                     console.log("room update occured");
    //                     console.log({value});
    //                 },
    //                 error: (error) => console.log(error)
    //             });
    //     }

    //     return () => {
    //         if (sub) {
    //             sub.unsubscribe();
    //         }
    //     }
    // }, [joinedRoom])

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
            setJoinedRoom(true);
            console.log("Added User (" + auth.userId + ") to GameRoom (" + currentGameRoomId + ")");
        } catch (error) {
            console.log(error);
        }
    }

    const sendMessage = async () => {

        const newMessage: CreateMessageInput = {
            gameroomID: currentGameRoomId,
            text: message,
            userID: auth.userId
        }

        try {
            const newMessageData = await API.graphql(
                graphqlOperation(mutations.createMessage, { input: newMessage })
            );
            console.log("Successfully sent message");
        } catch (error) {
            console.log(error);
        }
    }

    const loadMessage = (text: string, sender: string, k: number) => {
        if (sender === auth.userId) {
            return (
                <li key={k} className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-white-700 bg-blue-600 rounded shadow">
                        <span className="block">{text}</span>
                    </div>
                </li>
            )
        } else {
            return (
                <li key={k} className="flex justify-end">
                    <div className="relative max-w-xl px-4 py-2 text-white-700 bg-gray-600 rounded shadow">
                        <span className="block">{text}</span>
                    </div>
                </li> 
            )
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
                    onClick={createGameRoom}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Create Room
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
                    Join Room
                </button>
                <div>
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={sendMessage}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Send Message
                </button>
            </div>
            <div className="container mx-auto">
            <div className="max-w-2xl border rounded">
                <div>
                <div className="w-full">
                    <div className="relative flex items-center p-3 border-b border-gray-300">
                    <img className="object-cover w-10 h-10 rounded-full"
                        src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
                    <span className="block ml-2 font-bold text-gray-600">{auth.userId}</span>
                    <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                    </span>
                    </div>
                    <div className="relative w-full p-6 overflow-y-auto h-[30rem]">
                        <ul>
                            {messages.map((msg, i) => ( loadMessage(msg.text, msg.sender, i) ))}
                        </ul>
                    </div>

                    <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">

                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>

                    <input onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Message"
                        className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                        name="message" required />
                    <button onClick={sendMessage} type="submit">
                        <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}