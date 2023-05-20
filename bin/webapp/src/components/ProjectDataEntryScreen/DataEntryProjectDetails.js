import { useEffect, useState } from "react";
import SearchProject from "./DataEntryScreenSearchBar";
import axios from 'axios'
import { Label } from "reactstrap";
import "./DataEntryProjectDetail.css"
const DataEntryProjectDetails = ({onCreate}) => {
 const[DI,setDI]=useState();
 const[Methodology,setMethodology]=useState('');
 const[Frequency,setFrequency]=useState('');
const [projects,setProjects] = useState([{
    "projectId": '',
    "projectName": '',
    "projectType" : '',
    "projectDU": '',
    "projectBU": ''         
}])
const[projectData,setProjectData]=useState({
    "projectDI":'',
    "projectMethodology":'',
    "projectFrequency":''
})
useEffect(()=>{
    let user = JSON.parse(sessionStorage.getItem("data"))
    axios.get(`http://localhost:8080/kpi/v3/project/${user.data.userName}`)
    .then(res=> setProjects(res.data)     
    )
    .catch((e)=>console.log(e))
 },[]) 

const[projectId,setProjectId] = useState()

const retreiveProjectDetails = (ID) => {
    axios.get(`http://localhost:8080/kpi/v3/projects/${ID}`)
    .then(res=>{//console.log(res); 
                setProjectData(res.data)
            setProjectId(res.data.projectID)
            onCreate(ID)
    }
        )
    .catch((e)=>console.log(e))

  }
  const handleSelect =(e) => {
    e.preventDefault();
    let ID = e.target.value;
   // console.log(ID)
    retreiveProjectDetails(parseInt(ID));
   }

return (
        <>
         <div style={{marginLeft:"1%" , marginRight:"3%" , backgroundColor:"#ddd" , width:"20%"}}>
            <select className='dropdownss' onChange={(e)=>handleSelect(e)} style={{ width:"100%" ,height:"30%",marginRight:"3%" , backgroundColor:"#ddd"}}>
            <option disabled selected > <b>--Select Project--</b></option>
                { projects && projects.map((data,index)=>(
                <option className='dropdownsOptions' key={index} value={data.projectID} ><b>{data.projectName}</b></option>
                ))}
            </select>
        </div>

                <div className='readOnlyInputs' >
                <div  className='readOnlyInputsDiv' >
                <label >
                   <b >DI Responsible:</b> 
                </label>
                    <input type="text" name="name" readOnly value={projectData.projectDI} />
                   </div>
                   
                    <div className='readOnlyInputsDiv'>
                <label>
                   <b>Methodology:</b> 
                </label>
                    <input type="text"  name="name"  readOnly value={projectData.projectMethodology}/>
                </div>

                <div className='readOnlyInputsDiv'>
                <label >
                   <b>Frequency:</b> 
                </label>
                    <input type="text" name="name" readOnly value={projectData.projectFrequency}/>
                </div></div>
        </>
       
   
    )
}

export default DataEntryProjectDetails;