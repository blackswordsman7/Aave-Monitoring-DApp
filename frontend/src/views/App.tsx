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
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'

// Routes
import routes from '../routes'

// Redux
import { web3Actions } from '../redux/modules/web3'
import { RootState } from '../redux/store'

// Types
import { DefaultProps } from '../core/props'

const mapStateToProps = (state: RootState) => {
  return { ...state.router, web3State: state.web3State }
}

interface Props extends DefaultProps {
  initWeb3: () => {}
}

class App extends React.Component<Props> {
  componentDidMount() {
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
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />

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
    initWeb3: web3Actions.initWeb3
  }
)(App)
