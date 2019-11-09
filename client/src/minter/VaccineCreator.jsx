import React, { Component } from "react";
import MinterContract from "../contracts/ERC1155Mintable.json";
import { GANACHE_PUBLIC_KEY } from "../utils/getWeb3.js";

export default class VaccineCreator extends Component {
    state = {
        minterContractInstance: null,
        newId: null
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

    onCreateCallback = async () => {
        const URI = this.props.dataUri || 'token://vaccine'; // Dummy
        const result = await this.state.minterContractInstance.methods.create(0, URI).send({
            from: GANACHE_PUBLIC_KEY
        });

        const newId = result.events.TransferSingle.returnValues._id;
        this.setState({ newId })
    }

    render() {
        if (!this.state.minterContractInstance) return (
            <span> Loading Contract</span>
        );

        let message = null
        if (this.state.newId) {
            message = <p>New Vaccine ID created: {this.state.newId}</p>
        }
        return (
            <>
                <h2>Mint New Vaccination Token</h2>
                <p><b>Token URI: {this.props.dataUri}</b></p>
                <button onClick={this.onCreateCallback}>
                    Create New Vaccine
                </button>
                {message}
            </>
        )
    }
}