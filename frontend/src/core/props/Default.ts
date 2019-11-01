import { RouterState } from 'connected-react-router'

import { Web3State } from '../../redux/modules/web3'

export interface DefaultProps extends RouterState {
  web3State: Web3State
}
