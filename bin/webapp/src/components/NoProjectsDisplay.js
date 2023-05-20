import React from 'react'

function NoProjectsDisplay() {
  return (
         <div className='Container' style={{textAlign:"center",justifyContent:"center",height:"100vh",padding:"5%"}}>
            <div className='box' style={{margin: "0 auto",textAlign:"center",justifyContent:"center",border:"Solid 2px black",height:"55vh",boxSizing:"border-box",padding:"10%",width:"50vw"}}>
                <h2 style={{ color:"#341C12",fontStyle:"italic",fontWeight:"bold"}}>No Projects To Display </h2>
                <h3 style={{color:"#341c12",fontStyle:"italic",fontWeight:"bold"}}><a style={{color:" #8ebf42",textDecoration:"none"}} href='/PrivateRoute/AddProject'>Add Projects</a > To get Started</h3>
            </div>
         </div>
  )
}

export default NoProjectsDisplay