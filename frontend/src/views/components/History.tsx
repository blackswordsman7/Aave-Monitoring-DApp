import React from 'react'
import { Card, CardHeader, Container, Row, Col } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

// Types
import { DefaultProps } from '../../core/props'

// Table Columns
import {
  defaultSortedUserHistory,
  userHistoryColumns
} from '../../core/columns'

class History extends React.Component<DefaultProps> {
  render() {
    const { userHistory } = this.props.apiState

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
                <BootstrapTable
                  keyField="id"
                  data={userHistory}
                  columns={userHistoryColumns}
                  defaultSorted={defaultSortedUserHistory}
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
