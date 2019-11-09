import { ActionType } from 'typesafe-actions'

import {
  apiActions,
  ApiState,
  GET_ETH_PRICE,
  GET_ETH_PRICE_ERROR,
  GET_ETH_PRICE_SUCCESS,
  GET_TOKEN_RESERVES,
  GET_TOKEN_RESERVES_ERROR,
  GET_TOKEN_RESERVES_SUCCESS,
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

const iAS: ApiState = {
  error: null,
  ethPrice: 0,
  isLoadingCount: false,
  isLoadingHealth: false,
  isLoadingHistory: false,
  isLoadingPrice: false,
  isLoadingReserves: false,
  tokens: [],
  tokenReserves: [],
  usersCount: {},
  userHealth: [],
  userHistory: []
}

type Actions = ActionType<typeof apiActions>

export const apiReducer = (
  state: ApiState = iAS,
  action: Actions
): ApiState => {
  switch (action.type) {
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

    default:
      return state
  }
}
