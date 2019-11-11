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
  GET_USER_HEALTH_SUCCESS,
  GET_UNISWAP_ARBITRAGE,
  GET_UNISWAP_ARBITRAGE_ERROR,
  GET_UNISWAP_ARBITRAGE_SUCCESS,
  GET_ATOKENS_STATS,
  GET_ATOKENS_STATS_ERROR,
  GET_ATOKENS_STATS_SUCCESS,
  GET_RESERVES_STATS,
  GET_RESERVES_STATS_ERROR,
  GET_RESERVES_STATS_SUCCESS
} from './constants'

// Types
import {
  ATokenStats,
  ReserveStats,
  TokenReserve,
  UsersCount,
  UserHistory,
  UserHealth,
  UniswapArbitrage
} from '../../../types'

const getATokensStats = () => action(GET_ATOKENS_STATS)

const getATokensStatsError = (payload: Error) =>
  action(GET_ATOKENS_STATS_ERROR, payload)

const getATokensStatsSuccess = (payload: ATokenStats[]) =>
  action(GET_ATOKENS_STATS_SUCCESS, payload)

const getEthPrice = () => action(GET_ETH_PRICE)

const getEthPriceError = (payload: Error) =>
  action(GET_ETH_PRICE_ERROR, payload)

const getEthPriceSuccess = (payload: number) =>
  action(GET_ETH_PRICE_SUCCESS, payload)

const getReservesStats = () => action(GET_RESERVES_STATS)

const getReservesStatsError = (payload: Error) =>
  action(GET_RESERVES_STATS_ERROR, payload)

const getReservesStatsSuccess = (payload: ReserveStats[]) =>
  action(GET_RESERVES_STATS_SUCCESS, payload)

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

const getUniswapArbitrage = () => action(GET_UNISWAP_ARBITRAGE)

const getUniswapArbitrageError = (payload: Error) =>
  action(GET_UNISWAP_ARBITRAGE_ERROR, payload)

const getUniswapArbitrageSuccess = (payload: UniswapArbitrage[]) =>
  action(GET_UNISWAP_ARBITRAGE_SUCCESS, payload)

export const apiActions = {
  getATokensStats,
  getATokensStatsError,
  getATokensStatsSuccess,

  getEthPrice,
  getEthPriceError,
  getEthPriceSuccess,

  getReservesStats,
  getReservesStatsError,
  getReservesStatsSuccess,

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
  getUserHistorySuccess,

  getUniswapArbitrage,
  getUniswapArbitrageError,
  getUniswapArbitrageSuccess
}
