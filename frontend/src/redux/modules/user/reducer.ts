import { ActionType } from 'typesafe-actions'

import {
  GET_USER_HEALTH,
  GET_USER_HEALTH_ERROR,
  GET_USER_HEALTH_SUCCESS,
  GET_USER_RESERVES,
  GET_USER_RESERVES_ERROR,
  GET_USER_RESERVES_SUCCESS,
  userActions,
  UserState
} from './'

const iUS: UserState = {
  error: null,
  health: undefined,
  isLoadingHealth: false,
  isLoadingReserves: false,
  reserves: []
}

type Actions = ActionType<typeof userActions>

export const userReducer = (
  state: UserState = iUS,
  action: Actions
): UserState => {
  switch (action.type) {
    case GET_USER_HEALTH:
      return { ...state, error: null, isLoadingHealth: true }

    case GET_USER_HEALTH_SUCCESS:
      return {
        ...state,
        error: null,
        health: action.payload[0],
        isLoadingHealth: false
      }

    case GET_USER_HEALTH_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoadingHealth: false
      }

    case GET_USER_RESERVES:
      return { ...state, error: null, isLoadingReserves: true }

    case GET_USER_RESERVES_SUCCESS:
      return {
        ...state,
        error: null,
        isLoadingReserves: false,
        reserves: action.payload
      }

    case GET_USER_RESERVES_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoadingReserves: false
      }

    default:
      return state
  }
}
