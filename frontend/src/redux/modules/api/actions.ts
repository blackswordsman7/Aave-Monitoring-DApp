import { action } from 'typesafe-actions'
import {
  GET_ETH_PRICE,
  GET_ETH_PRICE_ERROR,
  GET_ETH_PRICE_SUCCESS,
  GET_TOKEN_RESERVES,
  GET_TOKEN_RESERVES_ERROR,
  GET_TOKEN_RESERVES_SUCCESS,
  GET_USERS_COUNT,
  GET_USERS_COUNT_ERROR,
  GET_USERS_COUNT_SUCCESS,
  GET_USER_HISTORY,
  GET_USER_HISTORY_ERROR,
  GET_USER_HISTORY_SUCCESS,
  GET_USER_HEALTH,
  GET_USER_HEALTH_ERROR,
  GET_USER_HEALTH_SUCCESS
} from './constants'

// Types
import {
  TokenReserve,
  UsersCount,
  UserHistory,
  UserHealth
} from '../../../types'

const getEthPrice = () => action(GET_ETH_PRICE)

const getEthPriceError = (payload: Error) =>
  action(GET_ETH_PRICE_ERROR, payload)

const getEthPriceSuccess = (payload: number) =>
  action(GET_ETH_PRICE_SUCCESS, payload)

const getTokenReserves = () => action(GET_TOKEN_RESERVES)

const getTokenReservesError = (payload: Error) =>
  action(GET_TOKEN_RESERVES_ERROR, payload)

const getTokenReservesSuccess = (payload: TokenReserve[]) =>
  action(GET_TOKEN_RESERVES_SUCCESS, payload)

const getUsersCount = () => action(GET_USERS_COUNT)

const getUsersCountError = (payload: Error) =>
  action(GET_USERS_COUNT_ERROR, payload)

const getUsersCountSuccess = (payload: UsersCount) =>
  action(GET_USERS_COUNT_SUCCESS, payload)

const getUserHealth = () => action(GET_USER_HEALTH)

const getUserHealthError = (payload: Error) =>
  action(GET_USER_HEALTH_ERROR, payload)

const getUserHealthSuccess = (payload: UserHealth[]) =>
  action(GET_USER_HEALTH_SUCCESS, payload)

const getUserHistory = () => action(GET_USER_HISTORY)

const getUserHistoryError = (payload: Error) =>
  action(GET_USER_HISTORY_ERROR, payload)

const getUserHistorySuccess = (payload: UserHistory[]) =>
  action(GET_USER_HISTORY_SUCCESS, payload)

export const apiActions = {
  getEthPrice,
  getEthPriceError,
  getEthPriceSuccess,

  getTokenReserves,
  getTokenReservesError,
  getTokenReservesSuccess,

  getUsersCount,
  getUsersCountError,
  getUsersCountSuccess,

  getUserHealth,
  getUserHealthError,
  getUserHealthSuccess,

  getUserHistory,
  getUserHistoryError,
  getUserHistorySuccess
}
