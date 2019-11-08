import React from 'react'
import moment from 'moment'

// Components
import Identicon from '../views/components/Identicon'
import Token from '../views/components/Token'

// Utils
import { parseAmount, shortAddress } from './utils'

const formatUser = (address: string) => {
  return (
    <React.Fragment>
      <Identicon address={address} size={30} />
      <span className="ml-2">{shortAddress(address)}</span>
    </React.Fragment>
  )
}

const sortNumberFunc = (a, b, order) => {
  return order === 'asc' ? a - b : b - a
}

const sortDateFunc = (a, b, order) => {
  return order === 'asc' ? b - a : a - b
}

export const defaultSortedUserHistory = [
  {
    dataField: 'timestamp',
    order: 'asc'
  }
]

export const userHealthColumns = [
  {
    dataField: 'address',
    text: 'User',
    sort: false,
    formatter: cell => formatUser(cell)
  },
  {
    dataField: 'healthfactor',
    text: 'Health Factor',
    sort: true,
    formatter: cell => {
      const health = parseAmount(cell, 18)
      return parseFloat(health) > 5 ? '5+' : health
    },
    sortFunc: sortNumberFunc
  },
  {
    dataField: 'totalcollateral',
    text: 'Total Collateral',
    sort: true,
    formatter: cell => `${parseAmount(cell, 18)} ETH`,
    sortFunc: sortNumberFunc
  }
]

export const userHistoryColumns = [
  {
    dataField: 'address',
    text: 'User',
    sort: false,
    formatter: cell => formatUser(cell)
  },
  {
    dataField: 'amount',
    text: 'Amount',
    sort: false,
    // eslint-disable-next-line react/display-name
    formatter: (cell, row) => {
      return (
        <React.Fragment>
          <Token token={row.token.symbol} />
          <span className="ml-2">{parseAmount(cell, 18)}</span>
          <span className="ml-2">{row.token.symbol}</span>
        </React.Fragment>
      )
    }
  },
  {
    dataField: 'event_name',
    text: 'Event',
    sort: false,
    // eslint-disable-next-line react/display-name
    formatter: cell => <span className="badge badge-info">{cell}</span>,
    sortFunc: (a, b, order) =>
      order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
  },
  {
    dataField: 'timestamp',
    text: 'Date',
    sort: true,
    // eslint-disable-next-line react/display-name
    formatter: cell => moment.unix(cell).fromNow(),
    sortFunc: sortDateFunc
  }
]
