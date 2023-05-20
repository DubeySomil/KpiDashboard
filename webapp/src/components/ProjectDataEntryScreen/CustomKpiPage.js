import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Form, Table } from "reactstrap";
import { useForm } from "react-hook-form";
import { Input } from "reactstrap";
import { Navigate, useNavigate } from "react-router-dom";
import "./DataEntryScreenTableStyle.css";
import OnlyDisplayHeader from "../Header/OnlyDisplayHeader";

function CustomKpiPage({custom}) {
   
    const[customKpiList,setCustomKpiList] = useState([{
        customKpiId: 0,
        customKpiName: null,
        customKpiThreshold:null,
        month:{
          january: 0,
          february: 0,
          march: 0,
          april: 0,
          may: 0,
          june: 0,
          july: 0,
          august: 0,
          september: 0,
          october: 0,
          november: 0,
          december: 0
        }
    }])
    // useEffect({
    //      setCustomKpiList(custom)
    // },[])
    const { register, handleSubmit,errors,reset } = useForm([{defaultValues:customKpiList}]);
    const onSubmit =  (data) => {
        console.log(data)
          //   let projectId = parseInt(id) 
          //   const kpi1  = Object.values(data);
          //    const kpis = kpi1[0]
          // kpis.map((index)=>{
          //   {
          //         if (index.january==="") {
          //           index.january = -1;
          //         }
          //         if (index.february==="") {
          //           index.february = -1;
          //         }
          //         if (index.march==="") {
          //           index.march = -1;
          //         }
          //         if (index.april==="") {
          //           index.april= -1;
          //         }
          //         if (index.may==="") {
          //           index.may = -1;
          //         }
          //         if (index.june==="") {
          //           index.june = -1;
          //         }
          //         if (index.july==="") {
          //           index.july = -1;
          //         }
          //         if (index.august==="") {
          //           index.august = -1;
          //         }
          //         if (index.september==="") {
          //           index.september = -1;
          //         }
          //         if (index.october==="") {
          //           index.october = -1;
          //         }
          //         if (index.november==="") {
          //           index.november = -1;
          //         }
          //         if (index.december==="") {
          //           index.december = -1;
          //         }
          //   }
          //   console.log(kpis)
          // })
        
          // axios.post("http://localhost:8080/kpi/v3/update", {
          //   projectId,
          //   year,
          //   kpis
          // }).then(
          //   alert("Project Details updated"))
          //   .catch((e) => console.log(e))
          //   navigate("/PrivateRoute/ManagerDashboard")
        };
    
  return (
    <>
    <h2>Custom KPI'S</h2>
    <table className="headingOfDataEntryScreen" style={{ overflow: "auto" }}>
<tr>
  <th className="headingKpiName">KPI Name</th>
  <th className="headingThreshold">Threshold</th>
  <th style={{ textAlign: "center" }}>Jan</th>
  <th style={{ textAlign: "center" }}>Feb</th>
  <th style={{ textAlign: "center" }}>Mar</th>
  <th style={{ textAlign: "center" }}>Apr</th>
  <th style={{ textAlign: "center" }}>May</th>
  <th style={{ textAlign: "center" }}>Jun</th>
  <th style={{ textAlign: "center" }}>Jul</th>
  <th style={{ textAlign: "center" }}>Aug</th>
  <th style={{ textAlign: "center" }}>Sep</th>
  <th style={{ textAlign: "center" }}>Oct</th>
  <th style={{ textAlign: "center" }}>Nov</th>
  <th style={{ textAlign: "center" }}>Dec</th>
</tr>
</table>

<form onSubmit={handleSubmit(onSubmit)}>      
{custom.map((data, index) => {
  let fieldName = `customKpi[${index}]`;
  return (
    <fieldset name={fieldName} key={fieldName}>
      <table className="TableOfDataEntryScreen" style={{width: "100%",border: "none" }}>
        <tbody>
        <tr key={index}>
          <td className="kpiNameValue"  name={`${fieldName}.customKpiName`} ><input  type="text"   value={data.kpiName}   {...register(`${fieldName}.customKpiName`)}></input></td>
          {/* Threshold */}
          <td className="thresholdNameValue"  name={`${fieldName}.customKpiThreshold`}  ><input  type="number"  value={data.kpiThreshold}       {...register(`${fieldName}.customKpiThreshold`)}></input> </td>
          <td className="yearValue">
            <input type="number"   placeholder={data.month.january}   name= {`${fieldName}.january`}  {...register(`${fieldName}.january`)}/>
          </td>
          <td className="yearValue"   >
            <input type="number"     placeholder={data.month.february} name={`${fieldName}.february`} {...register(`${fieldName}.february`)}/>
          </td>
          <td className="yearValue">
            <input type="number" placeholder={data.month.march} name={`${fieldName}.march`} {...register(`${fieldName}.march`)}/>
          </td>
          <td className="yearValue" style={{ textAlign: "center", border: "none" }} >
            <input type="number" placeholder={data.month.april} name={`${fieldName}.april`} {...register(`${fieldName}.april`)}/>
          </td>
          <td className="yearValue">
            <input type="number"  placeholder={data.month.may} name={`${fieldName}.may`} {...register(`${fieldName}.may`)}/>
          </td>
          <td className="yearValue">
            <input type="number"  placeholder={data.month.june} name={`${fieldName}.june`} {...register(`${fieldName}.june`)}/>
          </td>
          <td className="yearValue">
            <input type="number"  placeholder={data.month.july} name={`${fieldName}.july`} {...register(`${fieldName}.july`)}/>
          </td>
          <td className="yearValue">
            <input type="number"  placeholder={data.month.august} name={`${fieldName}.august`} {...register(`${fieldName}.august`)}/>
          </td>
          <td className="yearValue">
            <input type="number"   placeholder={data.month.september} name={`${fieldName}.september`} {...register(`${fieldName}.september`)} />
          </td>
          <td className="yearValue">
            <input type="number"  placeholder={data.month.october} name={`${fieldName}.october`} {...register(`${fieldName}.october`)}/>
          </td>
          <td className="yearValue">
            <input type="number"  placeholder={data.month.november}  name={`${fieldName}.november`} {...register(`${fieldName}.november`)} />
          </td>
          <td className="yearValue">
            <input type="number" placeholder={data.month.december} name={`${fieldName}.december`} {...register(`${fieldName}.december`)} />
          </td>
        </tr>
        </tbody>
</table>          
    </fieldset>
  )
      })}
      <br></br>            
      <input type="submit" style={{ backgroundColor: "blueviolet", color: "whitesmoke", marginBottom: "3%", marginRight: "1%", float: "right", padding: "7px", border: "solid black 2px", borderRadius: "15px" }} />
    </form>  
    </>
  )
}

export default CustomKpiPage