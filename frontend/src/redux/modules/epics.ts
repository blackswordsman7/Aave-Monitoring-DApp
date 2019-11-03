import { combineEpics } from 'redux-observable'

// Epics
import apiEpics from './api/epics'
import web3Epics from './web3/epics'

export default combineEpics(...[...apiEpics, ...web3Epics])
