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
import EventBadge from './EventBadge'
import Token from './Token'

// Types
import { DefaultProps } from '../../core/props'
import { TokenReserve } from '../../types'

// Table Columns
import {
  defaultSortedUserHistory,
  userHistoryColumns
} from '../../core/columns'

const TokenOption = (props: OptionProps<any>) => {
  const { data } = props
  return (
    <components.Option {...props}>
      <Token size={22} token={data.value} />
      <span className="ml-2">{data.value}</span>
    </components.Option>
  )
}

const EventOption = (props: OptionProps<any>) => {
  const { data } = props
  return (
    <components.Option {...props}>
      <EventBadge event={data.value} />
    </components.Option>
  )
}

const TokenValue = (props: SingleValueProps<any>) => (
  <components.SingleValue {...props}>
    <Token size={22} token={props.children as string} />
    <span className="ml-2">{props.children}</span>
  </components.SingleValue>
)

const EventValue = (props: SingleValueProps<any>) => (
  <components.SingleValue {...props}>
    <EventBadge event={props.children as string} />
  </components.SingleValue>
)

const eventOptions = [
  { label: 'Borrow', value: 'Borrow' },
  { label: 'Deposit', value: 'Deposit' },
  { label: 'Flashloan', value: 'Flashloan' },
  { label: 'Redeem', value: 'Redeem' },
  { label: 'Repay', value: 'Repay' },
  { label: 'Swap', value: 'Swap' }
]

class History extends React.Component<DefaultProps> {
  state = {
    filters: {
      event: '',
      token: ''
    },
    history: []
  }

  componentDidMount() {
    this.setState({ history: this.props.apiState.userHistory })
  }

  componentDidUpdate(prevProps: Readonly<DefaultProps>): void {
    if (
      JSON.stringify(prevProps.apiState.userHistory) !==
      JSON.stringify(this.props.apiState.userHistory)
    ) {
      this.setState({ history: this.props.apiState.userHistory })
    }
  }

  _onFilter = (option, filterType) => {
    this.setState(
      {
        filters: {
          ...this.state.filters,
          [filterType]: option ? option.value : ''
        }
      },
      () => this._filteredHistory()
    )
  }

  _filteredHistory = () => {
    const { userHistory } = this.props.apiState
    const { filters } = this.state

    const history = userHistory
      .filter(uh =>
        filters.token
          ? (uh.token as TokenReserve).symbol === filters.token
          : true
      )
      .filter(uh => (filters.event ? uh.event_name === filters.event : true))

    this.setState({ history })
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
                        onChange={option => this._onFilter(option, 'token')}
                        placeholder="Token"
                        className="react-select-container"
                        classNamePrefix="react-select"
                        isClearable
                      />
                    </Col>
                    <Col md="3" xl="2">
                      <Select
                        closeMenuOnScroll={true}
                        components={{
                          Option: EventOption,
                          SingleValue: EventValue
                        }}
                        options={eventOptions}
                        onChange={option => this._onFilter(option, 'event')}
                        placeholder="Event"
                        className="react-select-container"
                        classNamePrefix="react-select"
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
