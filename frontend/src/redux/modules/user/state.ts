import { DeepReadonly } from 'utility-types'

// Types
import { UserHealth } from '../../../types'

export type UserState = DeepReadonly<{
  error: Error | null
  health?: UserHealth
  isLoadingHealth: boolean
}>
