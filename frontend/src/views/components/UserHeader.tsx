import React from 'react'
import { connect } from 'react-redux'
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
import { UserHeaderProps } from '../../core/props'
import { RootState } from '../../redux/store'

// Utils
import { parseAmount } from '../../core/utils'

class UserHeader extends React.Component<UserHeaderProps> {
  state = {}

  toggle = targetName => {
    if (!this.state[targetName]) {
      this.setState({
        ...this.state,
        [targetName]: true
      })
    } else {
      this.setState({
        ...this.state,
        [targetName]: !this.state[targetName]
      })
    }
  }

  renderCard = (amount, targetName) => {
    const { ethPrice } = this.props.apiState

    return (
      <>
        <span className="h2 font-weight-bold mb-0" id={targetName}>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'ETH',
            currencyDisplay: 'name'
          }).format(parseFloat(amount))}
        </span>
        <Tooltip
          placement="top"
          isOpen={this.state[targetName]}
          target={targetName}
          toggle={() => this.toggle(targetName)}
        >
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(parseFloat(amount) * ethPrice)}
        </Tooltip>
      </>
    )
  }

  render() {
    const { health } = this.props.userState

    const borrow = parseAmount(health ? health.totalborrowseth : '0', 18)
    const collateral = parseAmount(health ? health.totalcollateral : '0', 18)
    const liquidity = parseAmount(health ? health.totliquidityeth : '0', 18)

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              <Row>
                <Col lg="4" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Collateral
                          </CardTitle>
                          {this.renderCard(collateral, 'collateralTooltip')}
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-default text-white rounded-circle shadow">
                            <i className="fas fa-wallet" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Liquidity
                          </CardTitle>
                          {this.renderCard(liquidity, 'liquidityTooltip')}
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                            <i className="fas fa-coins" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Borrow
                          </CardTitle>
                          {this.renderCard(borrow, 'borrowTooltip')}
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-hand-holding-usd" />
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

export default connect(mapStateToProps, {})(UserHeader)
