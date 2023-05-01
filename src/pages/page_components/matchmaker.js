// const { default: fetch, Request } = require("node-fetch");
const fetch = require('node-fetch');

const GRAPHQL_ENDPOINT = process.env.API_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_GRAPHQLAPIKEYOUTPUT;

// const query = /* GraphQL */ `
//     query LIST_USERS {
//         listUsers {
//             items {
//                 id
//                 name
//             }
//         }
//     }
// `;

const query = /* GraphQL */ `
    mutation CREATE_USER($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
            lobbyID
        }
    }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    let playerId;
    let playerName;
    let playerRating;
    
    // 1. accept the request user and their [userId] and [rating]
    if (event.body) {
        const body = JSON.parse(event.body);
        playerId = body.id;
        playerName = body.name;
        playerRating = body.rating;
        console.log("playerId: " + playerId);
    } else {
        response = {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify({
                message: "Missing body"
            })
        };
        return response;
    }

    // 2. throw the user into the Lobby

    // 3. look for other users in the lobby with a similar rating then
    //  - remove them from the lobby
    //  - put them in a new game lobby
    // 4. return the newly created [gamelobbyId] and the opponent's [userId]


    // test graphql user listing
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'x-api-key': GRAPHQL_API_KEY,
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ query })
    // };

    // const request = new fetch.Request(GRAPHQL_ENDPOINT, options);
    // console.log("request: " + request);

    // let statusCode = 200;
    // let body;
    // let response;

    // try {
    //     response = await fetch(request);
    //     body = await response.json();
    //     if (body.errors) {
    //         statusCode = 400;
    //         console.log("body: " + JSON.stringify(body));
    //     } 
    // } catch (error) {
    //     statusCode = 400;
    //     body = {
    //         errors: [
    //             {
    //                 status: response.status,
    //                 message: error.message,
    //                 stack: error.stack
    //             }
    //         ]
    //     }
    // }

    // test graphql user creation
    const variables = {
        input: {
            name: playerName,
            lobbyID: "7b36e60f-ecd3-4219-b478-5bdd74c32adf"
        }
    };


    /** @type {import('node-fetch').RequestInit} */
    const options = {
        method: 'POST',
        headers: {
        'x-api-key': GRAPHQL_API_KEY,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    };

    const request = new fetch.Request(GRAPHQL_ENDPOINT, options);
    console.log("request: " + JSON.stringify(request));

    let statusCode = 200;
    let body;
    let response;

    try {
        response = await fetch(request);
        body = await response.json();
        if (body.errors) {
            console.log("body: " + JSON.stringify(body));
            statusCode = 400;
        }
    } catch (error) {
        console.log("error: " + error);
        console.log("response: " + response);
        statusCode = 400;
        body = {
            errors: [
                {
                    status: response.status,
                    message: error.message,
                    stack: error.stack
                }
            ]
        };
    }

    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(body)
    }
};
