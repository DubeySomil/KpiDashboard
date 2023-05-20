import React, { useEffect, useState } from "react";
import Records from "./SampleData2.json";
import "./TeamDetailtable.css";
import axios from "axios";
import { set } from "react-hook-form";

function TeamDetailtable2() {

const[Projects,setProjects] = useState([])

useEffect(()=>{
  let user = JSON.parse(sessionStorage.getItem("data"))
  
 axios.get(`http://localhost:8080/kpi/v3/project/${user.data.userName}`)
 .then(res=>setProjects(res.data))
 .catch((e)=>console.log(e))
},[])

const HandleClick = (data)=>{
  console.log(data)
}


  return (
    <>
      <table className="Teamdetail_FullTable">
        <thead className="teamdetail_thead">
          <tr>
          {/* <th scope="col">S.no</th> */}
            {/* <th scope="col" name="projectid">Project ID</th> */}
            <th scope="col" name="projectname">Project Name</th>
            <th scope="col">Project DU</th>
            <th scope="col">Project BU</th>
            <th scope="col">Project Bundle</th>
          </tr>
        </thead>
        <tbody className="teamdetail_tbody">
          {Projects &&
            Projects.map((record, index) => (
              <tr key={index} onClick={()=>HandleClick(record)}>
                {/* <td >{record.projectID}</td> */}
                <td >{record.projectName}</td>
                <td >{record.projectDU}</td>
                <td >{record.projectBU}</td>
                <td >{record.projectBundle}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default TeamDetailtable2;
