import './style.css';
import { GameLiftRealtimeClient, ConnectionToken, RTMessage } from 'gamelift-realtime-client';
import { Buffer } from 'buffer';
import { createGameWithPlayer, joinGameWithPlayer, GAMELIFT_USE_SSL } from './awsSdkSetup';

// ----------------------------------------------------------
// Start by setting up a simple interface
// ----------------------------------------------------------

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <div>
    <h1>GameLift Realtime Client Example</h1>
    <div id="connect">
      <label for="game-session-name">Game session name:</label>
      <input type="text" id="game-session-name"></br></br>
      <button id="create-session">Create</button>
      <button id="join-session">Join</button></br></br>
    </div>
    <h3 id="connected-session-name"></h3>
    <div id="clients">
      <h2 style="display: inline-block">Clients: </h2>
    </div>
    <button id="disconnect">Disconnect</button>
  </div>
`;

const connectDiv = document.querySelector<HTMLDivElement>('#connect')!;
const clientsDiv = document.querySelector<HTMLDivElement>('#clients')!;
const sessionNameField = document.querySelector<HTMLInputElement>('#game-session-name')!;
const connectedSessionName = document.querySelector<HTMLHeadingElement>('#connected-session-name')!;
const createSessionButton = document.querySelector<HTMLButtonElement>('#create-session')!;
const joinSessionButton = document.querySelector<HTMLButtonElement>('#join-session')!;
const disconnectButton =  document.querySelector<HTMLButtonElement>('#disconnect')!;
disconnectButton.hidden = true;
clientsDiv.hidden = true;

let playerSession: PlayerSession;

// ----------------------------------------------------------
// When we click either 'Create' or 'Join', we can use the 
// existing '@aws-sdk/client-gamelift' to provide us with
// a PlayerSession.
// 
// Since creating PlayerSessions is not related to this lib
// itself, that functionality is handled by the two functions
// inside './awsSdkSetup'
// ----------------------------------------------------------

createSessionButton.addEventListener('click', async () => {
    createSessionButton.disabled = true;
    const gameSessionName = sessionNameField.value;
    playerSession = await createGameWithPlayer(gameSessionName);
    connectedSessionName.innerText = 'Session name: ' + gameSessionName;
    clientsDiv.hidden = false;
});

joinSessionButton.addEventListener('click', async () => {
    joinSessionButton.disabled = true;
    const gameSessionName = sessionNameField.value;
    playerSession = await joinGameWithPlayer(gameSessionName);
    const sessionNameElement = document.createElement('span');
    connectedSessionName.innerText = 'Session name: ' + gameSessionName;
    clientsDiv.hidden = false;
});

// Just do nothing until we have a valid player session from the AWS sdk
while (!playerSession) await new Promise(r => setTimeout(r, 250));
console.log("Player session available, joining it from our Realtime Client");
connectDiv.hidden = true;


// ----------------------------------------------------------
// Now we have a PlayerSession object, we can initialise
// a GameLiftRealtimeClient with details contained within it
// ----------------------------------------------------------

// First create a ConnectionToken using our given endpoint
// components along with our PlayerSessionId

const protocol = GAMELIFT_USE_SSL ? 'wss' : 'ws';
const connectionToken: ConnectionToken = {
    serverEndpoint: `${protocol}://${playerSession['DnsName']}:${playerSession['Port']}`,
    playerSessionId: playerSession['PlayerSessionId']
};

// Then construct the GameLiftRealtimeClient object
const gameLiftRealtimeClient = new GameLiftRealtimeClient(connectionToken);

// ----------------------------------------------------------
// GameLift Realtime makes use of OpCodes for lightweight
// messaging, so declare some we want to listen for
// ----------------------------------------------------------
const enum GameOpCode {
    UserLoggedIn = -500,
    UserLoggedOut = -501,
    IncrementCounter = 100
}

// ----------------------------------------------------------
// We can set callbacks for the network events we wish to
// subscribe to
// ----------------------------------------------------------
gameLiftRealtimeClient.onLogin.subscribe(() => {
    console.log(`Player '${playerSession["PlayerId"]}' successfully logged in to GameLift session`);
    // this callback notifies every other user that we've logged in
    const loginMessage = gameLiftRealtimeClient.newMessage(GameOpCode.UserLoggedIn);
    gameLiftRealtimeClient.sendMessage(loginMessage);
});

// ----------------------------------------------------------
// Our onDataReceived callback function can implement
// game functionality as realtime messages are received
// ----------------------------------------------------------

gameLiftRealtimeClient.onDataReceived.subscribe(handleGameMessages);

const clientButtons = new Map<int, HTMLButtonElement>();
const clientLocations = new Map<int, string>();
const counters = new Map<int, int>();

let me = -1;

function handleGameMessages(message: RTMessage) {
    switch (message.opCode) {

	case GameOpCode.UserLoggedIn: {
	    if (counters.has(message.sender)) break;
	    // keep track of who this user is
	    if (me === -1) me = message.sender;
	    else if (!counters.has(message.sender)) {
		// if it's someone else, make them know that we exist, too
		const loginMessage = gameLiftRealtimeClient.newMessage(GameOpCode.UserLoggedIn);
		gameLiftRealtimeClient.sendMessage(loginMessage, message.sender);
	    }
	    // for each user that logs in, lets create a
	    // button for them to click
	    const clientButton = document.createElement('button');
	    const location = (message.sender === me) ? '(you)' : '(them)';
	    clientLocations.set(message.sender, location);
	    clientButton.innerText = `${message.sender} ${location}: 0`;
	    clientsDiv.append(clientButton);
	    clientButtons.set(message.sender, clientButton);
	    // and each time they click it, increment their
	    // counter, and tell all players about it
	    counters.set(message.sender, 0);
	    if (message.sender !== me) {
		clientButton.disabled = true;
		break;
	    }
	    clientButton.onclick = () => {
		let count = counters.get(message.sender);
		const location = clientLocations.get(message.sender);
		counters.set(message.sender, ++count);
		clientButton.innerText = `${message.sender} ${location}: ${count}`;
		const incrementMessage =
		    gameLiftRealtimeClient.newMessage(GameOpCode.IncrementCounter);
		gameLiftRealtimeClient.sendMessage(incrementMessage);
	    };
	    break;
	}
	case GameOpCode.IncrementCounter: {
		if (message.sender === me) break;
		let count = counters.get(message.sender);
		const location = clientLocations.get(message.sender);
		counters.set(message.sender, ++count);
		const button = clientButtons.get(message.sender);
		button.innerText = `${message.sender} ${location}: ${count}`;
		break;
	}
	case GameOpCode.UserLoggedOut: {
	    clientButtons.get(message.sender).remove();
	    break;
	}
    }
}

// ----------------------------------------------------------
// And finally we call connect, which sets up our
// WebSocket connection
// ----------------------------------------------------------
gameLiftRealtimeClient.connect();

// ----------------------------------------------------------
// We can also programatically disconnect
// ----------------------------------------------------------

gameLiftRealtimeClient.onLogin.subscribe(() => {
    disconnectButton.hidden = false;
});

disconnectButton.onclick = () => {
    const logoutMessage = gameLiftRealtimeClient.newMessage(GameOpCode.UserLoggedOut);
    gameLiftRealtimeClient.sendMessage(logoutMessage);

    gameLiftRealtimeClient.disconnect();

    app.innerHTML += '<h2>Disconnected</h2>';
    disconnectButton.hidden = true;
};
