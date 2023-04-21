

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


exports.handler = async (event) => {

    
    // 1. accept the request user and their [userId] and [rating]

    // 2. throw the user into the Lobby

    // 3. look for other users in the lobby with a similar rating then
    //  - remove them from the lobby
    //  - put them in a new game lobby
    // 4. return the newly created [gamelobbyId] and the opponent's [userId]

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
