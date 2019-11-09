import Web3 from "web3";
import WalletProvider from 'truffle-hdwallet-provider-privkey';

export const GANACHE_PRIVATE_KEY = '6a273c809e0d242a2e5586f580c704a94894747767c8686998c855a77e9d4d08';
export const GANACHE_PUBLIC_KEY = '0x315f7e1dc8f398e6a2906d4a426f23384d7f26dc';

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", () => {
        const provider = new WalletProvider(
          [GANACHE_PRIVATE_KEY],
          'http://127.0.0.1:8545'
        )
        const web3 = new Web3(provider);
        resolve(web3);
    });
  });

export default getWeb3;
