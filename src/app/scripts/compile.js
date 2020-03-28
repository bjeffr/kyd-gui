const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

// Compiles the contracts and returns their abi and bytecodes.
const output = JSON.parse(solc.compile(JSON.stringify({
  language: 'Solidity',
  sources: {
    'ERC734.sol': {
      content: fs.readFileSync(path.resolve(__dirname, "../contracts/ERC734.sol"), "utf8")
    },
    'ERC735.sol': {
      content: fs.readFileSync(path.resolve(__dirname, "../contracts/ERC735.sol"), "utf8")
    },
    'Identity.sol': {
      content: fs.readFileSync(path.resolve(__dirname, "../contracts/Identity.sol"), "utf8")
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ["abi", "evm.bytecode.object"]
      }
    }
  }
})));

// Extracts the identity contract form the previous output.
const identityContract = output.contracts["Identity.sol"]["Identity"];

// Ensures that the directory 'build' exists and removes any files if present.
// const buildPath = path.resolve(__dirname, "../assets");
// fs.removeSync(buildPath);
// fs.ensureDirSync(buildPath);

// Creates a JSON file with the identity contract. It will be used to create a contract instance from the Angular application.
// fs.outputJsonSync(
//   path.resolve(buildPath, "identity.json"),
//   identityContract
// );

// Export the identity contract
module.exports = identityContract;
