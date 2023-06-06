import { useAuth } from '../hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import { Auth, Amplify, API, graphqlOperation } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE, GraphQLSubscription } from '@aws-amplify/api';
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";
import { 
    OnCreateMessageSubscription,
    CreateGameRoomInput,
    CreateMessageInput,
    OnUpdateGameRoomSubscription,
    GetGameRoomQuery,
    CreateGameRoomUserInput,
    OnCreateGameRoomSubscription
} from "../API";
import LeaderboardList from './page_components/leaderboard-list';

export const LeaderboardPage = () => {

    const auth = useAuth();

    const [gameRoomId, setGameRoomId] = useState("");
    const [leaderboard, setLeaderboard] = useState([]);

    const getLeaderboard = async () => {
        const requestInfo = {
            body: { 
                "gameRoomId": gameRoomId
            },
            headers: { Authorization: auth.token }
        }

        const data = await API.post('taketakerestapi', '/leaderboard', requestInfo);
        console.log({ data });

        // console.log("User1: " + data.Items[0].userId.S);
        // console.log("User1_rating: " + data.Items[0].rating.S);
        // console.log("User2: " + data.Items[1].userId.S);
        // console.log("User2_rating: " + data.Items[1].rating.S);


        // setNames(current => [...current, 'Carl']);
        for (let i in data.Items) {
            let user = {
                id: i,
                userId: data.Items[i].userId.S,
                rating: data.Items[i].rating.S
            }
            console.log("adding user: " + JSON.stringify(user));
            // 1. if the leaderboard is empty then FILL it
            // 2. if the leaderboard is not empty then ADD to it
            setLeaderboard(prevState => [...prevState, user]);
        }
    }
    console.log("pre leaderboard: " + JSON.stringify(leaderboard));

    return (
        <>
            <div>
                Game Room ID:
                <input
                    onChange={(e) => setGameRoomId(e.target.value)}
                />
            </div>

            <button
                type="button"
                onClick={getLeaderboard}
                className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Get Leaderboard
            </button>
            <LeaderboardList
                gameRoomId={gameRoomId}
                leaderboard={leaderboard}
            />
        </>
    )
}

