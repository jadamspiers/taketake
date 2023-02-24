import React, { useEffect, useState } from 'react';
import { ChatBox } from './tab-content-chat';
import { FriendContent } from './tab-content-friends';
import { RandomContent } from './tab-content-random';


export const Tabs = ({ 
    ws, 
    username, 
    set_color, 
    load_chat_function, 
    load_chat_state, 
    room, 
    socket_msg, 
    users_array, 
    room_name, 
    room_id, 
    room_sender, 
    sender_message, 
    set_is_time_expired, 
    state_wallet, 
    state_did_win,
    state_turn,
    state_opponent_time_expired
}: any) => {

    useEffect(() => {
        console.log(JSON.stringify(users_array))
        console.log("room_name: " + room_name);
        console.log("room_id: " + room_id);
        console.log("room_sender: " + room_sender);
        console.log("sender_message: " + sender_message);
    }, [])

    const [toggleState, setToggleState] = useState(1);
    
    const toggleTab = (index: any) => {
        setToggleState(index);
    };

    useEffect(() => {
        console.log("loadChat updated");
    }, [load_chat_state])

    return (
        /* Container */
        <div className="flex flex-col rounded-xl relative w-500px h-700px bg-gray-100">
            {/* Tabs */}
            <div className="flex justify-around">
                <div className={toggleState === 1 ? "flex items-center justify-center h-12 w-full rounded-tl-xl bg-gray-100" : "flex items-center justify-center h-12 w-full rounded-tl-xl bg-gray-500"}>
                    <button 
                        className="w-full h-full"
                        onClick={() => toggleTab(1)}
                    >
                        Tab 1
                    </button>
                </div>
                <div className={toggleState === 2 ? "flex items-center justify-center h-12 w-full bg-gray-100" : "flex items-center justify-center h-12 w-full bg-gray-500"}>
                    <button 
                        className="w-full h-full"
                        onClick={() => toggleTab(2)}
                    >
                        Friends
                    </button>
                </div>
                <div className={toggleState === 3 ? "flex items-center justify-center h-12 w-full rounded-tr-xl bg-gray-100" : "flex items-center justify-center h-12 w-full rounded-tr-xl bg-gray-500"}>
                    <button 
                        className="w-full h-full"
                        onClick={() => toggleTab(3)}
                    >
                        Chat
                    </button>
                </div>
            </div>
            {/* Content */}
            <div>
                <div
                    className={toggleState === 1 ? "w-full h-full block" : "w-full h-full hidden"}
                >
                    <h2>Content 1</h2>
                    {/* <div className="flex items-center justify-center h-52">
                        <RandomContent username={username} set_color={set_color} set_is_time_expired={set_is_time_expired} state_wallet={state_wallet} state_did_win={state_did_win}/>
                    </div> */}
                    <RandomContent 
                        ws={ws}
                        username={username} 
                        set_color={set_color} 
                        set_is_time_expired={set_is_time_expired} 
                        state_wallet={state_wallet} 
                        state_did_win={state_did_win} 
                        state_turn={state_turn}
                        state_room={room}
                        state_opponent_time_expired={state_opponent_time_expired}
                    />
                </div>
                <div
                    className={toggleState === 2 ? "w-full h-full block" : "w-full h-full hidden"}
                >
                    <h2>Friends</h2>
                    <FriendContent ws={ws} users_array={users_array} load_chat_function={load_chat_function} />
                </div>
                <div
                    className={toggleState === 3 ? "w-full h-full block" : "w-full h-full hidden"}
                >
                    <h2>Chat</h2>
                    {/*
                        Need to monitor the loadChat state.
                        We'll have a default chat window that is just empty (when loadChat is false)
                        Then when loadChat is true, we send chatbox with specialized props
                    */}
                    {
                    load_chat_state
                        ? <ChatBox ws={ws} room={room} name={room_name} id={room_id} sender={room_sender} senderMsg={sender_message} load_chat_state={load_chat_state}/>
                        : <div>default chat state</div>
                    }
                    {/* <ChatBox name={room_name} id={room_id} sender={room_sender} senderMsg={sender_message} load_chat_state={loadChat}/> */}
                </div>
            </div>
        </div>
    )
}