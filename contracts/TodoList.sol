// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  constructor() public {
    createTask("Testing");
    createTask("Testing2");
    createTask("Testing3");
  }

  function createTask(string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
  }
}
