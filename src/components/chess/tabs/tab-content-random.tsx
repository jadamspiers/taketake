import axios from '../../../api/axios';
import React, { useEffect, useState } from 'react';
import { useToast, Wrap } from '@chakra-ui/react';
import { WagerInput } from '../wager-input';
import { contractAddress, ownerAddress } from '../../../chain/config';
import Game from '../../../chain/artifacts/contracts/Game.sol/Game.json';
import { ethers } from 'ethers';
import { LoadingIcon } from '../Timer/LoadingIcon';

export const RandomContent = ({ username, set_color, state_wallet, state_did_win, state_turn }: any) => {

    const THREE_DAYS_IN_MS = 10 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

    const JOIN_LOBBY_URL = '/joinlobby'

    const toast = useToast()

    const [wager, setWager] = useState();
    const [myColor, setMyColor] = useState();
    const [timeExpired, setTimeExpired] = useState(false);

    useEffect(() => {

        if (state_wallet !== undefined) {
            console.log("walletAddress: " + state_wallet?.accounts[0].address)
        }
    }, [state_wallet]);

    useEffect(() => {
        if (timeExpired === true) {
            console.log("TIME HAS EXPIRED");
            settleBet();
        }
    }, [timeExpired]);

    useEffect(() => {
        console.log("calling settleBet()")
        if (state_did_win === true) {
            settleBet();
        }
    }, [state_did_win])

    useEffect(() => {
        if (state_turn !== undefined && myColor !== undefined) {
            loadTimer();
        }
    }, [state_turn, myColor])

    function loadTimer() {
        if (state_turn !== undefined && myColor !== undefined) {
            return <LoadingIcon time={15} state_turn={state_turn} myColor={myColor} set_time_expired={setTimeExpired}/>
        } else {
            return <LoadingIcon time={30}/>
        }
    }

    async function proposeBet() {
        const provider = new ethers.providers.Web3Provider(state_wallet.provider, 'any')
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Game.abi, signer)
        const data = await contract.proposeBet(610, {value: ethers.utils.parseEther('10')})
        console.log("proposeBet(): " + JSON.stringify(data))
    }

    async function settleBet() {
        const provider = new ethers.providers.JsonRpcProvider()
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, Game.abi, signer)
        const data = await contract.settleBet(610)
        console.log("settleBet(): " + JSON.stringify(data))
    }

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
            ).then(function (response) {            
                console.log(response.data);
                console.log("response: " + JSON.stringify(response.data.color));
                set_color(response.data.color);
                setMyColor(response.data.color);
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
                <div className="flex">
                    <WagerInput set_wager={setWager} />

                </div>
                <button
                    onClick={() => proposeBet()}
                >
                    Propose
                </button>
                <button
                    onClick={() => settleBet()}
                >
                    Settle
                </button>
                {/* {myColor !== undefined
                    ? <LoadingIcon time={180} state_turn={state_turn} myColor={myColor} set_time_expired={setTimeExpired}/>
                    : <LoadingIcon time={30}/>
                } */}
                    {loadTimer()}
                <button
                    onClick={joinLobby}
                    className="flex items-center justify-center rounded-full bg-green-500 text-white w-32 h-14 text-xl"
                >
                    Play
                </button>
            </div>
        </>

    )
}