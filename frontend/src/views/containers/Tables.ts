import { connect } from 'react-redux'

import Tables from '../components/examples/Tables'
import { RootState } from '../../redux/store'

const mapStateToProps = (state: RootState) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
  {}
)(Tables)
