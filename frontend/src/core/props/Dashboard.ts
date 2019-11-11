import { DefaultProps } from './Default'
import { UserState } from '../../redux/modules/user'

export interface DashboardProps extends DefaultProps {
  userState: UserState
  getUserHealth: (address: string) => {}
  getUserReserves: (address: string) => {}
}
