import React from 'react'

import Header from '../components/Header';
import axios from "axios";
import OnlyDisplayHeader from '../components/Header/OnlyDisplayHeader';
import  { useEffect, useState } from "react";
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
     
     </>
   ) 
}

export default UserDashboard