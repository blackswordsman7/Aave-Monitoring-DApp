import { action } from 'typesafe-actions'
import {
  GET_USER_HEALTH,
  GET_USER_HEALTH_ERROR,
  GET_USER_HEALTH_SUCCESS
} from './constants'

// Types
import { UserHealth } from '../../../types'

const getUserHealth = (payload: string) => action(GET_USER_HEALTH, payload)

const getUserHealthError = (payload: Error) =>
  action(GET_USER_HEALTH_ERROR, payload)

const getUserHealthSuccess = (payload: UserHealth[]) =>
  action(GET_USER_HEALTH_SUCCESS, payload)

export const userActions = {
  getUserHealth,
  getUserHealthError,
  getUserHealthSuccess
}
