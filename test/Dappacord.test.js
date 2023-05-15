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

    // Creat a channel
    const transaction = await dappcord
      .connect(deployer)
      .createChannel("general", tokens(1));
    await transaction.wait();
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

    describe("Creating Channels", () => {
      it("Should return the total amount of channels", async () => {
        const result = await dappcord.totalChannels();
        expect(result).to.be.equal(1);
      });

      it("Should return the channel attributes", async () => {
        const channel = await dappcord.getChannel(1);
        expect(channel.id).to.be.equal(1);
        expect(channel.name).to.be.equal("general");
        expect(channel.cost).to.be.equal(tokens(1));
      });
    });
  });
});
