import React from 'react'

interface Props {
  event: string
}

const EventBadge = (props: Props) => {
  const getBadgeColor = () => {
    let badgeColor = ''

    switch (props.event) {
      case 'Borrow':
        badgeColor = 'badge-warning'
        break

      case 'Deposit':
        badgeColor = 'badge-primary'
        break

      case 'FlashLoan':
        badgeColor = 'badge-danger'
        break

      case 'Redeem':
        badgeColor = 'badge-success'
        break

      case 'Repay':
        badgeColor = 'badge-default'
        break

      case 'Swap':
        badgeColor = 'badge-info'
        break

      default:
        break
    }

    return badgeColor
  }

  return <span className={`badge ${getBadgeColor()}`}>{props.event}</span>
}

export default EventBadge
