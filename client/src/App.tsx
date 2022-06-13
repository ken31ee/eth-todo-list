import * as React from "react";
import TruffleContract from '@truffle/contract';
import BN from "bn.js"

import TodoListContract from "./contracts/TodoList.json";
import { TodoListInstance } from './types'
import getEthereum from "./getEthereum";

import "./App.css";

type Task = {
  0: BN;
  id: BN;
  1: string;
  content: string;
  2: boolean;
  completed: boolean;
}

const App: React.FunctionComponent = (props) => {

  const [account, setAccount] = React.useState<string>();
  const [taskCount, setTaskCount] = React.useState<BN>();
  const [todoList, setTodoList] = React.useState<TodoListInstance>();
  const [cahcedList, setCachedList] = React.useState<Task[]>();

  const loadContract = async () => {
    // Get network provider and web3 instance.
    const ethereum = await getEthereum();
    if (!ethereum) {
      return {}
    }
    const TodoList = TruffleContract(TodoListContract)
    TodoList.setProvider(ethereum)

    // Hydrate the smart contract with values from the blockchain
    const todoList = await TodoList.deployed()
    const accounts = (await ethereum.request({ method: 'eth_accounts' })) as string[];

    return {
      account: accounts[0],
      todoList,
    }
  }

  const init = async () => {
    try {
      const { account, todoList } = await loadContract()

      setAccount(account)
      setTodoList(todoList)

      const taskCount = await todoList.taskCount()

      const list = []
      for (let i = 1; i <= taskCount; i++) {
        const task = await todoList.tasks(i)
        list.push(task)
      }

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      console.log(taskCount)
      setTaskCount(taskCount)
      setCachedList(list)

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
  }, []);

  const onAdd = async () => {
    if (todoList) {
      await todoList.createTask('test', { from: account })
      const taskCount = await todoList.taskCount()
      const list = []
      for (let i = 1; i <= taskCount.toNumber(); i++) {
        const task = await todoList.tasks(i)
        list.push(task)
      }
      console.log(taskCount, list)
      setCachedList(list)
    }
  }

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <h2>Smart Contract Example</h2>
      <div>The account is: {account}</div>
      {taskCount && <div>No of tasks: {taskCount.toNumber()}</div>}
      {
        cahcedList?.map(l => <div>{l.id.toNumber()}. content: {l.content} completed: {l.completed.toString()}</div>)
      }
      <button onClick={onAdd}>add testing</button>
    </div>
  );
}


export default App;
