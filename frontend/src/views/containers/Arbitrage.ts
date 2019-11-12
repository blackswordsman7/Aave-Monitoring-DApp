import { connect } from 'react-redux'

import Arbitrage from '../components/Arbitrage'

// Redux
import { apiActions } from '../../redux/modules/api'
import { RootState } from '../../redux/store'

const mapStateToProps = (state: RootState) => {
  return { ...state }
}

export default connect(mapStateToProps, {
  getUniswapArbitrage: apiActions.getUniswapArbitrage
})(Arbitrage as any)
