/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

// Components
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'

// Routes
import routes from '../routes'

// Redux
import { apiActions } from '../redux/modules/api'
import { web3Actions } from '../redux/modules/web3'
import { RootState } from '../redux/store'

// Types
import { AppProps } from '../core/props'

const mapStateToProps = (state: RootState) => {
  return { ...state.router, web3State: state.web3State }
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.getEthPrice()
    this.props.getUsersCount()
    this.props.getUserHealth()
    this.props.initWeb3()
  }

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (path.indexOf(routes[i].path) !== -1) {
        return routes[i].name
      }
    }
    return 'Aave'
  }

  render() {
    return (
      <>
        <Sidebar routes={routes} {...this.props} />
        <div className="main-content">
          <Navbar
            address={this.props.web3State.accounts[0]}
            brandText={this.getBrandText(this.props.location.pathname)}
            initWeb3={this.props.initWeb3}
          />

          <Header />

          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}

          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  {
    getEthPrice: apiActions.getEthPrice,
    getUsersCount: apiActions.getUsersCount,
    getUserHealth: apiActions.getUserHealth,
    initWeb3: web3Actions.initWeb3
  }
)(App)
