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
import { Card, CardHeader, Container, Row, Col, CardBody } from 'reactstrap'

// Components
import Balance from './Balance'

// Types
import { DashboardProps } from '../../core/props'

class Dashboard extends React.Component<DashboardProps> {
  state = {}

  componentDidMount() {
    const address = this.props.web3State.accounts[0]

    if (address) {
      this.props.getUserHealth(address)
    }
  }

  componentDidUpdate(prevProps) {
    const address = this.props.web3State.accounts[0]

    if (address && address !== prevProps.web3State.accounts[0]) {
      this.props.getUserHealth(address)
    }
  }

  render() {
    const { tokens } = this.props.apiState

    return (
      <>
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Balances</h3>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="pl-5 pr-5">
                  <Row>
                    {tokens.map(token => {
                      return <Balance key={token} token={token} />
                    })}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Dashboard
