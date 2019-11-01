import { AbiItem } from 'web3-utils'

export interface Artifact {
  contractName: string
  abi: AbiItem[]
  networks: {
    [networkId: number]: {
      address: string
    }
  }
}
