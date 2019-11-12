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
import { connect } from 'react-redux'
import CountUp from 'react-countup'
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Tooltip
} from 'reactstrap'

// Types
import { HeaderProps } from '../../core/props'
import { RootState } from '../../redux/store'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const numeral = require('numeral')

class Header extends React.Component<HeaderProps> {
  state = {
    showVolumeTooltip: false
  }

  toggle = () => {
    this.setState({ showVolumeTooltip: !this.state.showVolumeTooltip })
  }

  render() {
    const {
      ethPrice,
      tokenReserves,
      userHistory,
      usersCount
    } = this.props.apiState
    const { showVolumeTooltip } = this.state

    const totalUsersCount = Object.keys(usersCount).reduce(
      (sum, key) => sum + (usersCount[key] || 0),
      0
    )

    const flashLoanCount = userHistory.filter(
      uh => uh.event_name === 'FlashLoan'
    ).length

    const volume = tokenReserves
      .map(tr => parseFloat(tr.totalLiquidity) * parseFloat(tr.priceInEth))
      .reduce((a, b) => a + b, 0)

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Transactions
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            <CountUp end={userHistory.length} />
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-default text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Users
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            <CountUp end={totalUsersCount} />
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Volume
                          </CardTitle>
                          <span
                            className="h2 font-weight-bold mb-0"
                            id="VolumeTooltip"
                          >
                            {numeral(volume)
                              .format('(0a)')
                              .toUpperCase()}
                            {'+ '}
                            ETH
                          </span>
                          <Tooltip
                            placement="top"
                            isOpen={showVolumeTooltip}
                            target="VolumeTooltip"
                            toggle={this.toggle}
                          >
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(volume * ethPrice)}
                          </Tooltip>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="ni ni-money-coins" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            FlashLoans
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            <CountUp end={flashLoanCount} />
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="ni ni-spaceship" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return { ...state }
}

export default connect(mapStateToProps, {})(Header)
