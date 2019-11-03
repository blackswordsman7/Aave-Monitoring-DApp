import { RouterState } from 'connected-react-router'

import { ApiState } from '../../redux/modules/api'
import { Web3State } from '../../redux/modules/web3'

export interface DefaultProps extends RouterState {
  apiState: ApiState
  web3State: Web3State
}
