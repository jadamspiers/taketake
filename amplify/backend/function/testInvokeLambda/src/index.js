const fetch = require('node-fetch');

const GRAPHQL_ENDPOINT = process.env.API_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_GRAPHQLAPIKEYOUTPUT;

async function createGameRoom() {
    const query = /* GraphQL */ `
        mutation CREATE_USER($input: CreateUserInput!) {
            createUser(input: $input) {
                id
                name
            }
        }
    `;

    /**
     * BEGIN CREATE ROOM EXECUTION
     */
    console.log("game_check_01");
    const variables = {
        input: {
            name: "Bobby"
        }
    };

    console.log("game_check_02");
    /** @type {import('node-fetch').RequestInit} */
    const options = {
        method: 'POST',
        headers: {
        'x-api-key': GRAPHQL_API_KEY,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    };

    console.log("game_check_03");
    const request = new fetch.Request(GRAPHQL_ENDPOINT, options);
    
    console.log("game_check_04");
    try {
        const response = await fetch(request);
        const body = await response.json();
        if (body.errors) {
            console.log("body: " + JSON.stringify(body));
        }
    } catch (error) {
        console.log("error: " + error);
    }
    console.log("game_check_05");
    /**
     * END CREATE ROOM EXECUTION
     */

}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log("LAMBDA INVOKED!!");
    await createGameRoom();
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
};
