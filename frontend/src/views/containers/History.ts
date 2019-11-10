import { connect } from 'react-redux'

import History from '../components/History'
import { RootState } from '../../redux/store'

const mapStateToProps = (state: RootState) => {
  return { ...state }
}

export default connect(mapStateToProps, {})(History as any)
