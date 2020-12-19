import React, { Component } from "react";
import WRBMarketplaceContract from "./contracts/WRBMarketplace.json";
import ProjectContract from "./contracts/Project.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = WRBMarketplaceContract.networks[networkId];
      const instance = new web3.eth.Contract(
        WRBMarketplaceContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    /* // Stores a given value, 5 by default.
    await contract.methods.deployedProjects(0).call();
    // Get the value from the contract to prove it worked. */
    await contract.methods
      .createProject(100)
      .send({ from: this.state.accounts[0] });

    const response = await contract.methods.deployedProjects(0).call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="navbar">
          <h1>Water Reuse Booster Marketplace</h1>
        </div>
        <div className="grid-area">
          <div className="card">
            <h3>Project #1024</h3>
            <h4>Wastewater Reuse Plant Vila Seca, Tarragona</h4>
            <h5>Required funding: $2,600,000</h5>
            <h5>Funding progress: </h5>
            <h5>Posted on: 2020-12-10</h5>
            <h5>Target start date: 2021-12-02</h5>
            <img src="/1024.png"></img>
            <button>Read more</button>
          </div>
          <div className="card">
            <h3>{this.state.storageValue}</h3>
            <h4>Wastewater Reuse Plant Vila Seca, Tarragona</h4>
            <h5>Required funding: $2,600,000</h5>
            <h5>Funding progress: </h5>
            <h5>Posted on: 2020-12-10</h5>
            <h5>Target start date: 2021-12-02</h5>
            <img src="/wwtp1.jpg"></img>
            <button>Read more</button>
          </div>
          <div className="card">
            <h3>Project #1024</h3>
            <h4>Wastewater Reuse Plant Vila Seca, Tarragona</h4>
            <h5>Required funding: $2,600,000</h5>
            <h5>Funding progress: </h5>
            <h5>Posted on: 2020-12-10</h5>
            <h5>Target start date: 2021-12-02</h5>
            <img src="/wwtp2.jpg"></img>
            <button>Read more</button>
          </div>
        </div>
        {/* <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div> */}
      </div>
    );
  }
}

export default App;
