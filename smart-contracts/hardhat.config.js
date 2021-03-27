require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.7.3",
    networks: {
        ganache: {
            url: "http://localhost:7545",
            accounts: ["d81780450e195fc89a88f3221b1a9410f1904fbe224b35818010b07eada8ddb3"],
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    }
};
