import { Epic, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { catchError, map, mergeMap } from 'rxjs/operators'

import { userActions, GET_USER_HEALTH } from './'
import { RootAction, RootState } from '../../store'

// Types
import { UserHealth } from '../../../types'

const getUserHealthEpic: Epic<RootAction, RootAction, RootState> = action$ => {
  return action$.pipe(
    ofType(GET_USER_HEALTH),
    mergeMap(action => {
      console.log(action)
      return ajax
        .getJSON(
          `https://aavemonitor.herokuapp.com/health?user=${
            (action as any).payload
          }`
        )
        .pipe(
          map(response => {
            return userActions.getUserHealthSuccess(response as UserHealth[])
          }),
          catchError(error => of(userActions.getUserHealthError(error)))
        )
    })
  )
}

export default [getUserHealthEpic]
