import { connect } from 'react-redux'

import Home from '../components/Home'
import { RootState } from '../../redux/store'

const mapStateToProps = (state: RootState) => {
  return { ...state }
}

export default connect(mapStateToProps, {})(Home as any)
