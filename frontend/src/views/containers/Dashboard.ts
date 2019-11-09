import { connect } from 'react-redux'

import Dashboard from '../components/Dashboard'
import { RootState } from '../../redux/store'

const mapStateToProps = (state: RootState) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
  {}
)(Dashboard)
