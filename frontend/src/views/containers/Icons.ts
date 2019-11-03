import { connect } from 'react-redux'

import Icons from '../components/examples/Icons'
import { RootState } from '../../redux/store'

const mapStateToProps = (state: RootState) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
  {}
)(Icons)
