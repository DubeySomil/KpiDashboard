import React, { useEffect, useState } from "react";
import Records from "./SampleData2.json";
import "./TeamDetailtable.css";
import axios from "axios";

function TeamDetailtable() {
const[project,setProject] = useState([])

useEffect(()=>{
axios.get('http://localhost:8080/kpi/v3/projects')
.then((res)=>setProject(res.data))
},[])


  return (
    <div>
      <table className="innertable1">
        <tr>
          <th style={{ width: "33%" }}>ID</th>
          <th style={{ width: "33%" }}>Project Name</th>
          <th style={{ width: "33%" }}>Threshold</th>
        </tr>
      </table>

      {Records &&
        Records.map((record,index) => {
          return (
            <>
              <table className="innertable2" >
                <tr className="innertable2_tr" key={index} >
                  <td style={{ width: "33%" }}>{record.id}</td>
                  <td style={{ width: "33%" }}>{record.ProjectName}</td>
                  <td style={{ width: "33%" }}>{record.Freq}</td>
                </tr>
              </table>
            </>
          );
        })}
    </div>
  );
}

export default TeamDetailtable;
