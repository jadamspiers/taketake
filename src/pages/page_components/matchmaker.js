import { Auth, Amplify, API, graphqlOperation } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE, GraphQLSubscription, GraphQLQuery } from '@aws-amplify/api';
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";
import { useEffect, useState } from 'react';

export const Matchmaker = async (userId, rating) => {
    const [lookForUsers, setLookForUser] = useState(false);
    let opponentId;

    // subscribe to new users if 'lookForUsers' is true
    // useEffect(() => {
    //     let sub;
    //     if (lookForUsers) {
    //         sub = API.graphql(
    //             graphqlOperation(subscriptions.onCreateUser, {
    //                 filter: {
    //                     and: [
    //                         { lobbyID: { eq: "26f89918-ed81-4d8f-a7b8-273ac004ab5c" } },
    //                         { rating: { between: [rating-100, rating+100] } }
    //                     ]
    //                 }
    //             })
    //         );
    //     }
    //     return () => {
    //         if (sub) {
    //             sub.unsubscribe();
    //         }
    //     }
    // }, [lookForUsers])

    // 1. throw the user into the Lobby
    try {
        const createUserInput = {
            name: userId,
            lobbyID: "26f89918-ed81-4d8f-a7b8-273ac004ab5c"
        }

        await API.graphql(
            graphqlOperation(mutations.createUser, {
                input: createUserInput,
            })
        )
    } catch (error) {
        console.log(error);
    }

    // 2. look for other users in the lobby with a similar rating then
    //  - remove them from the lobby
    //  - put them in a new game lobby
    try {
        const users = await API.graphql(
            graphqlOperation(queries.listUsers, {
                filter: {
                    and: [
                        { lobbyID: { eq: "26f89918-ed81-4d8f-a7b8-273ac004ab5c" } },
                        { rating: { between: [rating-100, rating+100] } }
                    ]
                }
            })
        );
        console.log("user: " + JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
    // 3. if there are no users in the lobby, then subscribe for any new users. do this for a minute before returning

    // 4. return the newly created [gamelobbyId] and the opponent's [userId]
}