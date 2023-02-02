import { writeSync } from 'fs';
import React from 'react';

export const FriendContent = (props: any) => {

    // 1. Websocket connection [ws]

    const joinPrivateRoom = (room: any) => {
        props.ws.current?.send(JSON.stringify({ action: 'join-room-private', message: room.id }));
        console.log("joining private room: " + room.id)
    }

    const launchChat = (user_object: any) => {
        // load the chat window with the target client
        // change chat window name
        // 1. onClick should should update the parent state with the following props to load ChatBox
        //  -  name
        //  -  sender
        //  -  sender message
        // 2. once the load chat function has been called, we need to set loadchat
        //    back to false within the chatbox
        // props.load_chat_function(true);

        console.log("loading chat with " + JSON.stringify(user_object));
        props.load_chat_function(true);
        joinPrivateRoom(user_object);

        // 1. Change the chat name to the current room
    }

    return (
        <div className="container mx-auto">
            <div className="max-w-2xl border rounded">
                <button onClick={() => console.log("List Users: " + JSON.stringify(props.users_array))}>List Users</button>
                <div className="w-full">
                    <div className="relative w-full p-6 overflow-y-auto h-52">
                        {props.users_array.map((user: any, i: any) => (<button onClick={() => launchChat(user)} className="flex" key={i}>{user.name}</button>))}
                    </div>
                </div>
            </div>
            <button
                className="flex items-center justify-center rounded-full bg-green-500 text-white w-32 h-14 text-xl"
            >
                Play
            </button>
        </div>
    )
}