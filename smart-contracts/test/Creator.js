const { expect } = require("chai");
const { waffle } = require("hardhat");

describe("Creator", function () {
  let creator, signers;
  const baseURI = "somerandomuri";

  describe("Deployment", function () {
    it("Should be able a simple creator ", async function () {
      signers = await ethers.getSigners();

      const Creator = await ethers.getContractFactory("Creator");
      creator = await Creator.deploy(baseURI);
    });
  });

  describe("Creating Tier", function () {
    it("Owner should be able to add a tier ", async function () {
      await creator.addTier("somerrr", 5000, 300, true);
      await creator.addTier("someother", 250, 30, false);
      console.log(await creator.getTierIds());
      console.log(await creator.getTiers());
    });

    it("Not owner should be able to add a tier", async function () {
      await expect(
        creator.connect(signers[1]).addTier("somerrr", 5000, 300, true)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Mint Tier", function () {
    it("Must not be able to mint a non existant tier", async function () {
      await expect(creator.connect(signers[1]).mintTier(7)).to.be.revertedWith(
        "Tier does not exists"
      );
    });

    it("Must not be able to mint without paying price", async function () {
      await expect(creator.connect(signers[1]).mintTier(1)).to.be.revertedWith(
        "Wrong value"
      );
    });

    it("Must  be able to mint with paying price", async function () {
      await creator.connect(signers[1]).mintTier(1, { value: 250 });

      await creator.connect(signers[0]).withdraw();
      console.log(await creator.getTiers());
    });
  });

  describe("Creating Tier", function () {
    it("Owner should be able to add a post ", async function () {
      await creator.addPost("asdoasdfokjqwekoqwe");
      await creator.addPost("someotheqweqweqwr");
      console.log(await creator.getPostsIds());
      console.log(await creator.getPosts());
    });
  });
});
