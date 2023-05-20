import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Header from "../Header";
import "./chartsStyle.css"
import ChartsNavBar from "./ChartsNavBar";
const ChartSearch2 = ({ details }) => {

    const [projects, setProjects] = useState([{
        "projectID": '',
        "projectName": '',
        "projectType": '',
        "projectDU": '',
        "projectBU": ''
    }])

    const [projectName, setProjectName] = useState('')
    const [year, setYear] = useState();

    useEffect(() => {

        let user = JSON.parse(sessionStorage.getItem("data"))
        axios.get(`http://localhost:8080/kpi/v3/project/${user.data.userName}`)
            .then(res => setProjects(res.data)
            )
            .catch((e) => console.log(e))
    }, [])

    const handleSelect = (e) => {
        let name = e.target.value;
        console.log("before", name);
        setProjectName(name)
        console.log("after", projectName);
    }

    const HandleClick = () => {
        details(projectName, year);
    }

    return (
        (
            <>
                <Header />
                {/* <ChartsNavBar /> */}
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

export default ChartSearch2;