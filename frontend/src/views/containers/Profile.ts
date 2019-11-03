import { connect } from 'react-redux'

import Profile from '../components/examples/Profile'
import { RootState } from '../../redux/store'

const mapStateToProps = (state: RootState) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
  {}
)(Profile)
