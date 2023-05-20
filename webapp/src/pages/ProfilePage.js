import React from 'react'
import UserProfile from './UserProfile'
import Header from '../components/Header';
import axios from "axios";
import  { useEffect} from "react";

function ProfilePage() {
    useEffect(()=>{
        let id =JSON.parse(sessionStorage.getItem("data"))
        
        axios.get(`http://localhost:8080/kpi/v3/project/${id.data.userName}`)
        .then(res=>console.log(res.data))
        .catch((e)=>console.log(e))
       },[])
       return (
        <>
            <Header></Header>
           <UserProfile></UserProfile> 
            
          </>
      )
}

export default ProfilePage;