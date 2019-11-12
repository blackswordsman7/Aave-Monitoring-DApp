import { DefaultProps } from './Default'
import { UserState } from '../../redux/modules/user'

export interface ArbitrageProps extends DefaultProps {
  userState: UserState
  getUniswapArbitrage: () => {}
}
