import ChartSearch from "../components/ChartDisplay/ChartSearch";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ChartsGraph from "../components/ChartDisplay/ChartsGraph";


const Chart = () => {
    const [status, setStatus] = useState('')

    const [projectName, setProjectName] = useState('')
    const [kpiName, setKpiName] = useState('');
    const [year, setYear] = useState();

    const [data, setData] = useState([{
        "month": "",
        "kpi": parseInt(""),
        "threshold": parseInt("")
    }])

    const details = (project, kpi, year) => {
        setProjectName(project);
        setKpiName(kpi)
        setYear(year)
    }

    useEffect(() => {
        if (Object.keys(projectName).length > 0 && Object.keys(kpiName).length > 0 && Object.keys(year).length > 0) {
            setStatus('1')
            axios.get(`http://localhost:8080/kpi/v3/kpis/${projectName}/${kpiName}/${year}`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data)
                }
                )
                .catch((e) => console.log(e))
        }
    }, [kpiName, projectName, year]);


    return (
        <div>
            <ChartSearch details={details} />
            {(() => {
                if (status === '1') {
                    return (
                        <ChartsGraph graphData={data} />
                    )
                }
            })()}
        </div>
    )
}

export default Chart;