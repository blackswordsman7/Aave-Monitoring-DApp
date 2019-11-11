import { Epic, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators'

import {
  apiActions,
  GET_ETH_PRICE,
  GET_ETH_PRICE_SUCCESS,
  GET_TOKEN_RESERVES,
  GET_TOKEN_RESERVES_SUCCESS,
  GET_USERS_COUNT,
  GET_USER_HEALTH,
  GET_USER_HISTORY,
  GET_UNISWAP_ARBITRAGE,
  GET_ATOKENS_STATS
} from './'
import { RootAction, RootState } from '../../store'

// Types
import {
  TokenReserve,
  UsersCount,
  UserHistory,
  UserHealth,
  UniswapArbitrage,
  ATokenStats,
  ReserveStats
} from '../../../types'

const getATokensStatsEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ => {
  return action$.pipe(
    ofType(GET_ATOKENS_STATS),
    mergeMap(() =>
      ajax.getJSON('https://aavemonitor.herokuapp.com/stats/atokens/').pipe(
        map(response =>
          apiActions.getATokensStatsSuccess(response as ATokenStats[])
        ),
        catchError(error => of(apiActions.getATokensStatsError(error)))
      )
    )
  )
}

const getEthPriceEpic: Epic<RootAction, RootAction, RootState> = action$ => {
  return action$.pipe(
    ofType(GET_ETH_PRICE),
    mergeMap(() =>
      ajax
        .getJSON(
          'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
        )
        .pipe(
          map(response => apiActions.getEthPriceSuccess((response as any).USD)),
          catchError(error => of(apiActions.getEthPriceError(error)))
        )
    )
  )
}

const getEthPriceSuccessEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ => {
  return action$.pipe(
    ofType(GET_ETH_PRICE_SUCCESS),
    mergeMap(() => of(apiActions.getTokenReserves()))
  )
}

const getReservesStatsEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ => {
  return action$.pipe(
    ofType(GET_ATOKENS_STATS),
    mergeMap(() =>
      ajax.getJSON('https://aavemonitor.herokuapp.com/stats/reserves/').pipe(
        map(response =>
          apiActions.getReservesStatsSuccess(response as ReserveStats[])
        ),
        catchError(error => of(apiActions.getReservesStatsError(error)))
      )
    )
  )
}

const getTokenReservesEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ => {
  return action$.pipe(
    ofType(GET_TOKEN_RESERVES),
    switchMap(() =>
      ajax.getJSON('https://dlp-api-dev.testing.aave.com/data/reserves').pipe(
        map(response =>
          apiActions.getTokenReservesSuccess(response as TokenReserve[])
        ),
        catchError(error => of(apiActions.getTokenReservesError(error)))
      )
    )
  )
}

const getTokenReservesSuccessEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ => {
  return action$.pipe(
    ofType(GET_TOKEN_RESERVES_SUCCESS),
    mergeMap(() =>
      of(
        apiActions.getUserHistory(),
        apiActions.getATokensStats(),
        apiActions.getReservesStats()
      )
    )
  )
}

const getUsersCountEpic: Epic<RootAction, RootAction, RootState> = action$ => {
  return action$.pipe(
    ofType(GET_USERS_COUNT),
    mergeMap(() =>
      ajax.getJSON('https://aavemonitor.herokuapp.com/count/').pipe(
        map(response =>
          apiActions.getUsersCountSuccess(response as UsersCount)
        ),
        catchError(error => of(apiActions.getUsersCountError(error)))
      )
    )
  )
}

const getUserHealthEpic: Epic<RootAction, RootAction, RootState> = action$ => {
  return action$.pipe(
    ofType(GET_USER_HEALTH),
    mergeMap(() =>
      ajax.getJSON('https://aavemonitor.herokuapp.com/health').pipe(
        map(response => {
          return apiActions.getUserHealthSuccess(response as UserHealth[])
        }),
        catchError(error => of(apiActions.getUserHealthError(error)))
      )
    )
  )
}

const getUserHistoryEpic: Epic<RootAction, RootAction, RootState> = action$ => {
  return action$.pipe(
    ofType(GET_USER_HISTORY),
    mergeMap(() =>
      ajax.getJSON('https://aavemonitor.herokuapp.com/history').pipe(
        map(response => {
          return apiActions.getUserHistorySuccess(response as UserHistory[])
        }),
        catchError(error => of(apiActions.getUserHistoryError(error)))
      )
    )
  )
}

const getUniswapArbitrageEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ => {
  return action$.pipe(
    ofType(GET_UNISWAP_ARBITRAGE),
    mergeMap(() =>
      ajax
        .getJSON(
          'https://cors-anywhere.herokuapp.com/https://www.uniswaproi.com/pool_ranking/?days=30',
          { Origin: null }
        )
        .pipe(
          map(response =>
            apiActions.getUniswapArbitrageSuccess(
              response as UniswapArbitrage[]
            )
          ),
          catchError(error => of(apiActions.getUniswapArbitrageError(error)))
        )
    )
  )
}

export default [
  getATokensStatsEpic,
  getEthPriceEpic,
  getEthPriceSuccessEpic,
  getReservesStatsEpic,
  getTokenReservesEpic,
  getTokenReservesSuccessEpic,
  getUsersCountEpic,
  getUserHealthEpic,
  getUserHistoryEpic,
  getUniswapArbitrageEpic
]
