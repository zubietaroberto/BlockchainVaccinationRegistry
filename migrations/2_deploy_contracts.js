var IdentityTokenMintable = artifacts.require("./ERC1155Mintable.sol");
var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(IdentityTokenMintable);
};
