import * as React from "react";
import TodoListContract from "./contracts/TodoList.json";
import getWeb3 from "./getWeb3";

import "./App.css";

const App: React.FunctionComponent = (props) => {

  const [web3, setWeb3] = React.useState();
  const [accounts, setAccounts] = React.useState();
  const [taskCount, setTaskCount] = React.useState();
  const [todoList, setTodoList] = React.useState();

  const init = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TodoListContract.networks[networkId];
      const todoList = new web3.eth.Contract(
        TodoListContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const taskCount = await todoList.methods.taskCount().call()

      const list = []
      for (let i = 1; i <= taskCount; i++) {
        const task = await todoList.methods.tasks(i).call()
        list.push(task)
      }
      console.log(list)

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3)
      setAccounts(accounts)
      setTaskCount(taskCount)
      setTodoList(list)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  React.useEffect(() => {
    init()
  });

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <h2>Smart Contract Example</h2>
      <div>The account is: {accounts}</div>
      <div>No of tasks: {taskCount}</div>
      {
        todoList?.map(l => <div>{l.id}. content: {l.content} completed: {l.completed.toString()}</div>)
      }
    </div>
  );
}


export default App;
