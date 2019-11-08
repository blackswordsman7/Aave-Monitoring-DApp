import React from 'react'
import { Card, CardHeader, Container, Row, Col } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import Select, {
  components,
  OptionProps,
  OptionTypeBase,
  SingleValueProps
} from 'react-select'

// Components
import Token from './Token'

// Types
import { DefaultProps } from '../../core/props'

// Table Columns
import {
  defaultSortedUserHistory,
  userHistoryColumns
} from '../../core/columns'
import { TokenReserve } from '../../types'

const TokenOption = (props: OptionProps<any>) => {
  const { data } = props
  return (
    <components.Option {...props}>
      <Token token={data.value} />
      <span className="ml-2">{data.value}</span>
    </components.Option>
  )
}

const TokenValue = (props: SingleValueProps<any>) => (
  <components.SingleValue {...props}>
    <Token token={props.children as string} />
    <span className="ml-2">{props.children}</span>
  </components.SingleValue>
)

const eventOptions = [
  { label: 'Borrow', value: 'Borrow' },
  { label: 'Deposit', value: 'Deposit' },
  { label: 'Repay', value: 'Repay' },
  { label: 'Redeem', value: 'Redeem' },
  { label: 'Swap', value: 'Borrow' },
  { label: 'Flashloan', value: 'Flashloan' }
]

class History extends React.Component<DefaultProps> {
  state = {
    history: []
  }

  componentDidUpdate(prevProps: Readonly<DefaultProps>): void {
    if (
      JSON.stringify(prevProps.apiState.userHistory) !==
      JSON.stringify(this.props.apiState.userHistory)
    ) {
      this.setState({ history: this.props.apiState.userHistory })
    }
  }

  _onTokenFilter = option => {
    const { userHistory } = this.props.apiState

    if (option) {
      const history = userHistory.filter(
        uh => (uh.token as TokenReserve).symbol === option.value
      )

      this.setState({ history })
    } else {
      this.setState({ history: userHistory })
    }
  }

  _onEventFilter = option => {
    const { userHistory } = this.props.apiState

    if (option) {
      const history = userHistory.filter(uh => uh.event_name === option.value)

      this.setState({ history })
    } else {
      this.setState({ history: userHistory })
    }
  }

  render() {
    const { tokens } = this.props.apiState
    const { history } = this.state

    const tokenOptions: Array<OptionTypeBase> = []
    tokens.map(token => tokenOptions.push({ label: token, value: token }))

    return (
      <>
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col md="6" xl="8">
                      <h3 className="mb-0">History</h3>
                    </Col>
                    <Col md="3" xl="2">
                      <Select
                        closeMenuOnScroll={true}
                        components={{
                          Option: TokenOption,
                          SingleValue: TokenValue
                        }}
                        options={tokenOptions}
                        onChange={this._onTokenFilter}
                        isClearable
                      />
                    </Col>
                    <Col md="3" xl="2">
                      <Select
                        closeMenuOnScroll={true}
                        options={eventOptions}
                        onChange={this._onEventFilter}
                        isClearable
                      />
                    </Col>
                  </Row>
                </CardHeader>
                <BootstrapTable
                  keyField="id"
                  data={history}
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
                  noDataIndication="Looks like there's no data on the applied filters!"
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
