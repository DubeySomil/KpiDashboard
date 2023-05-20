import React from "react";
import Header from "../components/Header";
import OnlyDisplayHeader from "../components/Header/OnlyDisplayHeader";
import ProjectDetailsCapture from "../components/Tables2/ProjectDetailsCapture"


function AddProject() {
  return (
    <>
    <Header name=""></Header>
      <OnlyDisplayHeader displayName="Add Project"/>
      <ProjectDetailsCapture></ProjectDetailsCapture>
    </>
  );
}

export default AddProject;
