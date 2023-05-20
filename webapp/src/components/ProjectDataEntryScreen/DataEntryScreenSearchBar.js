import axios from "axios";
import { useEffect, useState } from 'react';
import "./DataEntryScreenSearchBarStyle.css"

const DataEntryScreenSearchBar= ({onSubmit}) => {


    const [projects,setProjects] = useState([{
        "projectId": '',
        "projectName": '',
        "projectType" : '',
        "projectDU": '',
        "projectBU": ''         
    }])
    useEffect(()=>{
       axios.get("http://localhost:8080/kpi/v3/projects")
       .then(res=> setProjects(res.data))
       .catch((e)=>console.log(e))
    },[]) 
    
    const handleSelect = (event) => {
        
        onSubmit(event.target.value);
    }

    return (
        <>
        <div style={{marginLeft:"1%" , marginRight:"1%"}}>
            
            <select className='dropdownss' onChange={handleSelect}>
                { projects && projects.map((data,index)=>(
                    console.log(data.projectName),
                <option className='dropdownsOptions'  >{data.projectName}</option>
                ))}
            </select>
        </div>
        
        </>
    
        
    )
}


export default DataEntryScreenSearchBar