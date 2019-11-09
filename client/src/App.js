import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3, { GANACHE_DEMO_ADDRESSES } from "./utils/getWeb3";

import "./App.css";
import VaccineCreator from "./minter/VaccineCreator.jsx";
import VaccineCertifier from "./minter/VaccineCertifier.jsx";
import VaccineSearch from "./searcher/VaccineSearch.jsx";

const STATE_MACHINE = [
  "Start",
  "Issuer",
  "Auditor"
]

class App extends Component {
  state = {
    stateMachine: STATE_MACHINE[0],
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  goToIssuer = () => {
    this.setState({ stateMachine: STATE_MACHINE[1] });
  }

  goToAuditor = () => {
    this.setState({ stateMachine: STATE_MACHINE[2] });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    const { stateMachine } = this.state;

    let content = null;
    if (stateMachine === STATE_MACHINE[0]) {
      // Index
      content = (
        <>
          <h1>Index</h1>
          <button onClick={this.goToIssuer}>Issuer</button>
          <button onClick={this.goToAuditor}>Auditor</button>
        </>
      )
    } else if (stateMachine === STATE_MACHINE[1]) {
      content = (
        <>
          <h1>Vaccine Issuer</h1>
          <VaccineCreator web3={this.state.web3} />
          <VaccineCertifier web3={this.state.web3} />
        </>
      )
    } else if (stateMachine === STATE_MACHINE[2]) {
      content = (
        <>
          <h1>Auditor</h1>
          <VaccineSearch web3={this.state.web3} />
        </>
      )
    }

    return (
      <div className="App">
        <h2>Available Addresses</h2>
        <ol>
        {GANACHE_DEMO_ADDRESSES.map((address, i) => (
          <li key={i}>{address}</li>
        ))}
        </ol>

        <hr />

        { content }
      </div>
    );
  }
}

export default App;
