import Header from '../Header'
import ChartsNavBar from './ChartsNavBar'
import React, { useState } from "react";
import "./Charts3.css";
import ChartsSelectProjectDropdown from './ChartsSelectProjectDropdown';
import ChartsSelectKpisDropdown from './ChartsSelectKpisDropdown';
import ChartGraph3 from './ChartGraph3';
import axios from 'axios';

function Charts3() {

    const [selectedProjects, setSelectedProjects] = useState([]);
    const [kpis, setKpis] = useState([])
    const [year, setYear] = useState();
    const [selectedKpi, setSelectedKpi] = useState([]);
    const [data, setData] = useState([])

    const details = (selectedProject) => {
        // console.log("This is selected projects : ", selectedProject);
        const projects = selectedProject.map(function (row) {
            return { name: row.value }
        })
        console.log("This is selected projects after changing: ", projects);


        const x = projects.map(object => object.name);
        console.log("updated", x);
        setSelectedProjects(x)
        if (selectedProject.length) {
            const queryParams = x.map((item) => `projectIds=${encodeURIComponent(item)}`).join('&');
            axios.get(`http://localhost:8080/kpi/v3/kpisbyProjectIds?${queryParams}`)
                .then(res => {
                    console.log("data", res.data);
                    const options = res.data.map(item => ({ value: item.id, label: item.name }));
                    console.log("options", options);
                    setKpis(options)
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setKpis([])
        }
    }



    const details2 = (selectedKpi) => {
        const KpisSet = selectedKpi.map(function (row) {
            return { name: row.value }
        })
        const z = KpisSet.map(object => object.name);
        // console.log("updated kpis", z);
        setSelectedKpi(z)
        // console.log("This is selected kpis : ", selectedKpi);
    }

    const handleClick = () => {
        console.log("this is selected projects ::", selectedProjects)
        console.log("this is selected kpis ::", selectedKpi)
        console.log("this is selected year ::", year)
        const projectIds = selectedProjects;
        const kpiIds = selectedKpi;

        const queryParams = projectIds.map((item) => `projectIds=${encodeURIComponent(item)}`).join('&');
        const queryParams1 = kpiIds.map((item) => `kpiIds=${encodeURIComponent(item)}`).join('&');
        const queryParams2 = queryParams + '&' + queryParams1;
        axios.get(`http://localhost:8080/kpi/v3/kpisbyProjectIdsAndYear/${year}?${queryParams2}`)
            .then(res => {
                // const options = res.data.map(item => ({ value: item.id, label: item.name }));
                // setProfitCenter(options);
                console.log("this is chart data : :",res.data);
                setData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    console.log("someshold", data);


    return (
        <>
            <Header></Header>
            {/* <ChartsNavBar /> */}
            <table className='Chart3SearchTable' >
                <tr >
                    <td style={{ width: "12%", fontSize: "1.5vw", fontWeight: "700", color: "purple", textAlign: "right" }}>Select projects : </td>
                    <td style={{ width: "20%" }}><ChartsSelectProjectDropdown detail={details} /></td>
                    <td style={{ width: "11%", fontSize: "1.5vw", fontWeight: "700", color: "purple", textAlign: "right", overflow: "hidden" }}>Select KPIs :</td>
                    <td style={{ width: "20%" }}><ChartsSelectKpisDropdown kpiList={kpis} detail2={details2} /></td>
                    <td style={{ width: "12%", fontSize: "1.5vw", fontWeight: "700", color: "purple", textAlign: "right" }}> <label style={{}}>Select year : </label></td>
                    <td style={{ width: "12%" }}><select className='Chartsdropdowns1' style={{
                        width: "13vw",
                        //  height: "2.8vw" 
                        height: "30px"
                        , borderRadius: "5%", border: "none"
                    }} onChange={(e) => setYear(e.target.value)}>
                        <option>Select...</option>
                        <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                        <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                        <option value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</option>
                        <option value={new Date().getFullYear() - 3}>{new Date().getFullYear() - 3}</option>
                        <option value={new Date().getFullYear() - 4}>{new Date().getFullYear() - 4}</option>
                    </select></td>

                    <td style={{ width: "8%" }}><button onClick={handleClick} className="Charts3SubmitButton" > Submit</button></td>
                </tr>
            </table>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* display graph dropdowns */}
            <ChartGraph3 details3 = {data}/>

        </>
    )
}

export default Charts3;