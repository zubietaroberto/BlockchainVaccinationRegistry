import React, { Component } from "react";
import MinterContract from "../contracts/ERC1155Mintable.json";
import { GANACHE_PUBLIC_KEY } from "../utils/getWeb3.js";

export default class VaccineCertifier extends Component {
    state = {
        minterContractInstance: null,
        text: '',
        statusMessage: null,
        vaccineId: 0
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
    }

    onChangeText = event => {
        this.setState({ text: event.target.value })
    }

    onChangeId = (event) => {
        this.setState({ vaccineId: event.target.value })
    }

    onRegister = async () => {
        const { vaccineId, text } = this.state;
        if (vaccineId <= 0) {
            throw new Error("ID too Small");
        }
        if (!text) {
            throw new Error("No Address");
        }

        const result = await this.state.minterContractInstance.methods
            .mint(vaccineId, [ text ], [ 1 ])
            .send({ from: GANACHE_PUBLIC_KEY });

        console.log(result);

        const { _id, _to } = result.events.TransferSingle.returnValues;
        this.setState({ statusMessage: `Success: Vaccine ${_id} registered to ${_to}` });
    }

    render() {
        return (
            <>
                <h2>Vaccine Certifier</h2>
                <p>
                    Address <input type="text" value={this.state.text} onChange={this.onChangeText} />
                </p>
                <p>
                    Vaccine Id <input type="number" value={this.state.vaccineId} onChange={this.onChangeId} />
                </p>
                <button onClick={this.onRegister}>
                    Register
                </button>
                {this.state.statusMessage}
            </>
        )
    }
}