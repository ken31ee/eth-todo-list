type Network = "development" | "kovan" | "mainnet";

module.exports = (artifacts: Truffle.Artifacts, web3: Web3) => {
    return async (
        deployer: Truffle.Deployer,
        network: Network,
        accounts: string[]
    ) => {
        const TodoList = artifacts.require("./TodoList.sol");
        await deployer.deploy(TodoList);
    }
};