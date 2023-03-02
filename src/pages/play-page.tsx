import React, { useEffect, useRef, useState } from 'react';
import { Tabs } from '../components/chess/tabs/tabs';
import { Panel } from '../components/chess/panel';
import {StyledBoard} from '../components/chess/styled-board';
import { useAuth0 } from '@auth0/auth0-react';
import { ConnectWallet } from '../components/chess/ConnectWallet/ConnectWallet';
import axios from '../api/axios';

export const PlayPage: React.FC = () => {

    const GET_OPPONENT_ADDRESS_URL = '/getopponentaddress'

    const { user } = useAuth0();
    const [users, setUsers] = useState<any[]>([]);
    const [message, setMessage] = useState('');
    const [roomSender, setRoomSender] = useState('');
    const [room, setRoom] = useState<any>();
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [senderMessage, setSenderMessage] = useState('');
    const [socketMsg, setSocketMsg] = useState();
    const [loadChat, setLoadChat] = useState(false);
    const [lastMove, setLastMove] = useState<any>();
    const [username, setUsername] = useState('');
    const [wallet, setWallet] = useState();
    const [didWin, setDidWin] = useState();
    const [opponentAddress, setOpponentAddress] = useState();
    const [triggerTransaction, setTriggerTransaction] = useState(false);
    const [color, setColor] = useState('');
    const [turn, setTurn] = useState();
    const [opponentTimeExpired, setOpponentTimeExpired] = useState(false);
    const [myTimeExpired, setMyTimeExpired] = useState(false);
    const [triggerDrawPrompt, setTriggerDrawPrompt] = useState(false);
    const [isMutualDraw, setIsMutualDraw] = useState(false);
    const [opponentResigned, setOpponentResigned] = useState(false);
    const [selfResigned, setSelfResigned] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    let didConnect = false;

    useEffect(() => {
        if (!didConnect) {
            didConnect = true;
            connect();
            console.log("calling connect()")
        }
    }, []);

    useEffect(() => {
        if (users.length !== 0) {
            console.log("Users: " + JSON.stringify(users))
        }
    }, [users]);

    useEffect(() => {
        if (didWin === false) {
            console.log("YOU FUCKING LOST")
            // get opponent's address
            getOpponentAddress()
            // then trigger the transaction once the address is recieved
        } else if (didWin === true) {
            console.log("YOU FUCKING WON!")
        }
    }, [didWin]);

    useEffect(() => {
        if (opponentAddress !== undefined) {
            setTriggerTransaction(true);
        }
    }, [opponentAddress])


    // if this player loses, then get the opponent's address and send them your wager
    const getOpponentAddress = () => {

        // be cautious: double check if this player lost
        if (didWin === false) {
            axios.post(
                GET_OPPONENT_ADDRESS_URL,
                JSON.stringify({ name: username }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            ).then(function (response) {
                console.log("GOA response: " + JSON.stringify(response.data))
                setOpponentAddress(response.data.opponentAddress)
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log(error.message);
                }
            })
        } else {
            console.log("WARNING: THIS USER DID NOT LOSE");
            return;
        }
    }

    const connect = () => {
        ws.current = new WebSocket('ws://localhost:8080/ws' + "?name=" + user?.name);
        console.log("WEBSOCKET: " + JSON.stringify(ws))
      
        ws.current?.addEventListener('open', (event) => {
          console.log("connected to websocket as " + user?.name)
        });

        if (user?.name) {
            setUsername(user?.name);
        }

        ws.current?.addEventListener('message', (event) => {
            handleNewMessage(event);
        });
    }

    const handleNewMessage = (event: MessageEvent) => {
        let data = event.data;
        data = data.split(/\r?\n/);
        for (let i = 0; i < data.length; i++) {
          let msg = JSON.parse(data[i]);
          setSocketMsg(msg);
          switch (msg.action) {
            case "user-join":
              handleUserJoined(msg);
              console.log("received 'user-joined' action");
              break;
            case "send-message":
              handleChatMessage(msg);
              console.log("received 'send-message' action");
              console.log("message: '" + msg.message + "' from " + msg.sender.name);
              break;
            case "send-move":
              handleMoveMessage(msg);
              console.log("received 'send-move' action");
              console.log("move: " + msg.message + "' from " + msg.sender.name);
              break;
            case "send-timeout":
              handleTimeoutMessage(msg);
              console.log("received 'send-timeout' action from " + msg.sender.name);
              break;
            case "send-draw":
              handleDrawAction(msg);
              console.log("received 'send-draw' action from " + msg.sender.name);
              break;
            case "send-drawaccepted":
              handleDrawAcceptedAction(msg);
              console.log("received 'send-drawaccepted' action from " + msg.sender);
              break;
            case "send-resign":
              handleResignAction(msg);
              console.log("received 'send-resign' action from " + msg.sender);
              break;
            case "room-joined":
              handleRoomJoined(msg);
              console.log("received 'room-joined' action");
              setLoadChat(true);
              break;
            default:
              break;
          }
        }
    }

    const handleMoveMessage = (msg: any) => {
        // if the sender is myself, then don't change the board
        // if the sender is the opponent, then change the board
        console.log("msg.sender.name: " + msg.sender.name);
        console.log("user?.name: " + user?.name);
        if (msg.sender.name !== user?.name) {
            // convert the move string to JSON
            setLastMove(JSON.parse(msg.message));
        }
    }

    const handleUserJoined = (msg: any) => {
        setUsers(users => [...users, msg.sender]);
    }

    const handleChatMessage = (msg: any) => {
        if (typeof room !== 'undefined') {
          room.messages.push(msg);
          console.log("room.messages: " + room.messages)
        }
    
        if (msg.sender.name === user?.name) {
            setRoomSender('self');
        } else {
            setRoomSender('other')
        }
        setSenderMessage(msg.message);
    }

    const handleRoomJoined = (msg: any) => {
        const newRoom = msg.target;
        newRoom.name = newRoom.private ? msg.sender.name : newRoom.name;
        newRoom["messages"] = [];
        setRoom(newRoom);
        setRoomName(newRoom.name);
        setRoomId(newRoom.id);
    }

    const handleTimeoutMessage = (msg: any) => {
        if (msg.sender.name !== user?.name) {
            setOpponentTimeExpired(true);
        } else if (msg.sender.name === user?.name) {
            setMyTimeExpired(true);
        }
    }

    const handleDrawAction = (msg: any) => {
        if (msg.sender.name !== user?.name) {
            setTriggerDrawPrompt(true);
        }
    }

    const handleDrawAcceptedAction = (msg: any) => {
        if (msg.sender.name !== user?.name) {
            setIsMutualDraw(true);
        }
    }

    const handleResignAction = (msg: any) => {
        if (msg.sender.name !== user?.name) {
            setOpponentResigned(true);
        } else if (msg.sender.name === user?.name) {
            setSelfResigned(true);
        }
    }
    

    return (
        <div className="bg-slate-400">
            <div className="grid h-screen place-items-center">
                <div className="flex flex-row place-content-center space-x-20">
                    <div className="z-50">
                        <ConnectWallet set_wallet={setWallet} state_trigger_transaction={triggerTransaction} opponent_address={opponentAddress} />
                    </div>
                    <div>
                        {/* <Panel /> */}
                        <Tabs 
                            ws={ws} 
                            username={username} 
                            set_color={setColor} 
                            load_chat_function={setLoadChat} 
                            load_chat_state={loadChat} 
                            room={room} 
                            socket_msg={socketMsg} 
                            users_array={users} 
                            room_name={roomName} 
                            room_id={roomId} 
                            room_sender={roomSender} 
                            sender_message={senderMessage} 
                            state_wallet={wallet} 
                            state_did_win={didWin}
                            state_turn={turn}
                            state_opponent_time_expired={opponentTimeExpired}
                            state_trigger_draw_prompt={triggerDrawPrompt}
                            set_trigger_draw_prompt={setTriggerDrawPrompt}
                            set_is_mutual_draw={setIsMutualDraw}
                            state_opponent_resigned={opponentResigned}
                        />
                    </div>
                    <div>
                        <StyledBoard 
                            boardWidth={700} 
                            color_state={color} 
                            ws={ws} 
                            room={room} 
                            last_move_state={lastMove}
                            set_did_win={setDidWin}
                            set_turn={setTurn}
                            state_opponent_time_expired={opponentTimeExpired}
                            state_my_time_expired={myTimeExpired}
                            state_is_mutual_draw={isMutualDraw}
                            state_opponent_resigned={opponentResigned}
                            state_self_resigned={selfResigned}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
