import { DeepReadonly } from 'utility-types'

// Types
import { UserHealth, UserReserve } from '../../../types'

export type UserState = DeepReadonly<{
  error: Error | null
  health?: UserHealth
  isLoadingHealth: boolean
  isLoadingReserves: boolean
  reserves: UserReserve[]
}>
