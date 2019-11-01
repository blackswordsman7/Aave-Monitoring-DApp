import Web3 from 'web3'
import { Provider } from 'web3/providers'

declare global {
  interface Window {
    ethereum: Provider
    web3: Web3
  }
}
