import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const ChartSearch = ({details}) => {

    const [projects, setProjects] = useState([{
        "projectID": '',
        "projectName": '',
        "projectType": '',
        "projectDU": '',
        "projectBU": ''
    }])
    const [kpis, setKpis] = useState([{
        "kpiId": "",
        "kpiName": ""
    }])

    const [projectName, setProjectName] = useState('')
    const [kpiName, setKpiName] = useState('');
    const [year, setYear] = useState();

    useEffect(() => {

        let user = JSON.parse(sessionStorage.getItem("data"))
        axios.get(`http://localhost:8080/kpi/v3/project/${user.data.userName}`)
            .then(res => setProjects(res.data)
            )
            .catch((e) => console.log(e))
    }, [])

    const handleSelect = (e) => {
        const name = e.target.value;
        setProjectName(name)
        axios.get(`http://localhost:8080/kpi/v3/kpis/1`)
            .then(res => {
                console.log(res.data.kpis)
                setKpis(res.data.kpis)
            })
            .catch((e) => console.log(e))
    }

    const HandleClick = () => {
        details(projectName, kpiName, year);
    }

    return (
        (
            <>
                    <div style={{ marginLeft: "1%", marginRight: "3%", backgroundColor: "#ddd", width: "20%" }}>
                        <select className='dropdownss' onChange={handleSelect} style={{ width: "100%", height: "30%", marginRight: "3%", backgroundColor: "#ddd" }}>
                            <option >Select Project</option>
                            {projects && projects.map((data, index) => (
                                <option className='dropdownsOptions' key={index} value={data.projectName} >{data.projectName}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ marginLeft: "1%", marginRight: "3%", backgroundColor: "#ddd", width: "20%" }}>
                        <select className='dropdownss' onChange={(e) => setKpiName(e.target.value)} style={{ width: "100%", height: "30%", marginRight: "3%", backgroundColor: "#ddd" }}>
                            <option >Select KPI</option>
                            {kpis && kpis.map((data, index) => (
                                <option className='dropdownsOptions' key={index} value={data.kpiName} >{data.kpiName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select style={{ backgroundColor: "rgb(243, 243, 243)", margin: "20px", borderRadius: "10px", minWidth: "100px", textAlign: "center", minHeight: "40px", }} onChange={(e) => setYear(e.target.value)}>
                            <option>Select Year</option>
                            <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                            <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                            <option value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</option>
                            <option value={new Date().getFullYear() - 3}>{new Date().getFullYear() - 3}</option>
                            <option value={new Date().getFullYear() - 4}>{new Date().getFullYear() - 4}</option>
                        </select>
                    </div>
                    <button type="submit" onClick={() => HandleClick()}>Submit</button>
            </>
        )

    )
}

export default ChartSearch;