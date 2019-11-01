import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createEpicMiddleware } from 'redux-observable'
import { logger } from 'redux-logger'
import { ActionType, StateType } from 'typesafe-actions'

// Reducers
import createRootReducer from './modules/reducers'

// Epics
import rootEpic from './modules/epics'

export type RootAction = ActionType<typeof import('./modules/actions').default>
export type RootState = StateType<
  ReturnType<typeof import('./modules/reducers').default>
>

// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory()

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history)

// Epic Middleware
const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>()

// Middlewares
const middlewares = [epicMiddleware, historyMiddleware]

// Redux Dev Tools Extension
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    {},
    applyMiddleware(...middlewares)
  )

  epicMiddleware.run(rootEpic)

  return store
}
