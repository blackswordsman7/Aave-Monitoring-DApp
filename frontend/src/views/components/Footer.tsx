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
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap'

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2019{' '}
              <a
                className="font-weight-bold ml-1"
                href="/"
                rel="noopener noreferrer"
                target="_blank"
              >
                DeFi-Verse
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" target="_blank">
                  DeFi-Verse
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" target="_blank">
                  About Us
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://github.com/thesachinmittal/Aave-Monitoring-DApp/blob/master/LICENSE"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MIT License
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    )
  }
}

export default Footer
