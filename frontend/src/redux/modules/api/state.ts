import { DeepReadonly } from 'utility-types'

// Types
import {
  TokenReserve,
  UsersCount,
  UserHistory,
  UserHealth,
  UniswapArbitrage
} from '../../../types'

export type ApiState = DeepReadonly<{
  error: Error | null
  ethPrice: number
  isLoadingArbitrage: boolean
  isLoadingCount: boolean
  isLoadingHealth: boolean
  isLoadingHistory: boolean
  isLoadingPrice: boolean
  isLoadingReserves: boolean
  tokens: string[]
  tokenReserves: TokenReserve[]
  usersCount: UsersCount
  userHealth: UserHealth[]
  userHistory: UserHistory[]
  uniswapArbitrage: UniswapArbitrage[]
}>
