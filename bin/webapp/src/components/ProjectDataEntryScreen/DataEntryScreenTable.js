import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Form, Table } from "reactstrap";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "reactstrap";
import { Navigate, useNavigate } from "react-router-dom";
import "./DataEntryScreenTableStyle.css";
import OnlyDisplayHeader from "../Header/OnlyDisplayHeader";

const DataEntryScreenTable = ({id}) => {
  
const[selectedYear,setSelectedYear]=useState(parseInt(new Date().getFullYear()))
const[kpiList,setKpiList] = useState([{
      kpiId: 0,
      kpiName: null,
      kpiThreshold:null,
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

  const navigate = useNavigate();
  const { register, handleSubmit,errors,reset } = useForm([{defaultValues:kpiList}]);
  

  useEffect(() => {
    axios .get(`http://localhost:8080/kpi/v3/${id}/${selectedYear}`)
      .then((res) =>{
      setKpiList(res.data.kpis)
      reset(res.data) }) 
    },[reset,id,selectedYear])
   
  const getProjectByYear = (e) =>{
    console.log(e)
     setSelectedYear(`${e.target.value}`)
      axios.get(`http://localhost:8080/kpi/v3/${id}/${selectedYear}`)
      .then(res=>{
        console.log(res)
        setKpiList(res.data.kpis)
      })
      .catch((e)=>console.log(e))
     
}
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
    <div style={{ borderCollapse: "collapse" , backgroundColor:"rgb(243, 243, 243)"}}>
      <lable>
        <strong>
          {" "}
          <font size="+2" color="Purple" style={{padding: "14px 16px"}}>
            Select Year :{" "}
          </font>
        </strong>
      </lable>
      <select style={{ backgroundColor: "rgb(243, 243, 243)",margin: "20px",borderRadius: "10px",minWidth: "100px",textAlign: "center", minHeight: "40px",}} onChange={(e)=>getProjectByYear(e)}>
        <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
        <option value={new Date().getFullYear()-1}>{new Date().getFullYear()-1}</option>
        <option value={new Date().getFullYear()-2}>{new Date().getFullYear()-2}</option>
        <option value={new Date().getFullYear()-3}>{new Date().getFullYear()-3}</option>
        <option value={new Date().getFullYear()-4}>{new Date().getFullYear()-4}</option>
        
      </select>
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
        {kpiList.map((data, index) => {
          let fieldName = `kpi[${index}]`;
          return (
            <fieldset name={fieldName} key={fieldName}>
              <table className="TableOfDataEntryScreen" style={{width: "100%",border: "none" }}>
                <tbody>
                <tr key={index}>
                  <td className="kpiNameValue"  name={`${fieldName}.kpiName`} ><input  type="text"   value={data.kpiName}   {...register(`${fieldName}.kpiName`)}></input></td>
                  {/* Threshold */}
                  <td className="thresholdNameValue"  name={`${fieldName}.kpiThreshold`}  ><input  type="number"  value={data.kpiThreshold}       {...register(`${fieldName}.kpiThreshold`)}></input> </td>
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
</div>          
);
}
export default DataEntryScreenTable;
