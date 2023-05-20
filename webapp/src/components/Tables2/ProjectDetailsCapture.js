import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import "./ProjectDetailsCapture.css"
import { useNavigate } from "react-router-dom";
import OnlyDisplayHeader from "../Header/OnlyDisplayHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  ProjectDetailsCapture = () => {
  const notify = (message) => toast(message);
  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("http://localhost:8080/kpi/v4/kpis");
      setCategory(res.data);
    };
    getCategory();
  }, []);
  const [category, setCategory] = useState([]);
  const [projectName, setprojectName] = useState('');
  const [projectType, setprojectType] = useState('');
  const [projectDU, setprojectDU] = useState('');
  const [projectProfitCenter, setprojectProfitCenter] = useState('');
  const [projectClient, setprojectClient] = useState('');
  const [projectDI, setprojectDI] = useState('');
  const [projectMethodology, setprojectMethodology] = useState('');
  const [projectFrequency, setprojectFrequency] = useState('');
  const { register, handleSubmit } = useForm();
  const cat = Object.values(category);

  const navigate = useNavigate();

  const [customKpis, setCustomKpis] = useState([])

  const handleFormChange = (event, index) => {
    let data = [...customKpis];
    data[index][event.target.name] = event.target.value;
    setCustomKpis(data);
  }

  const submit = (e) => {
    e.preventDefault();
  }

  const addFields = () => {
    let object = {
      customKpiName: '',
      customKpiThreshold: ''
    }

    setCustomKpis([...customKpis, object])
  }

  const removeFields = (index) => {
    let data = [...customKpis];
    data.splice(index, 1)
    setCustomKpis(data)
  }

  const onSubmit = async (data) => {

    console.log(data)
    let user = JSON.parse(sessionStorage.getItem("data"))
    if (projectName === '' || projectType === "" || projectProfitCenter===""||projectClient===""||projectDU===""||projectDI===""||projectFrequency===""||projectMethodology===""||projectType==="") {
      notify("Please fill all the required feilds");
      return
    }
    else {
      const kpis = [];
      const arr = Object.values(data);
    
      var counter =0
      arr.map((index) => {
       
        if (index.kpiId !== false && index.threshold!=="") {
          console.log(index);
          counter = 1
          kpis.push({
            kpiId: parseInt(index.kpiId),
            kpiThreshold: parseInt(index.threshold),
          });
        }
        if(index.kpiId!== false && index.threshold === "")
        {
          notify("please fill the threshold corresponding to the selected KPI's")
          counter = -1
          return;
        }
        if(index.kpiId === false && index.threshold !== "")
        {
          counter = -1
          notify("please provide threshold only for selected KPIs")
          return;
          
        }
      });
      if(kpis.length!==0 && counter ===-1){
           return;
      }
      if(kpis.length === 0 && counter=== 0)
      { 
        notify("Please select at least one KPI")
        return;
      }
      if(kpis.length === 0 && counter === -1) 
      {
        return;
      }

      else{
      await axios.post(`http://localhost:8080/kpi/v3/${user.data.userName}`, {
        projectName,
        projectType,
        projectDU,
        projectProfitCenter,
        projectClient,
        projectDI,
        projectMethodology,
        projectFrequency,
        kpis,
        customKpis
      }).then(
        notify("Project saved to your Dashboard "))
        setTimeout(goToDashboard,2000)
        .catch((e) => console.log(e))

      navigate("/PrivateRoute/ManagerDashboard")
    };}
  }

  const goToDashboard = ()=>{
    navigate("/PrivateRoute/ManagerDashboard")
}
  return (
    <>
      <table className="projectDetailTable" style={{ width: "100%"}}>
        <tbody>
        <tr >
         
          <td>
            <div className="projectDetailDiv" >
              <p className="formlable"> Project Name <span style={{ color: "red" }}>*</span> : </p>
              <input onChange={(e) => setprojectName(e.target.value)}
                className="InputOfAddProject"
                type="text"
                id="ProjectName"
                name="message"
                required={true}
              />
            </div>
          </td>

          
          <td >
            <div className="projectDetailDiv" >

              <p className="formlable">Project DU <span style={{ color: "red" }}>*</span>: </p>
              <select onChange={(e) => setprojectDU(e.target.value)}
                id="duSelect"
                name="duSelect"
                className="add-project-dropdown"
                required={true}
              >
                <option disabled selected > <b>--Select DU--</b></option>
                <option value="DU Aeroline (IN024)">DU Aeroline (IN024)</option>
                <option value="DU France V&R">DU France V&R</option>
                <option value="DU Germany">DU Germany</option>
              </select>
            </div>
          </td>

          
          <td>
            
            <div className="projectDetailDiv" >
              <p className="formlable">DI Responsible <span style={{ color: "red" }}>*</span>  :</p>
              <select id="diSelect" name="diSelect" className="add-project-dropdown" onChange={(e) => setprojectDI(e.target.value)} required={true} >
              <option disabled selected > <b>--Select DI--</b></option>
                <option value="Ayushi">Ayushi</option>
                <option value="Chitra">Chitra</option>
                <option value="Varsha">Varsha</option>
              </select>
            </div>
          </td>
          
          <td>
            <div className="projectDetailDiv" >

              <p className="formlable">Methodology <span style={{ color: "red" }}>*</span> :</p>
              <select id="diSelect" name="diSelect" className="add-project-dropdown" onChange={(e => setprojectMethodology(e.target.value))} required={true} >
              <option disabled selected > <b>--Select Methodology--</b></option>
                <option value="Waterfall">Waterfall</option>
                <option value="Agile">Agile</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </td>
        </tr>

        <tr>
          
          <td>
            <div className="projectDetailDiv" >

              <p className="formlable">Project Type <span style={{ color: "red" }}>*</span> :</p>
              <select onChange={(e) => setprojectType(e.target.value)}
                id="typeSelect"
                name="typeSelect"
                className="add-project-dropdown"
                style={{marginLeft:"10%"}}
                required={true}
              >
                <option disabled selected > <b>--Select Type--</b></option>
                <option value="Scrum">Scrum</option>
                <option value="Canban">Kanban</option>
              </select>
            </div>

          </td>
          
          <td>
            <div className="projectDetailDiv" >

              <p className="formlable">Profit Center<span style={{ color: "red" }}>*</span> :</p>
              <select onChange={(e) => setprojectProfitCenter(e.target.value)}
                id="buSelect"
                name="buSelect"
                className="add-project-dropdownSelectProfitCentre"
                required={true}
                
              >
                <option disabled selected > <b>--Select profit center--</b></option>
                <option value="Aeroline Digital">Aeroline Digital</option>
                <option value="Aeroline Management">Aeroline Management</option>
                <option value="Airbus">Airbus</option>
                <option value="Airbus Helicopter">Airbus Helicopter</option>
                <option value="Airbus India">Airbus India</option>
                <option value="CIMPA">CIMPA</option>
                <option value="CIMPA_AIRBUS">CIMPA_AIRBUS</option>
                <option value="Dassault">Dassault</option>
                <option value="SABCA">SABCA</option>
                <option value="Safran">Safran</option>
                <option value="SAP Internal">SAP Internal</option>
                <option value="SAP Jeunes">SAP Jeunes</option>
                <option value="ST Microelectronics">ST Microelectronics</option>
                <option value="STIE Airbus">STIE Airbus</option>
                <option value="Thales">Thales</option>                        
              </select>
            </div>
          </td>
          
          <td>
            <div className="projectDetailDiv" >

              <p className="formlable">Project Client<span style={{ color: "red" }}>*</span> : </p>
              <select onChange={(e) => setprojectClient(e.target.value)}
                id="bundleSelect"
                name="bundleSelect"
                className="add-project-dropdownProjectClient"
                required={true}
              >
                <option disabled selected > <b>--Select Client--</b></option>
                <option value="Aeroline Digital">Aeroline Digital</option>
                <option value="Aeroline Management">Aeroline Management</option>
                <option value="Airbus Skywise">Airbus Skywise</option>
                <option value="Airbus Atlantic">Airbus Atlantic</option>
                <option value="Airbus CS">Airbus CS</option>
                <option value="Airbus E2E PLM">Airbus E2E PLM</option>
                <option value="Airbus MO">Airbus MO</option>
                <option value="Airbus Prog & SC">Airbus Prog & SC</option>
                <option value="Airbus UK">Airbus UK</option>
                <option value="Airbus Helicopter">Airbus Helicopter</option>
                <option value="Airbus India">Airbus India</option>
                <option value="CIMPA">CIMPA</option>
                <option value="CIMPA_BGLR">CIMPA_BGLR</option>
                <option value="CIMPA_M_GERMANY">CIMPA_M_GERMANY</option>
                <option value="CIMPA_Noida">CIMPA_Noida</option>
                <option value="CIMPA_OTHERS">CIMPA_OTHERS</option>
                <option value="CIMPA_W_PARIS">CIMPA_W_PARIS</option>
                <option value="CIMPA_Airbus_OTHERS">CIMPA_Airbus_OTHERS</option>
                <option value="CIMPA_IS_LM">CIMPA_IS_LM</option>
                <option value="CIMPA_TDM">CIMPA_TDM</option>
                <option value="Dassault">Dassault</option>
                <option value="SABCA">SABCA</option>
                <option value="Safran">Safran</option>
                <option value="SAFRAN_SAE_SAP_INDUSTRY_V1_S3">SAFRAN_SAE_SAP_INDUSTRY_V1_S3</option>
                <option value="SAP_BASIS">SAP_BASIS</option>
                <option value="SAP_Jeunes">SAP_Jeunes</option>
                <option value="ST_Microelectronics">ST_Microelectronics</option>
                <option value="NAVBLUE">NAVBLUE</option>
                <option value="STIE-Airbus-BLR">STIE-Airbus-BLR</option>
                <option value="STIE-Airbus-CHE">STIE-Airbus-CHE</option>
                <option value="STIE-Airbus-NOI">STIE-Airbus-NOI</option>
                <option value="STIE-EYY">STIE-EYY</option>
                <option value="Thales ERP">Thales ERP</option>
                <option value="Thales OCM">Thales OCM</option>
              </select>
            </div>

          </td>
          
          <td>
            
            <div className="projectDetailDiv" >

              <p className="formlable">Frequency<span style={{ color: "red" }}>*</span> :</p>
              <select id="diSelect" name="diSelect" className="add-project-dropdown" onChange={(e) => setprojectFrequency(e.target.value)}  style={{marginLeft:"15%"}}  required={true}>
              <option disabled selected > <b>--Select Frequency--</b></option>
                <option value="Quarterly">Quarterly</option>
                <option value="Agile-Sprint-Wise">AgileSprint wise</option>
                <option value="TaskWise">Task wise</option>
                <option value="SubWise">Sub. wise</option>
                <option value="NoMonitoring">No Monitoring</option>
              </select>
            </div>

          </td>
        </tr>
        </tbody>
      </table>

      {/* Main Table */}

      <div className="add-team-detail-table">
        <table style={{ width: "100%" }}>
          <tr className="rr4">
            <th style={{ width: "33%", textAlign: "center" }}>KPI Name</th>
            <th style={{ width: "33%", textAlign: "center" }}>Select</th>
            <th style={{ width: "33%", textAlign: "center" }}>Threshold</th>
          </tr>
        </table>
        <form onSubmit={handleSubmit(onSubmit)}>
          {cat.map((data, index) => {
            let fieldName = `[${data.kpiName}]`;

            return (
              <fieldset name={fieldName} key={fieldName}>
                <table className="mainnTable" style={{ width: "100%" }}>
                  <tr>
                    <td id={index} style={{ width: "33%", textAlign: "left" , fontSize:"1.3vw",fontWeight:"bold" }}>
                      {data.kpiName}
                      <span className="tooltiptext">{data.kpiDesc}</span>
                    </td>
                    <td style={{ width: "33%", textAlign: "center" }}>
                      <input
                        type="checkbox"
                        value={`${data.kpiId}`}
                        {...register(`${fieldName}.kpiId`)}
                        style={{width:20,height:20}}
                     />
                    </td>
                    <td style={{ width: "33%", textAlign: "center" }}>
                      <input
                      
                        type="number"
                        
                        style={{border:"none" , backgroundColor:"rgb(246, 246, 246)"}}
                        name={`${fieldName}.threshold`}
                        {...register(`${fieldName}.threshold`)}
                        
                      />
                    </td>
                  </tr>
                </table>
              </fieldset>
            );
          })}
          {/* <input type="submit" style={{ backgroundColor: "#82b74b", marginBottom: "3%", marginRight: "1%", float: "right", padding: "7px", border: "solid black 2px", borderRadius: "15px" }} /> */}
         
          <br />
          <OnlyDisplayHeader displayName="Additional KPI" />
          {/* Additional Kpi form */}

          <table style={{ width: "100%" }}><tr >
            <th style={{ border: "none", width: "33%" }}>KPI Name</th>
            <th style={{ border: "none", width: "33%" }}>Threshold</th>
            <th style={{ border: "none", width: "33%" }}>Remove</th>
          </tr></table>

          {customKpis.map((form, index) => {
            return (
              <div key={index}>
                <table className="AdditionalKpiTable" >
                  <tr>
                    <td >
                      <input
                        name='customKpiName'
                        placeholder='KPI Name'
                        onChange={event => handleFormChange(event, index)}
                        value={form.customKpiName}
                        style={{ maxWidth: "70%", textAlign:"center" }}
                      /></td>
                    <td >
                      <input
                        name='customKpiThreshold'
                        placeholder='KPI Threshold'
                        onChange={event => handleFormChange(event, index)}
                        value={form.customKpiThreshold}
                        style={{ maxWidth: "70%", textAlign:"center", }}
                      /></td>


                    <td style={{ textAlign: "center", padding: "8px", width: "33%" }}>
                      <button className="removeButton" type="button" onClick={() => removeFields(index)} >Remove</button></td>
                  </tr>
                </table>
              </div>

            )
          })}

          <br />

          <input type="submit" className="submitButton" />
          <div style={{ marginBottom: "50px" }}>
            <button type="button" className="AddMoreKpiButton" onClick={addFields}  style={{backgroundColor:"purple"}} >Add Custom KPI</button>
          </div>
        </form>
        <ToastContainer
                 position="top-center"
                autoClose={1000}
              //  hideProgressBar={false}
              //  newestOnTop={false}
              closeOnClick
              //  rtl={false}
              theme="dark"
                                />
      </div>
    </>
  );
};

export default ProjectDetailsCapture;
