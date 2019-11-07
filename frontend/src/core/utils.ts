import { DeepReadonly } from 'utility-types'

// Constants
import { ZERO_ADDRESS } from './constants'

// Types
import { Artifact, StringMap, TokenReserve } from '../types'

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

/**
 * Convert ERC20 decimals to amount
 *
 * @param value
 * @param decimals
 * @return Number
 */
export const fromBaseUnit = (value, decimals) => {
  return parseInt(value) / 10 ** decimals
}

/**
 * Format ERC20 decimal amount to display
 *
 * @param amount
 * @param decimals
 * @param digits
 * @return string
 */
export const parseAmount = (amount, decimals, digits = 2) => {
  return fromBaseUnit(amount, decimals)
    .toFixed(digits)
    .toString()
    .replace(`.${new Array(digits + 1).join('0')}`, '')
}

export const jsonKeyMapper = (json: any, keyMap: StringMap) => {
  let updatedJson
  const regex = new RegExp(Object.keys(keyMap).join('|'), 'g')

  if (typeof json === 'string') {
    updatedJson = JSON.parse(json.replace(regex, matched => keyMap[matched]))
  } else {
    updatedJson = JSON.parse(
      JSON.stringify(json).replace(regex, matched => keyMap[matched])
    )
  }

  return updatedJson
}

/**
 * gets short address from user ETH address
 * @param {string} address
 * @param {number} length of the address at start/end
 * @param {boolean} showEnd
 * @return {string}
 */
export const shortAddress = (address, length = 4, showEnd = true) => {
  return `${address.slice(0, length)}...${
    showEnd ? address.slice(-length) : ''
  }`
}

/**
 * gets token symbol from the address
 * @param {string} address
 * @param {array} tokens reserves
 * @return {object}
 */
export const getTokenDetails = (
  address: string,
  tokens: DeepReadonly<TokenReserve[]>
): TokenReserve | undefined => {
  return tokens.find(token => token.address === address)
}
