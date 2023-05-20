import React from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import axios from "axios";
import OnlyDisplayHeader from '../components/Header/OnlyDisplayHeader';
import  { useEffect, useState } from "react";
// import TeamDetailtable from '../Tables/TeamDetailtable';
import TeamDetailtable2 from '../Tables/TeamDetailtable2';
import NoProjectsDisplay from '../components/NoProjectsDisplay';
import UserTable from '../Tables/UserTable';

const UserDashboard = () =>{
  const[users,setUsers] = useState([])

 useEffect(()=>{ 
  axios.get("http://localhost:8080/kpi/v1/users")
  .then(res=>setUsers(res.data))
  .catch((e)=>console.log(e))
 },[])
  return (
    <>
     <Header ></Header>  
     <OnlyDisplayHeader displayName="Users"/>
     <UserTable />
     <br />
     <br />
     <Footer></Footer>
     </>
   ) 
}

export default UserDashboard