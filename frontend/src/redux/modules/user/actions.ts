import { action } from 'typesafe-actions'
import {
  GET_USER_HEALTH,
  GET_USER_HEALTH_ERROR,
  GET_USER_HEALTH_SUCCESS,
  GET_USER_RESERVES,
  GET_USER_RESERVES_ERROR,
  GET_USER_RESERVES_SUCCESS
} from './constants'

// Types
import { UserHealth, UserReserve } from '../../../types'

const getUserHealth = (payload: string) => action(GET_USER_HEALTH, payload)

const getUserHealthError = (payload: Error) =>
  action(GET_USER_HEALTH_ERROR, payload)

const getUserHealthSuccess = (payload: UserHealth[]) =>
  action(GET_USER_HEALTH_SUCCESS, payload)

const getUserReserves = (payload: string) => action(GET_USER_RESERVES, payload)

const getUserReservesError = (payload: Error) =>
  action(GET_USER_RESERVES_ERROR, payload)

const getUserReservesSuccess = (payload: UserReserve[]) =>
  action(GET_USER_RESERVES_SUCCESS, payload)

export const userActions = {
  getUserHealth,
  getUserHealthError,
  getUserHealthSuccess,

  getUserReserves,
  getUserReservesError,
  getUserReservesSuccess
}
