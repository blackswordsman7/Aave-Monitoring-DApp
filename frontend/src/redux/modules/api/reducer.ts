import { ActionType } from 'typesafe-actions'

import {
  apiActions,
  ApiState,
  GET_ATOKENS_STATS,
  GET_ATOKENS_STATS_ERROR,
  GET_ATOKENS_STATS_SUCCESS,
  GET_ETH_PRICE,
  GET_ETH_PRICE_ERROR,
  GET_ETH_PRICE_SUCCESS,
  GET_RESERVES_STATS,
  GET_RESERVES_STATS_ERROR,
  GET_RESERVES_STATS_SUCCESS,
  GET_TOKEN_RESERVES,
  GET_TOKEN_RESERVES_ERROR,
  GET_TOKEN_RESERVES_SUCCESS,
  GET_UNISWAP_ARBITRAGE,
  GET_UNISWAP_ARBITRAGE_ERROR,
  GET_UNISWAP_ARBITRAGE_SUCCESS,
  GET_USER_HEALTH,
  GET_USER_HEALTH_ERROR,
  GET_USER_HEALTH_SUCCESS,
  GET_USER_HISTORY,
  GET_USER_HISTORY_ERROR,
  GET_USER_HISTORY_SUCCESS,
  GET_USERS_COUNT,
  GET_USERS_COUNT_ERROR,
  GET_USERS_COUNT_SUCCESS
} from './'
// Utils
import { getTokenDetails } from '../../../core/utils'
import { ATokenStats, TokenReserve } from '../../../types'

const iAS: ApiState = {
  error: null,
  ethPrice: 0,
  isLoadingArbitrage: false,
  isLoadingCount: false,
  isLoadingHealth: false,
  isLoadingHistory: false,
  isLoadingPrice: false,
  isLoadingReserves: false,
  tokens: [],
  tokenReserves: [],
  usersCount: {},
  userHealth: [],
  userHistory: [],
  uniswapArbitrage: []
}

type Actions = ActionType<typeof apiActions>

export const apiReducer = (
  state: ApiState = iAS,
  action: Actions
): ApiState => {
  switch (action.type) {
    case GET_ATOKENS_STATS:
    case GET_RESERVES_STATS:
      return { ...state, error: null, isLoadingReserves: true }

    case GET_ATOKENS_STATS_SUCCESS: {
      const tokenReserves = state.tokenReserves.map(tr => {
        const reserve = tr as TokenReserve
        const stats = action.payload.find(
          a => a.name === tr.symbol
        ) as ATokenStats

        reserve.aTokenExchangeRate = stats.exchangeRate
        reserve.aTokenTotalSupply = stats.totalSupply
        reserve.aTokenTransactionCount = stats.Transaction_count
        reserve.aTokenPriceInUsd = stats.priceinUSD

        return reserve
      })

      return {
        ...state,
        error: null,
        isLoadingReserves: false,
        tokenReserves
      }
    }

    case GET_RESERVES_STATS_SUCCESS: {
      const tokenReserves = state.tokenReserves.map(tr => {
        const reserve = tr as TokenReserve
        const stats = action.payload.find(
          r => r.name === tr.symbol
        ) as ATokenStats

        reserve.transactionCount = stats.Transaction_count

        return reserve
      })

      return {
        ...state,
        error: null,
        isLoadingReserves: false,
        tokenReserves
      }
    }

    case GET_ATOKENS_STATS_ERROR:
    case GET_RESERVES_STATS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoadingReserves: false
      }

    case GET_ETH_PRICE:
      return { ...state, error: null, isLoadingPrice: true }

    case GET_ETH_PRICE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoadingPrice: false,
        ethPrice: action.payload
      }

    case GET_ETH_PRICE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoadingPrice: false
      }

    case GET_TOKEN_RESERVES:
      return { ...state, error: null, isLoadingReserves: true }

    case GET_TOKEN_RESERVES_SUCCESS: {
      const tokenReserves = action.payload.map(tr => {
        tr.priceInUsd = (parseFloat(tr.priceInEth) * state.ethPrice).toString()
        return tr
      })

      return {
        ...state,
        error: null,
        isLoadingReserves: false,
        tokens: action.payload.map(({ symbol }) => symbol),
        tokenReserves
      }
    }

    case GET_TOKEN_RESERVES_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoadingReserves: false
      }

    case GET_USERS_COUNT:
      return { ...state, error: null, isLoadingCount: true }

    case GET_USERS_COUNT_SUCCESS:
      return {
        ...state,
        error: null,
        isLoadingCount: false,
        usersCount: action.payload
      }

    case GET_USERS_COUNT_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoadingCount: false
      }

    case GET_USER_HEALTH:
      return { ...state, error: null, isLoadingHealth: true }

    case GET_USER_HEALTH_SUCCESS:
      return {
        ...state,
        error: null,
        isLoadingHealth: false,
        userHealth: action.payload
      }

    case GET_USER_HEALTH_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoadingHealth: false
      }

    case GET_USER_HISTORY:
      return { ...state, error: null, isLoadingHistory: true }

    case GET_USER_HISTORY_SUCCESS: {
      const userHistory = action.payload.map((uh, index) => {
        uh.id = index
        uh.token = getTokenDetails(uh.reserve, state.tokenReserves)
        return uh
      })

      return {
        ...state,
        error: null,
        isLoadingHistory: false,
        userHistory
      }
    }

    case GET_USER_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoadingHistory: false
      }

    case GET_UNISWAP_ARBITRAGE:
      return { ...state, error: null, isLoadingArbitrage: true }

    case GET_UNISWAP_ARBITRAGE_SUCCESS: {
      const uniswapArbitrage = action.payload
        .filter(a => state.tokens.includes(a.token_symbol))
        .sort((a, b) => b.projected_total_yield - a.projected_total_yield)

      return {
        ...state,
        error: null,
        isLoadingArbitrage: false,
        uniswapArbitrage
      }
    }

    case GET_UNISWAP_ARBITRAGE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoadingArbitrage: false
      }

    default:
      return state
  }
}
