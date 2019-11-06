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
import Chart from 'chart.js'
import { Card, CardHeader, Table, Container, Row, Col } from 'reactstrap'

// Components
import Token from './Token'
import {
  chartOptions,
  parseOptions
  // chartExample1,
  // chartExample2
} from '../../variables/Charts'

// Types
import { DefaultProps } from '../../core/props'

class Dashboard extends React.Component<DefaultProps> {
  state = {
    activeNav: 1,
    chartExample1Data: 'data1'
  }

  componentDidMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions())
    }
  }

  /*toggleNavs = (e, index) => {
    e.preventDefault()
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === 'data1' ? 'data2' : 'data1'
    })
    const wow = () => {
      console.log(this.state)
    }
    wow.bind(this)
    setTimeout(() => wow(), 1000)
    // this.chartReference.update();
  }*/

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
                <Table className="align-items-center table-flush" responsive>
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
                          <Token token={tr.symbol} />
                          <span className="ml-3">{tr.name}</span>
                        </td>
                        <td>{usersCount[tr.name]}</td>
                        <td>
                          {`${parseFloat(tr.availableLiquidity).toFixed(2)} ${
                            tr.symbol
                          }`}
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
          {/*<Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames('py-2 px-3', {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames('py-2 px-3', {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Line
                      data={chartExample1[this.state.chartExample1Data]}
                      // @ts-ignore
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total orders</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>*/}
        </Container>
      </>
    )
  }
}

export default Dashboard
