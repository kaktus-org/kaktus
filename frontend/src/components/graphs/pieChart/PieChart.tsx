import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { PieGraphProps } from 'components/graphs';
import { COLORS } from 'utils/display';


const GenericPieChart = ({ data, nameKey, dataKey, width = 500, height = 300, outerRadius = 100, colors = COLORS, legend = true, tooltip = true }: PieGraphProps) => {

    return (
        <PieChart width={width} height={height}>
            <Pie data={data} dataKey={dataKey} nameKey={nameKey} outerRadius={outerRadius} label >
                {data.map((_, i) => {
                    return <Cell key={i} fill={colors[i % colors.length]} />
                })}
            </Pie>
            {legend && <Legend />}
            {tooltip && <Tooltip />}
        </PieChart>
    )
}

export default GenericPieChart