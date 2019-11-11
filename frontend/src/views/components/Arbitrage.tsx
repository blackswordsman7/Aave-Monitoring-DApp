import React from 'react'
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Spinner,
  Button
} from 'reactstrap'

// Components
import Token from './Token'

// Types
import { ArbitrageProps } from '../../core/props'

class Arbitrage extends React.Component<ArbitrageProps> {
  state = {}

  componentDidMount() {
    if (this.props.apiState.uniswapArbitrage.length === 0) {
      setTimeout(() => this.props.getUniswapArbitrage(), 500)
    }
  }

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

  render() {
    const { isLoadingArbitrage, uniswapArbitrage } = this.props.apiState

    return (
      <>
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader>
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Uniswap Arbitrage</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table
                  className="align-items-center table-flush table-hover"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Supply</th>
                      <th scope="col">Borrow</th>
                      <th scope="col">Current Liquidity</th>
                      <th scope="col">Expected Fees</th>
                      <th scope="col">Expected Loss</th>
                      <th scope="col">Expected Net ROI</th>
                      <th scope="col">Equivalent APR</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingArbitrage ? (
                      <td colSpan={12} className="text-center mt-5 mb-5">
                        <Spinner color="primary" />
                      </td>
                    ) : (
                      uniswapArbitrage.map(a => (
                        <tr key={a.token_symbol}>
                          <td>
                            <Token size={30} token="ETH" />
                            <span className="ml-3">ETH</span>
                          </td>
                          <td>
                            <Token size={30} token={a.token_symbol} />
                            <span className="ml-3">{a.token_symbol}</span>
                          </td>
                          <td>{a.current_pool_size_eth.toFixed(2)} ETH</td>
                          <td>
                            {`${(a.percentage_yield_from_fees * 100).toFixed(
                              2
                            )} %`}
                          </td>
                          <td>
                            {`${(a.impermanent_loss * 100).toFixed(2)} %`}
                          </td>
                          <td>
                            {`${(a.projected_total_yield * 100).toFixed(2)} %`}
                          </td>
                          <td>{`${(a.equivalent_apr * 100).toFixed(2)} %`}</td>
                          <td>
                            <Button color="info" size="sm">
                              Trade
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Arbitrage
