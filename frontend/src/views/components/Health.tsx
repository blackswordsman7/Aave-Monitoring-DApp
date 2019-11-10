import React from 'react'
import { Card, CardHeader, Container, Row, Col, Spinner } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import Select, { components, OptionProps, SingleValueProps } from 'react-select'

// Components
import RoleBadge from './RoleBadge'

// Types
import { DefaultProps } from '../../core/props'

// Table Columns
import { userHealthColumns } from '../../core/columns'

const RoleOption = (props: OptionProps<any>) => {
  const { data } = props
  return (
    <components.Option {...props}>
      <RoleBadge roles={[data.value]} />
    </components.Option>
  )
}

const RoleValue = (props: SingleValueProps<any>) => (
  <components.SingleValue {...props}>
    <RoleBadge roles={[props.children as 'Active' | 'Risky' | 'Whale']} />
  </components.SingleValue>
)

const roleOptions = [
  { label: 'Active', value: 'Active' },
  { label: 'Risky', value: 'Risky' },
  { label: 'Whale', value: 'Whale' }
]

class History extends React.Component<DefaultProps> {
  state = {
    health: []
  }

  componentDidMount() {
    this.setState({ health: this.props.apiState.userHealth })
  }

  componentDidUpdate(prevProps: Readonly<DefaultProps>): void {
    if (
      JSON.stringify(prevProps.apiState.userHealth) !==
      JSON.stringify(this.props.apiState.userHealth)
    ) {
      this.setState({ health: this.props.apiState.userHealth })
    }
  }

  _onFilter = option => {
    const { userHealth } = this.props.apiState

    if (option) {
      const health = userHealth.filter(uh => uh.Roles.includes(option.value))
      this.setState({ health })
    } else {
      this.setState({ health: userHealth })
    }
  }

  render() {
    const { isLoadingHealth } = this.props.apiState
    const { health } = this.state

    return (
      <>
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col md="9" xl="10">
                      <h3 className="mb-0">Health</h3>
                    </Col>
                    <Col md="3" xl="2">
                      <Select
                        closeMenuOnScroll={true}
                        components={{
                          Option: RoleOption,
                          SingleValue: RoleValue
                        }}
                        options={roleOptions}
                        onChange={this._onFilter}
                        placeholder="Role"
                        className="react-select-container"
                        classNamePrefix="react-select"
                        isClearable
                      />
                    </Col>
                  </Row>
                </CardHeader>
                {isLoadingHealth ? (
                  <Col className="text-center mt-5 mb-5">
                    <Spinner color="primary" />
                  </Col>
                ) : (
                  <BootstrapTable
                    keyField="address"
                    data={health}
                    columns={userHealthColumns}
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
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default History
