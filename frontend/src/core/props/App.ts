import { RouterState } from 'connected-react-router'

export interface AppProps extends RouterState {
  getEthPrice: () => {}
  getTokenReserves: () => {}
  getUsersCount: () => {}
  getUserHealth: () => {}
  getUserHistory: () => {}
  initWeb3: () => {}
}
