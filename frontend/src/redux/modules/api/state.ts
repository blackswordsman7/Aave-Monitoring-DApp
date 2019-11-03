import { DeepReadonly } from 'utility-types'

// Types
import {
  TokenReserve,
  UsersCount,
  UserHistory,
  UserHealth
} from '../../../types'

export type ApiState = DeepReadonly<{
  error: Error | null
  ethPrice: number
  loading: boolean
  tokens: string[]
  tokenReserves: TokenReserve[]
  usersCount: UsersCount
  userHealth: UserHealth[]
  userHistory: UserHistory[]
}>
