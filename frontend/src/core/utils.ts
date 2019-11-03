import { ZERO_ADDRESS } from './constants'

// Types
import { Artifact, StringMap } from '../types'

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
