import { ethers } from "hardhat";
const fs = require('fs');

async function main() {
  const Game = await ethers.getContractFactory("Game");
  const game = await Game.deploy();

  await game.deployed();
  console.log("Game deployed to: ", game.address);

  const [owner] = await ethers.getSigners();

  fs.writeFileSync('./config.js', `
  export const contractAddress = "${game.address}"
  export const ownerAddress = "${owner}"
  `)
}

/*
 * USE THIS COMMAND TO DEPLOY TO OPTIMISM:
 * forge create --mnemonic-path ./mnem.delme Greeter \
   --constructor-args "Greeter from Foundry" --legacy
 */

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
