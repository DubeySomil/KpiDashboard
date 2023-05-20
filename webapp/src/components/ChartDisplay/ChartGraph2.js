import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, } from "recharts";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import React, { useState } from "react";
import randomColor from "randomcolor";
import "./chartsStyle.css";

const ChartsGraph2 = ({ graphData }) => {
    const data = graphData.kpis.map(kpi => {
        return {
            month: kpi.month,
            ...kpi.values,
        }
    })

    const [activeLines, setActiveLines] = useState([]);
    const handleLinesChange = (newLine) => {
        if (activeLines.includes(newLine)) {
            setActiveLines(activeLines.filter((line) => line !== newLine));
        } else {
            setActiveLines([...activeLines, newLine]);
        }
    };

    return (
        <div className="chartcontainer" >
            <LineChart
                className="line_chart"
                width={1000}
                height={500}
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid stroke="#f5f5f5" />
                <Tooltip />
                {activeLines.map((val) => (
                    <Line
                        className="recharts-line"
                        key={val}
                        dataKey={val}
                        stroke={randomColor()}
                        activeDot={{ r: 2 }}
                    />
                ))}
            </LineChart>
            <ButtonGroup>
                {Object.keys(graphData.kpis[0].values).map((val) => (
                    <ToggleButton
                        className="toggle-button"
                        key={val}
                        value={val}
                        onClick={() => handleLinesChange(val)}
                        active={activeLines.includes(val)}
                    >
                        {val}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    );
}

export default ChartsGraph2;


