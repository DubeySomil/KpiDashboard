import React from 'react'

function Assign() {
    const AssignToProject = () =>{
        console.log("button is workign")
    }
  return (
    <button onClick={AssignToProject}>Assign</button>
  )
}

export default Assign