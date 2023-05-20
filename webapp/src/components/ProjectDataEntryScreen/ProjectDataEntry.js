import React from "react";
import { useState } from "react";
import OnlyDisplayHeader from "../Header/OnlyDisplayHeader";
import DataEntryProjectDetails from "./DataEntryProjectDetails"
import DataEntryScreenTable3 from "../ProjectDataEntryScreen/DataEntryScreenTable3"
import Header from "../Header";
import { useLocation } from "react-router-dom";
import TestDataEntryProjectDetails from "./TestDataEntryProjectDetails";


function ProjectDataEntry() {
  const location = useLocation();
const[projectid,setprojectId] = useState(0);

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
        {/* <DataEntryProjectDetails onCreate={createProject}/> */}
      <TestDataEntryProjectDetails onCreate={createProject}/>
      </div>



      {/* <DataEntryScreenTable3 id={projectid}></DataEntryScreenTable3> */}

      <DataEntryScreenTable3 id={projectid}></DataEntryScreenTable3>
     </>
  );}
  else{   
    return (
      <>
        <Header></Header>
        <OnlyDisplayHeader displayName="Select Project" />
        <div style={{ display: "flex", padding: "2%", backgroundColor:"#ddd" }}>
        {/* <DataEntryProjectDetails data={location.state} onCreate={createProject}/> */}
        <TestDataEntryProjectDetails data={location.state} onCreate={createProject}/>
        </div>
      </>
    );
  }
}

export default ProjectDataEntry;
