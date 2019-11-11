import React from 'react'
import { Chart, Geom, Axis, Tooltip, Label, Shape } from 'bizcharts'

// Components
import Tokens from '../../../core/tokens'

// Types
import { TokenReserve } from '../../../types'

interface Props {
  tokenReserves: TokenReserve[]
}

class BubbleImage extends React.Component<Props> {
  render() {
    const { tokenReserves } = this.props

    // @ts-ignore
    Shape.registerShape('point', 'image', {
      drawShape: function(cfg, container) {
        // @ts-ignore
        cfg.points = this.parsePoints(cfg.points)
        // @ts-ignore
        const coord = this._coord
        container.addShape('line', {
          attrs: {
            x1: cfg.points[0].x,
            y1: cfg.points[0].y,
            x2: cfg.points[0].x,
            y2: coord.start.y,
            stroke: '#ccc',
            lineWidth: 1,
            lineDash: [4, 2]
          }
        })

        return container.addShape('image', {
          attrs: {
            x: cfg.points[0].x - (12 * cfg.size) / 2,
            y: cfg.points[0].y - 12 * cfg.size,
            width: 12 * cfg.size,
            height: 12 * cfg.size,
            img: cfg.shape[1]
          }
        })
      }
    })

    const data = tokenReserves.map(tr => {
      return {
        name: tr.symbol,
        value: tr.transactionCount
      }
    })

    const cols = {
      value: {
        nice: false,
        min: 0,
        // @ts-ignore
        max: Math.max(...data.map(o => o.value), 0) + 20
      }
    }

    return (
      <div>
        <Chart
          height={500}
          data={data}
          padding={[0, 0, 90, 0]}
          scale={cols}
          forceFit
        >
          <Axis name="name" />
          <Axis name="value" visible={false} />
          <Tooltip />
          <Geom
            type="point"
            position="name*value"
            color="name"
            // @ts-ignore
            shape={['name', name => ['image', Tokens[name]]]}
            size={2.4}
            style={{
              stroke: '#fff',
              lineWidth: 1,
              fillOpacity: 1
            }}
          >
            <Label
              content="value"
              offset={-20}
              textStyle={{
                fontSize: 12
              }}
            />
          </Geom>
        </Chart>
      </div>
    )
  }
}

export default BubbleImage
