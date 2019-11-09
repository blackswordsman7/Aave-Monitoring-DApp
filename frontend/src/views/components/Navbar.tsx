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
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Media,
  Nav,
  Navbar as ReactstrapNav,
  Spinner
} from 'reactstrap'

// Components
import Identicon from './Identicon'

// Utils
import { shortAddress } from '../../core/utils'

type Props = {
  address: string
  brandText: string
  initWeb3: () => {}
  loading: boolean
}

class Navbar extends React.Component<Props> {
  render() {
    const { address, brandText, initWeb3, loading } = this.props

    return (
      <>
        <ReactstrapNav
          className="navbar-top navbar-dark"
          expand="md"
          id="navbar-main"
        >
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {brandText}
            </Link>

            <Nav className="align-items-center d-none d-md-flex" navbar>
              {address ? (
                <Media className="align-items-center">
                  <Identicon address={address} size={36} />
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold text-white">
                      {shortAddress(address)}
                    </span>
                  </Media>
                </Media>
              ) : (
                <Button onClick={() => initWeb3()} disabled={loading}>
                  {loading ? (
                    <Spinner
                      color="primary"
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        margin: '0 2rem'
                      }}
                    />
                  ) : (
                    'Connect'
                  )}
                </Button>
              )}
            </Nav>
          </Container>
        </ReactstrapNav>
      </>
    )
  }
}

export default Navbar
