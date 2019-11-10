import { Epic, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { catchError, map, mergeMap } from 'rxjs/operators'

import { userActions, GET_USER_HEALTH, GET_USER_RESERVES } from './'
import { RootAction, RootState } from '../../store'

// Types
import { UserHealth, UserReserve } from '../../../types'

const getUserHealthEpic: Epic<RootAction, RootAction, RootState> = action$ => {
  return action$.pipe(
    ofType(GET_USER_HEALTH),
    mergeMap(action =>
      ajax
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
    )
  )
}

const getUserReservesEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ => {
  return action$.pipe(
    ofType(GET_USER_RESERVES),
    mergeMap(action =>
      ajax
        .getJSON(
          `https://aavemonitor.herokuapp.com/reserves?user=${
            (action as any).payload
          }`
        )
        .pipe(
          map(response => {
            return userActions.getUserReservesSuccess(response as UserReserve[])
          }),
          catchError(error => of(userActions.getUserHealthError(error)))
        )
    )
  )
}

export default [getUserHealthEpic, getUserReservesEpic]
