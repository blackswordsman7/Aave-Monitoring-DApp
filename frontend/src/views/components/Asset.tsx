import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Row, Tooltip } from 'reactstrap'

// Components
import Token from './Token'

// Types
import { TokenReserve } from '../../types'

interface Props {
  daiTokenPriceInUsd: number
  token: TokenReserve
  userCount: number
}

const Asset = (props: Props) => {
  const [isATokenOpen, setIsATokenOpen] = useState(false)

  const { daiTokenPriceInUsd, token, userCount } = props

  const priceInUsd = parseFloat(token.priceInUsd)
  const liquidity = parseFloat(token.availableLiquidity)

  const aTokenSupplyInUsd =
    ((token.aTokenTotalSupply as number) /
      (token.aTokenExchangeRate as number)) *
    daiTokenPriceInUsd

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
                  .format(liquidity)
                  .replace('US dollars', token.symbol)}
              </span>
              <span className="float-right text-gray">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(liquidity * priceInUsd)}
              </span>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <p
            className="details"
            id={`${token.symbol.toLowerCase()}ATokenTooltip`}
          >
            aToken Supply:{' '}
            <span className="float-right text-gray">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'name'
              })
                .format(token.aTokenTotalSupply as number)
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
              }).format(aTokenSupplyInUsd)}
            </Tooltip>
          </p>
          <hr className="my-3" />
          <p
            className="details"
            id={`${token.symbol.toLowerCase()}ATokenTooltip`}
          >
            aToken Transaction Count:{' '}
            <span className="float-right text-gray">
              {token.aTokenTransactionCount}
            </span>
          </p>
          <hr className="my-3" />
          <p
            className="details"
            id={`${token.symbol.toLowerCase()}ATokenTooltip`}
          >
            Users Count:{' '}
            <span className="float-right text-gray">{userCount}</span>
          </p>
          <hr className="my-3" />
          <p
            className="details"
            id={`${token.symbol.toLowerCase()}BorrowedTooltip`}
          >
            Deposit APR:{' '}
            <span className="float-right text-gray">
              {`${(parseFloat(token.liquidityRate) * 100).toFixed(2)} %`}
            </span>
          </p>
          <hr className="my-3" />
          <p className="details">
            Stable Borrow (APR):{' '}
            <span className="float-right text-gray">
              {`${(parseFloat(token.fixedBorrowRate) * 100).toFixed(2)} %`}
            </span>
          </p>
          <hr className="my-3" />
          <p className="details">
            Variable Borrow (APR):{' '}
            <span className="float-right text-gray">
              {`${(parseFloat(token.variableBorrowRate) * 100).toFixed(2)} %`}
            </span>
          </p>
        </CardBody>
      </Card>
    </Col>
  )
}

export default Asset
