const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Dappcord", function () {
  describe("Deployment", function () {
    it("Should set the name", async () => {
      const Dappcord = await ethers.getContractFactory("Dappcord");
      dappcord = await Dappcord.deploy("Dappcord", "DC");

      // Fetch name
      let result = await dappcord.name();
      // Check name
      expect(result).to.equal("Dappcord");

      // Fetch symbol
      result = await dappcord.symbol();
      // Check symbol
      expect(result).to.equal("DC");
    });
  });
});
