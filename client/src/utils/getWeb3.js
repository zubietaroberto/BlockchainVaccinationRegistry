import Web3 from "web3";
import WalletProvider from 'truffle-hdwallet-provider-privkey';

export const GANACHE_PRIVATE_KEY = '6a273c809e0d242a2e5586f580c704a94894747767c8686998c855a77e9d4d08';
export const GANACHE_PUBLIC_KEY = '0x315f7e1dc8f398e6a2906d4a426f23384d7f26dc';
export const GANACHE_DEMO_ADDRESSES = [
  '0x315f7e1dc8f398e6a2906d4a426f23384d7f26dc',
  '0xa120ac5d731c64e79d219a204746d532615dbc3a',
  '0x5784c2b1e9a3fa3f0f54a8b68851062faba3a279',
  '0xdc7ec6a0a90c89501078dac232770ed3208703b1',
  '0x4ca1bba1a5479db91f525092a84c1ca8a245eba5',
  '0x6f57aca0e58cd6a209cf288eb5d6fdd199e29b67',
  '0xa844a72c9ef816cc80baca845af121027bb4b348',
  '0x5564b2b629031fe3bf2148c9b3e61bb9d2632cb2',
  '0x745edf4f885d8e226038829befeff0209d42e4ee',
  '0x34ee02be7213def761b02cbd6dfd1f50215651dc'
]

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
