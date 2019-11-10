import React from 'react'
import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

// Components
import EventBadge from '../views/components/EventBadge'
import Identicon from '../views/components/Identicon'
import RoleBadge from '../views/components/RoleBadge'
import Token from '../views/components/Token'

// Utils
import { parseAmount, shortAddress } from './utils'

const _onClickCopy = () =>
  toast.success('Copied to clipboard successfully', {
    position: toast.POSITION.TOP_RIGHT
  })

const formatUser = (address: string) => {
  return (
    <React.Fragment>
      <Identicon address={address} size={30} />
      <span className="ml-2">{shortAddress(address, 10)}</span>
      <CopyToClipboard text={address} onCopy={_onClickCopy}>
        <span className="ml-2 cursor-pointer">
          <i className="far fa-copy" />
        </span>
      </CopyToClipboard>
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
    dataField: 'Roles',
    text: 'Roles',
    sort: false,
    // eslint-disable-next-line react/display-name
    formatter: cell => <RoleBadge roles={cell} />,
    sortFunc: (a, b, order) =>
      order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
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
    formatter: cell => formatUser(cell),
    title: true
  },
  {
    dataField: 'amount',
    text: 'Amount',
    sort: false,
    // eslint-disable-next-line react/display-name
    formatter: (cell, row) => {
      const amount = cell ? parseFloat(parseAmount(cell, 18)) : 0

      return (
        <>
          <Token size={24} token={row.token.symbol} />
          <span className="ml-2">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              currencyDisplay: 'name'
            })
              .format(amount)
              .replace('US dollars', row.token.symbol)}
          </span>
        </>
      )
    },
    // eslint-disable-next-line react/display-name
    title: (cell, row) => {
      const amount = cell ? parseFloat(parseAmount(cell, 18)) : 0

      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ETH',
        currencyDisplay: 'name'
      }).format(amount * parseFloat(row.token.priceInEth))
    }
  },
  {
    dataField: 'event_name',
    text: 'Event',
    sort: false,
    // eslint-disable-next-line react/display-name
    formatter: cell => <EventBadge event={cell} />,
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
  },
  {
    dataField: 'txhash',
    text: 'Transaction',
    sort: false,
    // eslint-disable-next-line react/display-name
    formatter: cell => (
      <a
        href={`https://kovan.etherscan.io/tx/${cell}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {shortAddress(cell, 10)}
        <i className="fas fa-external-link-alt ml-1" />
      </a>
    )
  }
]
