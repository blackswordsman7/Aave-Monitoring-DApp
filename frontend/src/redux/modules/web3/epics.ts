import { Epic, ofType } from 'redux-observable'
import { switchMap } from 'rxjs/operators'

import { INIT_WEB3, web3Actions } from './'
import { getWeb3 } from '../../../core/services'
import { RootAction, RootState } from '../../store'

const initWeb3Epic: Epic<RootAction, RootAction, RootState> = action$ => {
  return action$.pipe(
    ofType(INIT_WEB3),
    switchMap(() => {
      return getWeb3().then(payload => web3Actions.initWeb3Success(payload))
    })
  )
}

export default [initWeb3Epic]
