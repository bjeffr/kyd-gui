const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const IdentityContract = require("./compile");

// Creates a wallet provider to connect to the Rinkeby network.
const provider = new HDWalletProvider(
  "sadness artwork pave divert nephew victory spray famous lock weapon bird unusual",
  "https://rinkeby.infura.io/v3/056404dae4ee477e94351c46903b0ade"
);

// Creates an instance of Web3 with the specified provider.
const web3 = new Web3(provider);

// Extracts the abi and the bytecode from the identity contract compiled in compile.js
const abi = IdentityContract.abi;
const bytecode = '0x' + IdentityContract.evm.bytecode.object;

// Deploys the identity contract to the Rinkeby network.
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Deploying from:", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: 3000000 });
  console.log("Contract deployed to:", result.options.address);
};

deploy();
