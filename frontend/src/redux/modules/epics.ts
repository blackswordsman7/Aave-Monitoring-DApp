import { combineEpics } from 'redux-observable'

// Epics
import web3Epics from './web3/epics'

export default combineEpics(...web3Epics)
