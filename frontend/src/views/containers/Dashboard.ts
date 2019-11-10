import { connect } from 'react-redux'

import Dashboard from '../components/Dashboard'

// Redux
import { userActions } from '../../redux/modules/user'
import { RootState } from '../../redux/store'

const mapStateToProps = (state: RootState) => {
  return { ...state }
}

export default connect(mapStateToProps, {
  getUserHealth: userActions.getUserHealth
})(Dashboard as any)
