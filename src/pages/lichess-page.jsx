
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { API } from 'aws-amplify';
import { Auth } from './page_components/lichess/lichessAuth';
// import { useEditable } from '@chakra-ui/react';
// import { getUser } from '../graphql/queries';
import { ConnectWallet } from '../components/chess/ConnectWallet/ConnectWallet';

export const LichessPage = () => {

    // const [uname, setUname] = useState("");
    const [authState, setAuthState] = useState();
    const [hasSet, setHasSet] = useState(false);
    const [wallet, setWallet] = useState();
    const [gameCount, setGameCount] = useState(0);

    // const auth = new Auth();
    const auth = useMemo(() => new Auth(), []);
    const cognitoAuth = useAuth();

    useEffect( () => {
        if (!hasSet) {
            setAuthState(auth);
            setHasSet(true);
        }
    }, [hasSet, auth])

    const initAuth = async () => {
        await authState.init();
    }

    const login = async () => {
        await authState.login();
    }

    const logout = async () => {
        await authState.logout();
    }

    const getUname = async () => {
        if (authState.me) {
            console.log("authState.me.username: " + authState.me.username);
        }
    }

    const getGames = async () => {
        try {
            const res = await authState.fetchBody(`/api/user/${authState.me.username}/perf/blitz`, {
                method: 'get'
            });
            console.log("total_games_played: " + res.stat.count.all);
            setGameCount(res.stat.count.all);
        } catch (err) {
            console.log(err);
        }
    }

    const joinTournament = async () => {
        const requestInfo = {
            body: {
                "userId": cognitoAuth.userId,
                "walletAddress": wallet?.accounts[0].address,
                "lichessUsername": authState.me.username,
                "gameCount": gameCount
            },
            headers: { Authorization: cognitoAuth.token }
        }

        const data = await API.post('taketakerestapi', '/joinTournament', requestInfo);
        console.log({ data });
    }

    const printWallet = async () => {
        console.log("walletAddress: " + wallet?.accounts[0].address)
    }

    // const getGames = async () => {
    //     console.log("getting games...");
    //     if (authState.me.username) {
    //         // const games = await authState.getGames(authState.me.username);
    //         const games = await authState.getGames(authState.me.username);
    //         console.log("getGames: " + JSON.stringify(games));
    //     } else {
    //         console.log("user not logged in");
    //     }
    // }

    // need to implement an indicator showing that the user is
    // successfully logged into lichess

    return (
        <>
            <div>
                Username:
            </div>
            <button
                type="button"
                onClick={login}
                className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Login
            </button>
            <button
                type="button"
                onClick={logout}
                className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Logout
            </button>
            <button
                type="button"
                onClick={initAuth}
                className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Init Auth
            </button>
            <button
                type="button"
                onClick={getUname}
                className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Get Uname
            </button>
            <button
                type="button"
                onClick={getGames}
                className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Get Games
            </button>
            <button
                type="button"
                onClick={joinTournament}
                className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Join Tournament
            </button>
            <button
                type="button"
                onClick={printWallet}
                className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Log Wallet
            </button>
            <ConnectWallet set_wallet={setWallet}/>
        </>
    )


}