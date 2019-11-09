const IdentityToken = artifacts.require("./ERC1155.sol");

describe("IdentityToken", function() {
    it("should support 0xd9b67a26", async function () {
        const tokenInstance = await IdentityToken.deployed();
        const value = parseInt(0xd9b67a26);
        const result = await tokenInstance.supportsInterface(value);
        expect(result).toBeTrue();
    });
})