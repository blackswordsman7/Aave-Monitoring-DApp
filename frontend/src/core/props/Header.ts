import { ApiState } from '../../redux/modules/api'
import { Web3State } from '../../redux/modules/web3'

export interface HeaderProps {
  apiState: ApiState
  web3State: Web3State
}
