import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Header from "../Header";
import "./chartsStyle.css"
import ChartsNavBar from "./ChartsNavBar";
const ChartSearch = ({ details }) => {

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
        axios.get(`http://localhost:8080/kpi/v3/kpis/projects/${user.data.userName}`)
            .then(res => setProjects(res.data)
            )
            .catch((e) => console.log(e))
    }, [])

    const handleSelect = (e) => {
        let name = e.target.value;
        console.log("before", name);
        setProjectName(name)
        console.log("after", projectName);
        axios.get(`http://localhost:8080/kpi/v3/kpis/${name}`)
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
                <Header />
                {/* <ChartsNavBar/> */}
                {/* <OnlyDisplayHeader displayName="Charts" /> */}
                <table className="ChatsDisplayDropdownTables">
                    <tr>
                        <td>
                            <label>Select Project : </label></td>
                        <td>
                            <select className='Chartsdropdowns' onChange={handleSelect} >
                                <option >--Select Project--</option>
                                {projects && projects.map((data, index) => (
                                    <option className='dropdownsOptions' key={index} value={data.projectName} >{data.projectName}</option>
                                ))}
                            </select>
                        </td>

                        <td>
                            <label>Select KPI : </label>
                        </td>
                        <td>
                            <select className='Chartsdropdowns' onChange={(e) => setKpiName(e.target.value)} >
                                <option >--Select KPI--</option>
                                {kpis && kpis.map((data, index) => (
                                    <option className='dropdownsOptions' key={index} value={data.kpiName} >{data.kpiName}</option>
                                ))}
                            </select>
                        </td>

                        <td>
                            <label>Select Year : </label>
                        </td>
                        <td>
                            <select className='Chartsdropdowns' onChange={(e) => setYear(e.target.value)}>
                                <option>--Select Year--</option>
                                <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                                <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                                <option value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</option>
                                <option value={new Date().getFullYear() - 3}>{new Date().getFullYear() - 3}</option>
                                <option value={new Date().getFullYear() - 4}>{new Date().getFullYear() - 4}</option>
                            </select>
                        </td>
                        <td className="chartSubmitButton">
                            <button type="submit" onClick={() => HandleClick()}>Submit</button>
                        </td>
                    </tr>
                </table>
            </>
        )

    )
}

export default ChartSearch;