import { 
    GameLiftClient,
    SearchGameSessionsCommand,
    CreateGameSessionCommand,
    StartMatchmakingCommand,
    Player,
    AttributeValue,
    DescribeMatchmakingCommand,
    DescribeMatchmakingCommandInput
} from '@aws-sdk/client-gamelift';
import { AwsCredentialIdentity } from '@aws-sdk/types';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { API } from 'aws-amplify';

export const StartPage: React.FC = () => {

    const auth = useAuth();

    const BASE_URL = "https://l9enhqw3xd.execute-api.us-west-2.amazonaws.com/test"
    const SEARCH_GAME_SESSION_URL = "/searchgamesession"
    const CREATE_GAME_SESSION_URL = "/creategamesession"
    const START_MATCHMAKING_URL = "/startmatchmaking"
    const ACTUAL_URL = "https://nt6eri5mp6.execute-api.us-west-2.amazonaws.com/test1/searchgamesessions"

    const hello = async () => {
        const requestInfo = {
            headers: { Authorization: auth.token }
        }
        await API.get('taketakeapi', '/hello', requestInfo)
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const createGameSession = async () => {

        const requestInfo = {
            body: { 
                "skill": "900",
                "playerId": "player2"
            },
            headers: { Authorization: auth.token }
        }

        const data = await API.post('taketakeapi', '/createplayersession', requestInfo);
        console.log({ data });
    }

    const searchGameSessions = async () => {
        const requestInfo = {
            headers: { Authorization: auth.token }
        }
        await API.get('taketakeapi', '/searchgamesessions', requestInfo)
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const startMatchmaking = async () => {
        const requestInfo = {
            body: {
                skill: "900",
                playerId: "player2"
            },
            headers: { Authorization: auth.token }
        }
        await API.post('taketakeapi', '/startmatchmaking', requestInfo)
            .then((response) => {
                console.log({ response });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const printToken = async () => {
        console.log(auth.token);
    }


    return (
        <>
            <div className="flex flex-col">
                <button
                    type="button"
                    onClick={hello}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Hello
                </button>
                <button
                    type="button"
                    onClick={printToken}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Print Token
                </button>
                <button
                    type="button"
                    onClick={searchGameSessions}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Search Game Sessions
                </button>
                <button
                    type="button"
                    onClick={createGameSession}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Create New Game Session
                </button>
                <button
                    type="button"
                    onClick={startMatchmaking}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Start Matchmaking
                </button>
            </div>
        </>
    );
}