/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface TodoListContract extends Truffle.Contract<TodoListInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<TodoListInstance>;
}

type AllEvents = never;

export interface TodoListInstance extends Truffle.ContractInstance {
  taskCount(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  tasks(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN; 1: string; 2: boolean }>;

  createTask: {
    (_content: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _content: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _content: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _content: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    taskCount(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    tasks(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: string; 2: boolean }>;

    createTask: {
      (_content: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _content: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _content: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _content: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}