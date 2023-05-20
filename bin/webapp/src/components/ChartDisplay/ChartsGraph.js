import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend} from "recharts";

const ChartsGraph = ({graphData}) => {
    return (
        <ResponsiveContainer width="80%" aspect={3}>
            <LineChart data={graphData.kpis}>
            <XAxis dataKey="month"/>
            <YAxis />
            <Tooltip />
            <Legend />
                <Line dataKey="kpi" stroke="blue" activeDot={{r:2}}/>
                <Line dataKey="threshold" stroke="orange" activeDot={{r:2}}/>
            </LineChart>
        </ResponsiveContainer>
    )
}

export default ChartsGraph;