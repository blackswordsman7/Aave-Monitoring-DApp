import React from 'react'
import { Card, CardHeader, Table, Container, Row, Col } from 'reactstrap'
import moment from 'moment'

// Components
import Token from './Token'

// Types
import { DefaultProps } from '../../core/props'
import { TokenReserve } from '../../types'

// Utils
import { fromBaseUnit, getTokenDetails, shortAddress } from '../../core/utils'
import Identicon from './Identicon'

class History extends React.Component<DefaultProps> {
  render() {
    const { tokenReserves, userHistory } = this.props.apiState

    return (
      <>
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">History</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table
                  className="align-items-center table-flush table-hover"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">User</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Event</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userHistory.map((uh, index) => {
                      const token = getTokenDetails(
                        uh.reserve,
                        tokenReserves
                      ) as TokenReserve

                      return (
                        <tr key={index}>
                          <td>
                            <Identicon address={uh.address} size={30} />
                            <span className="ml-2">
                              {shortAddress(uh.address)}
                            </span>
                          </td>
                          <td>
                            <Token token={token.symbol} />
                            <span className="ml-2">
                              {fromBaseUnit(uh.amount, token.decimals).toFixed(
                                2
                              )}
                            </span>
                            <span className="ml-2">{token.symbol}</span>
                          </td>
                          <td>
                            <span className="badge badge-info">
                              {uh.event_name}
                            </span>
                          </td>
                          <td>{moment.unix(uh.timestamp).fromNow()}</td>
                        </tr>
                      )
                    })}
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

export default History
