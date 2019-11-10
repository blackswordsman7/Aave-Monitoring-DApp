import { connect } from 'react-redux'

import Health from '../components/Health'
import { RootState } from '../../redux/store'

const mapStateToProps = (state: RootState) => {
  return { ...state }
}

export default connect(mapStateToProps, {})(Health as any)
