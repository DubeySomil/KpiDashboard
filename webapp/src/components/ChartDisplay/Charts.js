import ChartSearch from "./ChartSearch";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ChartsGraph from "./ChartGraph";
import Charts3 from "./Charts3";


const Charts = () => {
    const [status, setStatus] = useState('')
    const [status2, setStatus2] = useState('')

    const [projectName, setProjectName] = useState('')
    const [kpiName, setKpiName] = useState('');
    const [year, setYear] = useState();

    const [data, setData] = useState([{
        "month": "",
        "kpi": parseInt(""),
        "threshold": parseInt("")
    }])


    async function getData(kpiName, projectName, year) {
        if (Object.keys(projectName).length > 0 && Object.keys(kpiName).length > 0 && Object.keys(year).length > 0) {
            setStatus('1')
            axios.get(`http://localhost:8080/kpi/v3/kpis/${projectName}/${kpiName}/${year}`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data)
                    setStatus2('1')
                }
                )
                .catch((e) => console.log(e))
        }
    }

    const details = (project, kpi, year) => {
        setProjectName(project);
        setKpiName(kpi)
        setYear(year)
    }

    useEffect(() => {

        getData(kpiName, projectName, year);

    }, [kpiName, projectName, year]);


    return (<>
        <div>

            <Charts3/>
            {/* {(() => {
                if (status === '1' && status2 === '1') {
                    return (
                        
                        <ChartsGraph graphData={data} />
                    )
                }
            })()} */}
        </div>
        </>
    )
}

export default Charts;