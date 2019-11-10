import React from 'react'

interface Props {
  roles: Array<'Active' | 'Risky' | 'Whale'>
}

const RoleBadge = (props: Props) => {
  const getBadgeColor = (role: string) => {
    let badgeColor = ''

    switch (role) {
      case 'Active':
        badgeColor = 'badge-success'
        break

      case 'Risky':
        badgeColor = 'badge-danger'
        break

      case 'Whale':
        badgeColor = 'badge-primary'
        break

      default:
        break
    }

    return badgeColor
  }

  if (props.roles.length === 0) {
    return <span className="badge badge-default">User</span>
  }

  return (
    <>
      {props.roles.map((role, index) => {
        return (
          <span
            key={role}
            className={`badge ${getBadgeColor(role)} ${
              index > 0 ? 'ml-2' : ''
            }`}
          >
            {role}
          </span>
        )
      })}
    </>
  )
}

export default RoleBadge
