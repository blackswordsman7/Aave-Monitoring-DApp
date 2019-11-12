import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Row, Tooltip } from 'reactstrap'

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
  const [isATokenOpen, setIsATokenOpen] = useState(false)
  const [isBorrowOpen, setIsBorrowOpen] = useState(false)

  const { reserve, tokenReserves } = props
  const token = getTokenDetails(
    reserve.reserve,
    tokenReserves,
    'symbol'
  ) as TokenReserve
  const daiTokenPriceInUsd = (getTokenDetails(
    'DAI',
    tokenReserves,
    'symbol'
  ) as TokenReserve).priceInUsd

  const priceInUsd = parseFloat(token.priceInUsd)

  const aTokenBalance = parseFloat(
    parseAmount(reserve.currentATokenBalance, token.decimals)
  )
  const aTokenBalanceInUsd =
    (aTokenBalance / (token.aTokenExchangeRate as number)) *
    parseFloat(daiTokenPriceInUsd)

  const borrowBalance = parseFloat(
    parseAmount(reserve.currentBorrowBalance, token.decimals)
  )
  const borrowBalanceInUsd = borrowBalance * priceInUsd

  const tokenBalance = parseFloat(
    parseAmount(reserve.currentUnderlyingBalance, token.decimals)
  )

  const tokenBalanceInUsd = tokenBalance * priceInUsd

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
                  currency: 'USD',
                  currencyDisplay: 'name'
                })
                  .format(tokenBalance)
                  .replace('US dollars', token.symbol)}
              </span>
              <span className="float-right text-gray">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(tokenBalanceInUsd)}
              </span>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <p
            className="details"
            id={`${token.symbol.toLowerCase()}ATokenTooltip`}
          >
            aToken Balance:{' '}
            <span className="float-right text-gray">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'name'
              })
                .format(aTokenBalance)
                .replace('US dollars', `a${token.symbol}`)}
            </span>
            <Tooltip
              placement="top"
              isOpen={isATokenOpen}
              target={`${token.symbol.toLowerCase()}ATokenTooltip`}
              toggle={() => setIsATokenOpen(!isATokenOpen)}
            >
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(aTokenBalanceInUsd)}
            </Tooltip>
          </p>
          <hr className="my-3" />
          <p
            className="details"
            id={`${token.symbol.toLowerCase()}BorrowedTooltip`}
          >
            Borrowed:{' '}
            <span className="float-right text-gray">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'name'
              })
                .format(borrowBalance)
                .replace('US dollars', token.symbol)}
            </span>
            <Tooltip
              placement="top"
              isOpen={isBorrowOpen}
              target={`${token.symbol.toLowerCase()}BorrowedTooltip`}
              toggle={() => setIsBorrowOpen(!isBorrowOpen)}
            >
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(borrowBalanceInUsd)}
            </Tooltip>
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
