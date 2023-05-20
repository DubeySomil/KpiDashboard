import React from 'react'



function OnlyDisplayHeader(props) {

  return (

    <div>

      {/* <ul  style={{listStyleType: "none", padding: "0",overflow: "hidden", border:"#e7e7e7" , backgroundColor:"#f3f3f3"}}> */}


        <li style={{listStyleType: "none", padding: "0",overflow: "hidden", border:"#e7e7e7" , backgroundColor:"#f3f3f3"}}>
    <strong>  <font size="+2" color="Purple" style={{display:"block", color:"purple",padding: "14px 16px", textDecoration:"border" }}>{props.displayName}</font>
</strong>
          {/* <a style={{display:"block", color:"purple",padding: "14px 16px", textDecoration:"border" , fontSize : "20px"}}>{props.displayName}</a> */}

        </li>

      {/* </ul> */}

    </div>

  )

}



export default OnlyDisplayHeader