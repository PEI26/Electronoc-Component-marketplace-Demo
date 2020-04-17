const path = require("path");
require('dotenv').config({path:'./.env'});
const HDWalletProvider =require("@truffle/hdwallet-provider");

const AccountIndex =0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    Rinkeyby_infura:{
       provider:function () {
         return new HDWalletProvider(process.env.MNEMONIC,"https://rinkeby.infura.io/v3/3beceb60eaae4fb9a217bd8f4740618f",AccountIndex)
       },
        network_id: 4
    },
    Ropsten_infura:{
      provider:function () {
        return new HDWalletProvider(process.env.MNEMONIC,"https://ropsten.infura.io/v3/3beceb60eaae4fb9a217bd8f4740618f",AccountIndex)
      },
       network_id: 3
   },
  },
  compilers: {
    solc: {
    version: "0.6.0"
    }
    }
};
