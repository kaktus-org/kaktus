import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { CurveType } from 'recharts/types/shape/Curve';
import { XYGraphProps } from 'components/graphs';
import { COLORS } from 'utils/display';

const LineGraph = ({ data, xkey, ykeys, ymax = "auto", ymin = "auto", colors = COLORS, legend, tooltip, grid, tootipTrigger = "hover", lineType = "monotone", width = 500, height = 300 }: XYGraphProps) => {

    return (
        <LineChart width={width} height={height} data={data}>
            <XAxis dataKey={xkey} />
            <YAxis domain={[ymin, ymax]} />
            {tooltip && <Tooltip trigger={tootipTrigger as 'hover' | 'click'} />}
            {legend && <Legend />}
            {grid && <CartesianGrid strokeDasharray="3 3" />}
            {ykeys.map((ykey, i) => {
                return <Line key={i} type={lineType as CurveType} dataKey={ykey} activeDot={{ r: 8 }} strokeWidth={3} stroke={colors.at(i) ?? "#358f3B"} />
            })}
        </LineChart>
    )
}

export default LineGraph