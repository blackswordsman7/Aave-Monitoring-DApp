import { RouterState } from 'connected-react-router'

import { Web3State } from '../../redux/modules/web3'

export interface AppProps extends RouterState {
  getEthPrice: () => {}
  getUsersCount: () => {}
  getUserHealth: () => {}
  initWeb3: () => {}
  web3State: Web3State
}
