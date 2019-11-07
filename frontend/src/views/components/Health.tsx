import React from 'react'
import { Card, CardHeader, Container, Row, Col } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

// Components
import Identicon from './Identicon'

// Types
import { DefaultProps } from '../../core/props'

// Utils
import { fromBaseUnit, shortAddress } from '../../core/utils'

const columns = [
  {
    dataField: 'address',
    text: 'User',
    sort: false,
    // eslint-disable-next-line react/display-name
    formatter: cell => {
      return (
        <React.Fragment>
          <Identicon address={cell} size={30} />
          <span className="ml-2">{shortAddress(cell)}</span>
        </React.Fragment>
      )
    }
  },
  {
    dataField: 'healthfactor',
    text: 'Health Factor',
    sort: true,
    formatter: cell => {
      const health = fromBaseUnit(cell, 18)
      return health > 5 ? '5+' : health.toFixed(2)
    },
    sortFunc: (a, b, order) => {
      return order === 'asc' ? a - b : b - a
    }
  },
  {
    dataField: 'totalcollateral',
    text: 'Total Collateral',
    sort: true,
    formatter: cell => `${fromBaseUnit(cell, 18).toFixed(2)} ETH`,
    sortFunc: (a, b, order) => {
      return order === 'asc' ? a - b : b - a
    }
  }
]

class History extends React.Component<DefaultProps> {
  render() {
    const { userHealth } = this.props.apiState

    return (
      <>
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Health</h3>
                    </div>
                  </Row>
                </CardHeader>
                <BootstrapTable
                  keyField="address"
                  data={userHealth}
                  columns={columns}
                  bordered={false}
                  pagination={paginationFactory({
                    alwaysShowAllBtns: true,
                    hideSizePerPage: true,
                    paginationSize: 3,
                    sizePerPage: 10
                  })}
                  bootstrap4={true}
                  classes="align-items-center table-flush"
                  wrapperClasses="table-responsive"
                  hover
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default History
