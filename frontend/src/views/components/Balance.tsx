import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'

// Components
import Token from './Token'

// Types
import { TokenReserve, UserReserve } from '../../types'
import { getTokenDetails, parseAmount } from '../../core/utils'

interface Props {
  reserve: UserReserve
  tokenReserves: TokenReserve[]
}

const Balance = (props: Props) => {
  const { reserve, tokenReserves } = props
  const token = getTokenDetails(
    reserve.reserve,
    tokenReserves,
    'symbol'
  ) as TokenReserve

  const borrowBalanceInUsd =
    parseFloat(parseAmount(reserve.currentBorrowBalance, token.decimals)) *
    parseFloat(token.priceInUsd)

  const tokenBalanceInUsd =
    parseFloat(parseAmount(reserve.currentUnderlyingBalance, token.decimals)) *
    parseFloat(token.priceInUsd)

  return (
    <Col className="pb-5 balance" lg={6} xl={4}>
      <Card className="shadow">
        <CardHeader>
          <Row className="align-items-center">
            <Col>
              <Token size={30} token={token.symbol} />
              <span className="ml-2 font-weight-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(tokenBalanceInUsd)}
              </span>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <p className="details">
            Borrowed:{' '}
            <span className="float-right text-gray">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(borrowBalanceInUsd)}
            </span>
          </p>
          <hr className="my-3" />
          <p className="details">
            Deposit (APR):{' '}
            <span className="float-right text-gray">
              {`${(parseFloat(token.liquidityRate) * 100).toFixed(2)} %`}
            </span>
          </p>
          <hr className="my-3" />
          <p className="details">
            {reserve.borrowRateMode ? 'Variable' : 'Stable'} Borrow (APR):{' '}
            <span className="float-right text-gray">
              {`${(
                parseFloat(
                  reserve.borrowRateMode
                    ? token.variableBorrowRate
                    : token.fixedBorrowRate
                ) * 100
              ).toFixed(2)} %`}
            </span>
          </p>
        </CardBody>
      </Card>
    </Col>
  )
}

export default Balance
