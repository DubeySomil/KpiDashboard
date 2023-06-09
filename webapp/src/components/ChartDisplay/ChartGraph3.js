import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e'

, '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

export default function ChartGraph3({ details3 }) {
  
  const keys = details3.kpis && details3.kpis.length > 0 ? Object.keys(details3.kpis[0]).filter(key => key !== 'Month') : [];

  return (
    <LineChart  width={1250} height={400} data={details3.kpis} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Month" />
      <YAxis />
      <Tooltip />
      <Legend />
      {keys.map((key,index) => (
        <Line type="monotone" dataKey={key}  stroke={colors[index % colors.length]} activeDot={{ r: 2 }} />
      ))}
    </LineChart>
  );
}
