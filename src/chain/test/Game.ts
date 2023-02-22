import { ethers } from "hardhat";
const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe("Game", () => {
    async function deployFixture() {
        const Game = await ethers.getContractFactory("Game");
        const game = await Game.deploy();

        const [owner, player1, player2, player3 ] = await ethers.getSigners();

        return { game, owner, player1, player2, player3 };
    }

    it("should successfully add the first player to the game", async function() {
        const { game, player1 } = await loadFixture(deployFixture);

        const gameId = 420;
        const expectedPlayersJoined = 1;
    
        // check that BetPropsed emitted with the correct args
        await expect(game.connect(player1).proposeBet(gameId, { value: 100 }))
            .to.emit(game, "BetProposed")
            .withArgs(gameId, expectedPlayersJoined);
    });

    it("should successfully add the second player to the game after adding the first", async () => {
        const { game, player1, player2 } = await loadFixture(deployFixture);

        const gameId = 420;
        const exptectedPlayersJoined = 2;

        // add the first player
        game.connect(player1).proposeBet(gameId, { value: 100 });

        // check that BetAccepted emitted with the correct args
        await expect(game.connect(player2).proposeBet(gameId, { value: 100 }))
            .to.emit(game, "BetAccepted")
            .withArgs(gameId, exptectedPlayersJoined);
    });

    it("should not allow a third player to join the game", async () => {
        const { game, player1, player2, player3 } = await loadFixture(deployFixture);

        const gameId = 420;
        
        // add the first 2 players
        game.connect(player1).proposeBet(gameId, { value: 100 });
        game.connect(player2).proposeBet(gameId, { value: 100 });

        // check that transaction is reverted when trying to add a third player
        await expect(game.connect(player3).proposeBet(gameId, { value: 100 }))
            .to.be.revertedWith("there are already two players in this game");
    });

    it("should not allow a player to make an empty bet", async () => {
        const { game, player1 } = await loadFixture(deployFixture);
        const gameId = 420;

        // check that adding a player without a wager reverts transaction
        await expect(game.connect(player1).proposeBet(gameId))
            .to.be.revertedWith("you need to actually bet something");
    });

    it("player1 wins and player2 loses", async () => {
        const { game, player1, player2 } = await loadFixture(deployFixture);
        const gameId = 420;
        const totalWager = 200;

        console.log("BALANCE (INITIAL):");
        console.log("PLAYER1 = ", ethers.utils.formatEther(await player1.getBalance()));
        console.log("PLAYER2 = ", ethers.utils.formatEther(await player2.getBalance()));

        // add the 2 players to the game
        await game.connect(player1).proposeBet(gameId, { value: ethers.utils.parseEther('10') })
        await game.connect(player2).proposeBet(gameId, { value: ethers.utils.parseEther('100') })

        console.log("BALANCE (AFTER BET):");
        console.log("PLAYER1 = ", ethers.utils.formatEther(await player1.getBalance()));
        console.log("PLAYER2 = ", ethers.utils.formatEther(await player2.getBalance()));

        // player1 wins and player2 loses
        await expect(game.connect(player1).settleBet(gameId, 1))
            .to.emit(game, "BetSettled")
            .withArgs(gameId);
        await expect(game.connect(player2).settleBet(gameId, 0))
            .to.emit(game, "BetSettled")
            .withArgs(gameId);

        // player1 should have a higher balance that player2
        console.log("BALANCE (AFTER GAME):");
        console.log("PLAYER1 = ", ethers.utils.formatEther(await player1.getBalance()));
        console.log("PLAYER2 = ", ethers.utils.formatEther(await player2.getBalance()));
    });
});