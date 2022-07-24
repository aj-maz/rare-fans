const { expect } = require("chai");

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

  describe("Deployment", function () {
    it("Owner should be able to add a tier ", async function () {
        await creator.addTier("somerrr", 5000, 300, 30, true, 5);
        await creator.addTier("someother", 250, 30, 20, false, 9);
        console.log(await creator.getTierIds())
        console.log(await creator.getTiers())
    });

    it("Not owner should be able to add a tier", async function () {
      await expect(
        creator.connect(signers[1]).addTier("somerrr", 5000, 300, 30, true, 5)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
