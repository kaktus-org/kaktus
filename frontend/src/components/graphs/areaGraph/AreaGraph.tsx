import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend } from 'recharts'
import { DataKey } from 'recharts/types/util/types'
import { XYGraphProps } from 'components/graphs';
import { COLORS } from 'utils/display'
import { CurveType } from 'recharts/types/shape/Curve';


const AreaGraph = ({ data, xkey, ykeys, width = 500, height = 300, tooltip = true, legend = true, grid = true, lineType = "monotone", colors = COLORS }: XYGraphProps) => {
    return (
        <AreaChart width={width} height={height} data={data}>
            <XAxis dataKey={xkey} />
            <YAxis />
            {grid && <CartesianGrid strokeDasharray="3 3" />}
            {tooltip && <Tooltip />}
            {legend && <Legend />}
            {ykeys.map((value, i) =>
                <Area key={i}
                    type={lineType as CurveType}
                    dataKey={value as DataKey<any>}
                    stackId="1"
                    activeDot={{ r: 8 }}
                    stroke={colors[i % colors.length] ?? "#358f3B"}
                    fill={colors[i % colors.length] ?? "#8884d8"} />
            )}
        </AreaChart>
    )
}

export default AreaGraph