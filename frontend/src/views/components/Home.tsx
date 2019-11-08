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
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Tooltip
} from 'reactstrap'

// Components
import Token from './Token'

// Types
import { DefaultProps } from '../../core/props'

class Home extends React.Component<DefaultProps> {
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

  render() {
    const { tokenReserves, usersCount } = this.props.apiState

    return (
      <>
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Protocol Overview</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table
                  className="align-items-center table-flush table-hover"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Assets</th>
                      <th scope="col">Users</th>
                      <th scope="col">Liquidity Available</th>
                      <th scope="col">Deposit APR</th>
                      <th scope="col">Stable Borrow APR</th>
                      <th scope="col">Variable Borrow APR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokenReserves.map(tr => (
                      <tr key={tr.symbol}>
                        <td>
                          <Token size={30} token={tr.symbol} />
                          <span className="ml-3">{tr.name}</span>
                        </td>
                        <td>{usersCount[tr.name]}</td>
                        <td>
                          <span id={`${tr.symbol.toLowerCase()}Tooltip`}>
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              currencyDisplay: 'name'
                            })
                              .format(parseFloat(tr.availableLiquidity))
                              .replace('US dollars', tr.symbol)}
                          </span>
                          <Tooltip
                            placement="top"
                            isOpen={
                              this.state[`${tr.symbol.toLowerCase()}Tooltip`]
                            }
                            target={`${tr.symbol.toLowerCase()}Tooltip`}
                            toggle={() =>
                              this.toggle(`${tr.symbol.toLowerCase()}Tooltip`)
                            }
                          >
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'ETH',
                              currencyDisplay: 'name'
                            }).format(
                              parseFloat(tr.availableLiquidity) *
                                parseFloat(tr.priceInEth)
                            )}
                          </Tooltip>
                        </td>
                        <td>
                          {`${(parseFloat(tr.liquidityRate) * 100).toFixed(
                            2
                          )} %`}
                        </td>
                        <td>
                          {`${(parseFloat(tr.fixedBorrowRate) * 100).toFixed(
                            2
                          )} %`}
                        </td>
                        <td>
                          {`${(parseFloat(tr.variableBorrowRate) * 100).toFixed(
                            2
                          )} %`}
                        </td>
                      </tr>
                    ))}
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

export default Home
