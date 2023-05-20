import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../auth';

const PrivateRoute = () => {
    let loggedIn = false;

    if(isLoggedIn())
    {
  return (
   <>
   {/* <div>PrivateRoute</div> */}
    <Outlet/>
   </>
    
  )
}
else{
    return(
        <Navigate to ={"/login"}></Navigate>
    )
}}

export default PrivateRoute