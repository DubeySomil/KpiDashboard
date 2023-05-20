import ChartSearch2 from "./ChartSearch2";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ChartGraph2 from "./ChartGraph2";


const Charts2 = () => {
    const [status3, setStatus3] = useState('')
    const [status4, setStatus4] = useState('')

    const [projectName, setProjectName] = useState('')
    const [year, setYear] = useState();

    const [data, setData] = useState([{
        "month": "",
        "kpi": parseInt(""),
        "threshold": parseInt("")
    }])


    async function getData(projectName, year) {
        if (Object.keys(projectName).length > 0 && Object.keys(year).length > 0) {
            setStatus3('1')
            axios.get(`http://localhost:8080/kpi/v3/kpis/${projectName}/${year}`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data)
                    setStatus4('1')
                }
                )
                .catch((e) => console.log(e))
        }
    }

    const details = (project, year) => {
        setProjectName(project);
        setYear(year)
    }

    useEffect(() => {

        getData(projectName, year);

    }, [projectName, year]);


    return (
        <div>
    
            <ChartSearch2 details={details} />
            {(() => {
                if (status3 === '1' && status4 === '1') {
                    return (
                        
                        <ChartGraph2 graphData={data} />
                    )
                }
            })()}
        </div>
    )
}

export default Charts2;