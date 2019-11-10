import { combineEpics } from 'redux-observable'

// Epics
import apiEpics from './api/epics'
import userEpics from './user/epics'
import web3Epics from './web3/epics'

export default combineEpics(...[...apiEpics, ...userEpics, ...web3Epics])
