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
import { Card, CardHeader, Container, Row, Col, Spinner } from 'reactstrap'

// Components
import Asset from './Asset'
import BubbleImage from './charts/BubbleImage'
import ColumnImage from './charts/ColumnImage'

// Types
import { DefaultProps } from '../../core/props'
import { TokenReserve } from '../../types'

// Utils
import { getTokenDetails } from '../../core/utils'

class Home extends React.Component<DefaultProps> {
  // state = {}

  /*toggle = targetName => {
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
  }*/

  render() {
    const { isLoadingReserves, tokenReserves, usersCount } = this.props.apiState
    const daiTokenPriceInUsd =
      tokenReserves.length !== 0
        ? parseFloat(
            (getTokenDetails('DAI', tokenReserves, 'symbol') as TokenReserve)
              .priceInUsd
          )
        : 0

    return (
      <>
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader>
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Protocol Overview</h3>
                    </div>
                  </Row>
                </CardHeader>

                {!isLoadingReserves && tokenReserves.length > 0 && (
                  <Card className="pl-5 pr-5 mb-5 shadow">
                    <Row>
                      <Col xl={6}>
                        <CardHeader className="border-0">
                          <Row className="align-items-center">
                            <div className="col">
                              <h3 className="mb-0 text-center">
                                Transactions count per reserve
                              </h3>
                            </div>
                          </Row>
                        </CardHeader>
                        <BubbleImage
                          tokenReserves={tokenReserves as TokenReserve[]}
                        />
                      </Col>
                      <Col xl={6}>
                        <CardHeader className="border-0">
                          <Row className="align-items-center">
                            <div className="col">
                              <h3 className="mb-0 text-center">
                                Total volume per reserve ($$)
                              </h3>
                            </div>
                          </Row>
                        </CardHeader>
                        <ColumnImage
                          tokenReserves={tokenReserves as TokenReserve[]}
                        />
                      </Col>
                    </Row>
                  </Card>
                )}

                <Row className="pl-5 pr-5">
                  {isLoadingReserves ? (
                    <Col className="text-center mt-5 mb-5">
                      <Spinner color="primary" />
                    </Col>
                  ) : (
                    tokenReserves.map(token => (
                      <Asset
                        key={token.symbol}
                        daiTokenPriceInUsd={daiTokenPriceInUsd}
                        token={token}
                        userCount={usersCount[token.name]}
                      />
                    ))
                  )}
                </Row>

                {/*<Table
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
                    {isLoadingReserves ? (
                      <td colSpan={12} className="text-center mt-5 mb-5">
                        <Spinner color="primary" />
                      </td>
                    ) : (
                      tokenReserves.map(tr => (
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
                                currency: 'USD'
                              }).format(
                                parseFloat(tr.availableLiquidity) *
                                  parseFloat(tr.priceInUsd)
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
                            {`${(
                              parseFloat(tr.variableBorrowRate) * 100
                            ).toFixed(2)} %`}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>*/}
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Home
