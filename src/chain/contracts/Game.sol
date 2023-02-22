// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Game {
    /*
     * DATA STRUCTURES
     */

    struct Game {
        address player1;
        address player2;
        uint player1Wager;
        uint player2Wager;
        uint playersJoined;
        uint settledBets;
    }

    // Games, keyed by gameId value
    mapping(uint => Game) public games;

    /*
     * EVENTS
     */

    event BetProposed (
        uint indexed _gameId,
        uint indexed _playersJoined
    );

    event BetAccepted (
        uint indexed _gameId,
        uint indexed _playersJoined
    );

    event BetSettled (
        uint indexed _gameId
    );

    /*
     * FUNCTIONS
     */
    

    // ClientA adds a Game to the mapping with the _gameId if it doesn't already exist and adds their address and wager
    // ClientB finds the Game with _gameId and adds their address and wager
    function proposeBet(uint _gameId) external payable {
        require(games[_gameId].playersJoined <= 1, "there are already two players in this game");
        require(msg.value > 0, "you need to actually bet something");

        // check if there are any players already in the Game
        if (games[_gameId].playersJoined == 0) {
            // no players in the game so assign sender to player1
            games[_gameId].player1 = msg.sender;
            games[_gameId].player1Wager = msg.value;
            games[_gameId].playersJoined++;

            emit BetProposed(_gameId, games[_gameId].playersJoined);
        } else if (games[_gameId].playersJoined == 1) {
            // player1 has already joined, so assign sender to player2
            games[_gameId].player2 = msg.sender;
            games[_gameId].player2Wager = msg.value;
            games[_gameId].playersJoined++;

            emit BetAccepted(_gameId, games[_gameId].playersJoined);
        }
    }

    // ClientA invokes settleBet and if he's won then transfer the totalWager
    function settleBet(uint _gameId) external payable {
        

        // TODO:
        // accept a time parameter so that if it's a draw, we can delete the game
        // when it is over and the two clients don't have to make further interactions

        // total the wagers from both players
        uint totalWager = games[_gameId].player1Wager + games[_gameId].player2Wager;

        // pay out the winner
        // delete the game
        (bool success, ) = msg.sender.call{value: totalWager}("");
    
        delete games[_gameId];

        emit BetSettled(_gameId);
    }

    receive() external payable {}
    fallback() external payable {}

}