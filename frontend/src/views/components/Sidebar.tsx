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
import { NavLink as NavLinkRRD, Link } from 'react-router-dom'
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from 'reactstrap'

type Props = {
  routes: Array<object>
}

class Sidebar extends React.Component<Props> {
  state = {
    collapseOpen: false
  }

  static defaultProps = {
    routes: [{}]
  }

  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    })
  }

  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    })
  }

  createLinks = (routes, type) => {
    return routes.map((prop, key) => {
      if (prop.type === type) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.path}
              tag={NavLinkRRD}
              onClick={this.closeCollapse}
              exact={prop.exact}
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        )
      }

      return null
    })
  }

  render() {
    const { routes } = this.props

    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <NavbarBrand className="pt-0" to="/" tag={Link}>
            DeFi-Verse
          </NavbarBrand>

          <Nav className="align-items-center d-md-none">
            <span />
          </Nav>

          <Collapse navbar isOpen={this.state.collapseOpen}>
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">DeFi-Verse</Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>

            <Nav navbar>{this.createLinks(routes, 'common')}</Nav>
            <hr className="my-3" />
            <Nav navbar>{this.createLinks(routes, 'user')}</Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Sidebar
