const { loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Setting up", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("KeyboardNFT");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();
    console.log(hardhatToken.address);

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { hardhatToken, owner} = await loadFixture(deployTokenFixture);
      console.log(`Owner is ${await hardhatToken.owner()}`);
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("to have an empty array of keyboards", async function (){
      const {hardhatToken} = await loadFixture(deployTokenFixture);
      expect(await hardhatToken.getKeyboards()).to.empty;
    });
  });

  describe("Validations", function () {
    it("should revert error for non whitelisted member", async function () {
      const {hardhatToken, owner, addr1, addr2} = await loadFixture(deployTokenFixture);
      await expect(hardhatToken.connect(addr1).awardItem(addr1.address,"first nft", 0, false, "ABC")).to.be.revertedWith("Only owner or whiteListed members allowed");
    });

    it("should allow owner",async function (){
      const {hardhatToken, owner} = await loadFixture(deployTokenFixture);
      await expect(await hardhatToken.awardItem(owner.address,"1 nft", 0, false, "abc")).to.be.equal(0);
    });
  });

  
});
