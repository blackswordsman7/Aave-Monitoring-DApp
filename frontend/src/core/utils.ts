import { ZERO_ADDRESS } from './constants'
import { Artifact } from '../types'

/**
 * gets contract address from .json truffle artifacts
 * @param {string} contract
 * @param {number} networkId of the web3 network
 * @return {string}
 */
export const getContractAddress = (contract: Artifact, networkId: number) => {
  return contract.networks[networkId]
    ? contract.networks[networkId].address
    : ZERO_ADDRESS
}
