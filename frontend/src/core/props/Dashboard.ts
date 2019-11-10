import { RouterState } from 'connected-react-router'

import { ApiState } from '../../redux/modules/api'
import { UserState } from '../../redux/modules/user'
import { Web3State } from '../../redux/modules/web3'

export interface DashboardProps extends RouterState {
  apiState: ApiState
  userState: UserState
  web3State: Web3State
  getUserHealth: (address: string) => {}
}
