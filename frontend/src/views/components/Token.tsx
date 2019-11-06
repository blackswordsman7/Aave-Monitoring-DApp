import React from 'react'

import AMPL from 'assets/img/tokens/ampl.svg'
import BAT from 'assets/img/tokens/bat.svg'
import DAI from 'assets/img/tokens/dai.svg'
import ETH from 'assets/img/tokens/eth.svg'
import KNC from 'assets/img/tokens/knc.svg'
import LEND from 'assets/img/tokens/lend.svg'
import LINK from 'assets/img/tokens/link.svg'
import MANA from 'assets/img/tokens/mana.svg'
import MKR from 'assets/img/tokens/mkr.svg'
import REP from 'assets/img/tokens/rep.svg'
import SUSD from 'assets/img/tokens/susd.svg'
import TUSD from 'assets/img/tokens/tusd.svg'
import USDC from 'assets/img/tokens/usdc.svg'
import USDT from 'assets/img/tokens/usdt.svg'
import WBTC from 'assets/img/tokens/wbtc.svg'
import ZRX from 'assets/img/tokens/zrx.svg'

interface Props {
  token: string
}

const Token = (props: Props) => {
  const getTokenLogo = () => {
    let logo = ''

    switch (props.token) {
      case 'AMPL':
        logo = AMPL
        break

      case 'BAT':
        logo = BAT
        break

      case 'DAI':
        logo = DAI
        break

      case 'ETH':
        logo = ETH
        break

      case 'KNC':
        logo = KNC
        break

      case 'LEND':
        logo = LEND
        break

      case 'LINK':
        logo = LINK
        break

      case 'MANA':
        logo = MANA
        break

      case 'MKR':
        logo = MKR
        break

      case 'REP':
        logo = REP
        break

      case 'SUSD':
        logo = SUSD
        break

      case 'TUSD':
        logo = TUSD
        break

      case 'USDC':
        logo = USDC
        break

      case 'USDT':
        logo = USDT
        break

      case 'WBTC':
        logo = WBTC
        break

      case 'ZRX':
        logo = ZRX
        break

      default:
        break
    }

    return logo
  }

  return (
    <img
      src={getTokenLogo()}
      alt={`${props.token} Logo`}
      width="30px"
      height="30px"
    />
  )
}

export default Token
