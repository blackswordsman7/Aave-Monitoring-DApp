import { ActionType } from 'typesafe-actions'

import {
  userActions,
  UserState,
  GET_USER_HEALTH,
  GET_USER_HEALTH_ERROR,
  GET_USER_HEALTH_SUCCESS
} from './'

const iUS: UserState = {
  error: null,
  health: undefined,
  isLoadingHealth: false
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

    default:
      return state
  }
}
