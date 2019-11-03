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

const iAS: ApiState = {
  error: null,
  ethPrice: 0,
  loading: false,
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
      return { ...state, error: null, loading: true }

    case GET_ETH_PRICE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        ethPrice: action.payload
      }

    case GET_TOKEN_RESERVES:
      return { ...state, error: null, loading: true }

    case GET_TOKEN_RESERVES_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        tokens: action.payload.map(({ name }) => name),
        tokenReserves: action.payload
      }

    case GET_USERS_COUNT:
      return { ...state, error: null, loading: true }

    case GET_USERS_COUNT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        usersCount: action.payload
      }

    case GET_USER_HEALTH:
      return { ...state, error: null, loading: true }

    case GET_USER_HEALTH_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        userHealth: action.payload
      }

    case GET_USER_HISTORY:
      return { ...state, error: null, loading: true }

    case GET_USER_HISTORY_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        userHistory: action.payload
      }

    case GET_ETH_PRICE_ERROR:
    case GET_TOKEN_RESERVES_ERROR:
    case GET_USERS_COUNT_ERROR:
    case GET_USER_HEALTH_ERROR:
    case GET_USER_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}
