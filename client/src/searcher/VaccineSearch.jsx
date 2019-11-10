import React, { Component } from "react";
import MinterContract from "../contracts/ERC1155Mintable.json";

export default class VaccineSearch extends Component {
    state = {
        minterContractInstance: null,
        queryAddress: '',
        statusMessage: null,
        vaccineArray: [],
        queryResult: []
    };

    componentDidMount = async () => {
        const { web3 } = this.props
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = MinterContract.networks[networkId];
        const instance = new web3.eth.Contract(
            MinterContract.abi,
            deployedNetwork && deployedNetwork.address,
        );

        this.setState({ minterContractInstance: instance});

        const vaccineArray = await instance.getPastEvents("URI", { fromBlock: 0, toBlock: "latest"});
        this.setState({ vaccineArray });
    }

    onChangeQueryAddress = event => {
        this.setState({ queryAddress: event.target.value });
    }

    onClick = async () => {
        const promiseArray = this.state.vaccineArray
            .map(uriEvent => {
                const _id = uriEvent.returnValues._id;
                return this.state.minterContractInstance.methods.balanceOf(this.state.queryAddress, _id).call();
            });

        const queryResult = await Promise.all(promiseArray);
        this.setState({ queryResult });
    }

    render() {
        let resultDisplay = null;
        if (this.state.queryResult && this.state.vaccineArray && this.state.queryResult.length > 0) {
            resultDisplay = (
                <>
                    <h2>Query Result</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Vaccine Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.vaccineArray.map((uriEvent, i) => {
                                const result = this.state.queryResult[uriEvent.returnValues._id - 1];
                                const hasVaccine = parseInt(result) > 0;
                                return (
                                    <tr key={i}>
                                        <td>{uriEvent.returnValues._value}</td>
                                        <td>{hasVaccine ? "Vaccinated" : "Not Vaccinated"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )
        }

        return (
            <>
                <h2>Vaccine List</h2>
                <table>
                    <tbody>
                        {this.state.vaccineArray.map((uriEvent, i) => (
                            <tr key={i}>
                                <td>{uriEvent.returnValues._id}</td>
                                <td>{uriEvent.returnValues._value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2>Search</h2>
                <p>Address: <input type="text" value={this.state.queryAddress} onChange={this.onChangeQueryAddress} /></p>
                <button onClick={this.onClick}>Query</button>

                {resultDisplay}
            </>
        )
    }
    
}