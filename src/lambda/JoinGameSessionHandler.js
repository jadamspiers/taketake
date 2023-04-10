const {
    GameLiftClient,
    SearchGameSessionsCommand,
    DescribeGameSessionQueuesCommand,
    StartGameSessionPlacementCommand,
    CreatePlayerSessionCommand
} = require('@aws-sdk/client-gamelift');

let access_key_id = ""
let secret_access_key = ""
let response;

if (process.env.ACCESS_KEY_ID && process.env.SECRET_ACCESS_KEY) {
    access_key_id = process.env.ACCESS_KEY_ID
    secret_access_key = process.env.SECRET_ACCESS_KEY
} else {
    console.log("ERROR: environment variables not found")
}

const creds = {
    accessKeyId: access_key_id,
    secretAccessKey: secret_access_key
}

const client = new GameLiftClient({ region: 'us-west-2', credentials: creds });
const TARGET_GAMELIFT_QUEUE_NAME = "TakeTakeQueue";
const REQUEST_FIND_MATCH = "1";
const MAX_PLAYER_COUNT = 2;

// get the active session
// add the player given

/*
 * [POST] "/"
 */