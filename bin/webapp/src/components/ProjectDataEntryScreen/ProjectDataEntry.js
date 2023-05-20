import React from "react";
import { useState } from "react";
import OnlyDisplayHeader from "../Header/OnlyDisplayHeader";
import axios from "axios";
import DataEntryProjectDetails from "./DataEntryProjectDetails"
import DataEntryScreenTable from "../ProjectDataEntryScreen/DataEntryScreenTable"
import Header from "../Header";
import { useEffect } from "react";
function ProjectDataEntry() {
const[projectid,setprojectId] = useState(0);
  const [project, setProject] = useState('');
  const createProject = (prop) =>{
           console.log(prop)
           setprojectId(prop);
  }

 if (projectid !== 0) {
  return (
    <>
      <Header></Header>
      <OnlyDisplayHeader displayName="Select Project" />
      <div style={{ display: "flex", padding: "2%" , backgroundColor:"#ddd"}}>
        <DataEntryProjectDetails onCreate={createProject}/>
      </div>
      <DataEntryScreenTable id={projectid}></DataEntryScreenTable>
     </>
  );}
  else{
    return (
      <>
        <Header></Header>
        <OnlyDisplayHeader displayName="Select Project" />
        <div style={{ display: "flex", padding: "2%", backgroundColor:"#ddd" }}>
          <DataEntryProjectDetails onCreate={createProject}/>
        </div>
      </>
    );
  }
}

export default ProjectDataEntry;
