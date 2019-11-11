import React from 'react'
import { Chart, Geom, Axis, Tooltip } from 'bizcharts'

// Components
import Tokens from '../../../core/tokens'

// Types
import { TokenReserve } from '../../../types'

interface Props {
  tokenReserves: TokenReserve[]
}

class ColumnImage extends React.Component<Props> {
  render() {
    const { tokenReserves } = this.props
    const colors: string[] = []

    const data = tokenReserves
      .map(tr => {
        colors.push(tr.uiColor)

        return {
          name: tr.symbol,
          value: (
            parseFloat(tr.availableLiquidity) * parseFloat(tr.priceInUsd)
          ).toFixed(0)
        }
      })
      .sort((a, b) => Number(a.value) - Number(b.value))

    console.log(data)

    const scale = {
      value: {
        min: 0
      }
    }

    return (
      <div>
        <Chart
          height={500}
          data={data}
          padding={[0, 0, 90, 0]}
          scale={scale}
          forceFit
        >
          <Axis
            name="value"
            // @ts-ignore
            labels={null}
            title={null}
            line={null}
            tickLine={null}
          />
          <Geom
            type="interval"
            position="name*value"
            color={['name', colors]}
          />
          <Tooltip />
          <Geom
            type="point"
            position="name*value"
            size={2.4}
            // @ts-ignore
            shape={['name', name => ['image', Tokens[name]]]}
          />
        </Chart>
      </div>
    )
  }
}

export default ColumnImage
