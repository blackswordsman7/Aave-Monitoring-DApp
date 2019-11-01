import { action } from 'typesafe-actions'
import { INIT_WEB3, INIT_WEB3_SUCCESS } from './constants'

const initWeb3 = () => action(INIT_WEB3)

const initWeb3Success = (payload: {}) => action(INIT_WEB3_SUCCESS, payload)

export const web3Actions = {
  initWeb3,
  initWeb3Success
}
