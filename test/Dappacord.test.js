const { expect } = require("chai");

// WEI => ETH converter
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Dappcord", function () {
  let deployer, user;
  let dappcord;

  const NAME = "Dappcord";
  const SYMBOL = "DC";

  beforeEach(async () => {
    // Setup accounts
    [deployer, user] = await ethers.getSigners();

    // Deploy the smart contract
    const Dappcord = await ethers.getContractFactory("Dappcord");
    dappcord = await Dappcord.deploy(NAME, SYMBOL);
  });

  describe("Deployment", function () {
    it("Should set the Name", async () => {
      // Fetch name
      let result = await dappcord.name();
      // Check name
      expect(result).to.equal(NAME);
    });

    it("Should set the Symbol", async () => {
      // Fetch symbol
      result = await dappcord.symbol();
      // Check symbol
      expect(result).to.equal(SYMBOL);
    });

    it("Should set the owner", async () => {
      const result = await dappcord.owner();
      expect(result).to.equal(deployer.address);
    });
  });
});
