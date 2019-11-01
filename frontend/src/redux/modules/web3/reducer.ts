import { ActionType } from 'typesafe-actions'

import { INIT_WEB3, INIT_WEB3_SUCCESS, web3Actions, Web3State } from './'

const iWS: Web3State = {
  accounts: [],
  error: null,
  loading: false,
  network: '',
  networkId: 0,
  web3: null
}

type Actions = ActionType<typeof web3Actions>

export const web3Reducer = (
  state: Web3State = iWS,
  action: Actions
): Web3State => {
  switch (action.type) {
    case INIT_WEB3:
      return { ...state, error: null, loading: true }

    case INIT_WEB3_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        ...action.payload
      }

    default:
      return state
  }
}
