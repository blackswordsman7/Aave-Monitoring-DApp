import { ApiState } from '../../redux/modules/api'
import { UserState } from '../../redux/modules/user'
import { Web3State } from '../../redux/modules/web3'

export interface UserHeaderProps {
  apiState: ApiState
  userState: UserState
  web3State: Web3State
}
