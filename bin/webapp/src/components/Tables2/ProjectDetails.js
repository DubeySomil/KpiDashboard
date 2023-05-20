
 import axios from 'axios';
 import  { useState } from 'react'
 import { useEffect } from 'react';
import { Table } from 'reactstrap';
import React from "react";

 import { useForm } from "react-hook-form";
 import { Input } from "reactstrap";

function ProjectDetails() {

  const [category,setCategory] = useState([]); 
    // const[kpi,setKpi] = useState({
    
    //     kpiName: "",
    //     kpithreshold: ''
    //   })
  useEffect(()=>{
  const getCategory = async () =>{
    const res = await axios.get('http://localhost:8080/kpi/v4/kpis')
    
    setCategory(res.data);
    
    console.log(category);
  }
  getCategory();
  },[])

     useEffect(()=>{
           const getCategory = async () =>{
             const res =  await axios.get('http://localhost:8080/kpi/v4/kpis')
              
              setCategory(res.data);
           }
           getCategory();
           },[])

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
   const arrv= []
   const arr= Object.values(data)
   arr.map(index =>{
    if(index.kpiName !== false){
        arrv.push(index);
    }
   })
   console.log("this is the required array",arrv);
   console.log("jio")
  };

  const arrString = ['OTD','DDBD','DDAD','Sprint Velocity Compliance','BurndownChart','Sprint Burnup Chart','Sprint Predictability','Release Defect Density','Team Stability5','Right First Time Right','NDDB','NDAD','Renegociated on-time Delivery','Number Of Delivery','On-time Critical Doc','Number of defects between M9 and  M11','Number of defects between M11 and M14'];

  return (

    <form onSubmit={handleSubmit(onSubmit)}> 
      {arrString.map(index => {
      const fieldName = `[${index}]`;
       return (
           <fieldset name={fieldName} key={fieldName}>
             <label>
                  {index}:
            <input
              type="checkbox"
              value={index}
              {...register(`${fieldName}.kpiName` )}
            />
              </label> 
                 <label>
                     Threshold
                 <input
                      type="number"
                      name={`${fieldName}.lastName`}
                      {...register(`${fieldName}.threshold` )}
                 />
                  </label>
                   </fieldset>
                );
                })}
              <input type="submit" />
            </form>
            );
    }
export default ProjectDetails;