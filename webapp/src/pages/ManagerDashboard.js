import React from 'react'

import Header from '../components/Header';
import axios from "axios";
import OnlyDisplayHeader from '../components/Header/OnlyDisplayHeader';
import { useEffect, useState } from "react";
// import TeamDetailtable from '../Tables/TeamDetailtable';
import TeamDetailtable2 from '../Tables/TeamDetailtable2';



const ManagerDashboard = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let id = JSON.parse(sessionStorage.getItem("data"))

    axios.get(`http://localhost:8080/kpi/v3/kpis/projects/${id.data.userName}`)
      .then(res => setProjects(res.data))
      .catch((e) => console.log(e))
  }, [])


  return (
    <>
      <Header />
      <OnlyDisplayHeader displayName="Managed Projects" />
      <TeamDetailtable2 />
      
     
    </>
  )


}

export default ManagerDashboard