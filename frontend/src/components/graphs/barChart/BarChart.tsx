import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell } from "recharts"
import { XYGraphProps } from 'components/graphs';
import { COLORS } from "utils/display"


const GenericBarChart = ({ data, xkey, ykeys, width = 500, height = 300, colors = COLORS, legend = false, tooltip = true }: XYGraphProps) => {
    return (
        <BarChart width={width} height={height} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xkey} />
            <YAxis />
            {tooltip && <Tooltip />}
            {legend && <Legend />}
            {ykeys.map((ykey, i) =>
                <Bar key={i} dataKey={ykey}>
                    {data.map((_, j) => {
                        return <Cell key={j} fill={colors[j % colors.length]} />
                    })}
                </Bar>
            )}
        </BarChart>
    )
}

export default GenericBarChart