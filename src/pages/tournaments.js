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
import TournamentCards from './page_components/tournament-cards';

export const TournamentPage = () => {

    return (
        <>
            <div>
                hi
            </div>
            <TournamentCards />
        </>
    )
}

