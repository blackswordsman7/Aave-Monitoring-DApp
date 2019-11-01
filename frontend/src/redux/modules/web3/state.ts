import { DeepReadonly } from 'utility-types'
import Web3 from 'web3'

export type Web3State = DeepReadonly<{
  accounts: string[]
  error: Error | null
  loading: boolean
  network: string
  networkId: number
  web3: Web3 | null
}>
