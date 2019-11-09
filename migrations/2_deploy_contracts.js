var IdentityToken = artifacts.require("./ERC1155.sol");
var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(IdentityToken);
};
