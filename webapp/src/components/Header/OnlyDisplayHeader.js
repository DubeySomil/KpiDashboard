import React from 'react'



function OnlyDisplayHeader(props) {

  return (

    <div>
      <li style={{ listStyleType: "none", padding: "0", overflow: "hidden", border: "#e7e7e7", backgroundColor: "#f3f3f3" }}>
        <strong>  <font size="+2" color="Purple" style={{ display: "block", color: "purple", padding: "14px 16px", textDecoration: "border" }}>{props.displayName}</font>
        </strong>
      </li>
    </div>

  )

}



export default OnlyDisplayHeader