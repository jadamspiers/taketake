import axios from '../../../api/axios';
import React, { useEffect, useState } from 'react';
import { CountdownTimer } from '../CountdownTimer';
import { useToast, Wrap } from '@chakra-ui/react';
import { WagerInput } from '../wager-input';

export const RandomContent = ({ username, set_color, set_is_time_expired, state_wallet }: any) => {

    const THREE_DAYS_IN_MS = 10 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

    const JOIN_LOBBY_URL = '/joinlobby'

    const toast = useToast()

    const [wager, setWager] = useState();


    useEffect(() => {

        if (state_wallet !== undefined) {
            console.log("walletAddress: " + state_wallet?.accounts[0].address)
        }
    }, [state_wallet]);

    const joinLobby = () => {

        // 1. check if wallet is connected
        // 2. check if wager was set

        if (state_wallet !== undefined && wager !== undefined) {
            axios.post(
                JOIN_LOBBY_URL,
                JSON.stringify({ name: username, address: state_wallet?.accounts[0].address, wager }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            ).then(function (response) {            console.log(response.data);
                console.log("response: " + JSON.stringify(response.data.color));
                set_color(response.data.color);
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
            console.log("no wallet found or wager not set");
            return;
        }
    }

    return (
        <>
            <div className="container mx-auto">
                <button
                    onClick={joinLobby}
                    className="flex items-center justify-center rounded-full bg-green-500 text-white w-32 h-14 text-xl"
                >
                    Play
                </button>
                <CountdownTimer targetDate={dateTimeAfterThreeDays} set_is_time_expired={set_is_time_expired} />
                <WagerInput set_wager={setWager} />
            </div>
        </>

    )
}