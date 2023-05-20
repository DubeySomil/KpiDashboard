import React, { useEffect, useState } from "react";
import Records from "./SampleData2.json";
import "./TeamDetailtable.css";
import axios from "axios";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

function TeamDetailtable2() {
  const [spinner, setSpinner] = useState(false)
const[Projects,setProjects] = useState([])
const navigate = useNavigate()
useEffect(()=>{
  let user = JSON.parse(sessionStorage.getItem("data"))
  setSpinner(true)
 axios.get(`http://localhost:8080/kpi/v3/kpis/projects/${user.data.userName}`)
 .then(res=>
   {
    setSpinner(false)
    console.log(res.data)
    setProjects(res.data)
  })
 .catch((e)=>console.log(e))
},[])

const HandleClick = (data)=>{
  console.log(data)
   navigate('/PrivateRoute/ProjectDataEntry',{state:data})
}


  return (
    <>
    {spinner && (
      <>
       <table className="Teamdetail_FullTable">
       <thead className="teamdetail_thead">
         <tr>
         {/* <th scope="col">S.no</th> */}
           {/* <th scope="col" name="projectid">Project ID</th> */}
           <th scope="col" name="projectname">Project Name</th>
           <th scope="col">Project DU</th>
           <th scope="col">Profit Centre</th>
           <th scope="col">Project Client</th>
           <th scope="col">DI Responsible</th>
           <th scope="col">Project Methodology</th>
           <th scope="col">Project Frequency</th>
           <th scope="col">Project Type</th>

         </tr>
       </thead>
       </table>
       <div style={{ zindex: "22", margin: "10% auto", textAlign: "center", justifyContent: "center" }}>
       <h3>Loading...</h3>
       <Spinner animation="grow" style={{ zIndex: "22", fontSize: "50px", margin: "auto" }}></Spinner>
       {/* <ToastContainer
         position="top-center"
         autoClose={1000}
         hideProgressBar={true}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="dark" /> */}
     </div>
     </>
    )}
    {!spinner && (
      <table className="Teamdetail_FullTable">
        <thead className="teamdetail_thead">
          <tr>
          {/* <th scope="col">S.no</th> */}
            {/* <th scope="col" name="projectid">Project ID</th> */}
            <th scope="col" name="projectname">Project Name</th>
            <th scope="col">Project DU</th>
            <th scope="col">Profit Centre</th>
            <th scope="col">Project Client</th>
            <th scope="col">DI Responsible</th>
            <th scope="col">Project Methodology</th>
            <th scope="col">Project Frequency</th>
            <th scope="col">Project Type</th>

          </tr>
        </thead>
        <tbody className="teamdetail_tbody">
          {Projects &&
            Projects.map((record, index) => (
              <tr key={index} onClick={()=>HandleClick(record)}>
                {/* <td >{record.projectID}</td> */}
                <td style={{textAlign:"left",fontWeight:"bold"}}>{record.projectName}</td>
                <td style={{textAlign:"center",fontWeight:"bold"}}>{record.projectDU}</td>
                <td style={{textAlign:"center",fontWeight:"bold"}}>{record.projectProfitCenter}</td>
                <td style={{textAlign:"center",fontWeight:"bold"}}>{record.projectClient}</td>
                <td style={{textAlign:"center",fontWeight:"bold"}}>{record.projectDI}</td>
                <td style={{textAlign:"center",fontWeight:"bold"}}>{record.projectMethodology}</td>
                <td style={{textAlign:"center",fontWeight:"bold"}}>{record.projectFrequency}</td>
                <td style={{textAlign:"center",fontWeight:"bold"}}>{record.projectType}</td>


              </tr>
            ))}
        </tbody>
      </table>
    )}
    </>
  );
}

export default TeamDetailtable2;
