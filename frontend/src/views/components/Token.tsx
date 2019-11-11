import React from 'react'

import Tokens from '../../core/tokens'

interface Props {
  size: number
  token: string
}

const Token = (props: Props) => (
  <img
    src={Tokens[props.token]}
    alt={`${props.token} Logo`}
    width={`${props.size}px`}
    height={`${props.size}px`}
  />
)

export default Token
