import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// Types
import { History } from 'history'

// Reducers
import { apiReducer } from './api'
import { web3Reducer } from './web3'

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    apiState: apiReducer,
    web3State: web3Reducer
  })
