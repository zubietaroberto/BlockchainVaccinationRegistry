var IdentityToken = artifacts.require("./ERC1155.sol");
var IdentityTokenMintable = artifacts.require("./ERC1155Mintable.sol");
var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(IdentityToken);
  deployer.deploy(IdentityTokenMintable);
};
