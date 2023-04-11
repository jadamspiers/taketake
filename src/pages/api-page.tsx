import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { userConfig } from "hardhat";
import { isReturnStatement } from "typescript";
import { create } from "domain";

export const ApiPage = () => {
    const auth = useAuth();

    // useEffect( () => {
    //     const fetchUser = async () => {
    //         if (auth.isAuthenticated) {
    //             const userData = await API.graphql(
    //                 graphqlOperation(
    //                     getUser, 
    //                     { id: 1, }
    //                 )
    //             )
    //         }
    //     }
    // })

    const fetchUser = async () => {
        if (auth.isAuthenticated) {

            const userData = await API.graphql({
                query: queries.getUser,
                variables: { id: auth.userId },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            })

            console.log("userData: " + JSON.stringify(userData));

        } else {
            console.log("not authenticated");
        }
    }

    const createUser = async () => {
        if (auth.isAuthenticated) {

            const newUser = {
                id: auth.userId,
                name: auth.username,
                status: "AYOOOO"
            }

            await API.graphql({
                query: mutations.createUser,
                variables: { input: newUser },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            })

        } else {
            console.log("not authenticated");
        }
    }

    const getUserId = () => {
        console.log(auth.userId);
    }


    return (
        <>
            <div className="flex flex-col">
                <button
                    type="button"
                    onClick={getUserId}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Get User Id
                </button>
                <button
                    type="button"
                    onClick={fetchUser}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Fetch User Data
                </button>
                <button
                    type="button"
                    onClick={createUser}
                    className="h-12 px-4 m-2 rounded-md bg-indigo-600  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Create User
                </button>
            </div>
        </>
    )
}