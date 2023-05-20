import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Table } from "reactstrap";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "reactstrap";
import "./ProjectDetailsCapture.css"
import { Navigate, useNavigate } from "react-router-dom";
import './ProjectDetailsCapture.css'
import OnlyDisplayHeader from "../Header/OnlyDisplayHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectDetailsCapture = () => {
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
  const [projectBU, setprojectBU] = useState('');
  const [projectBundle, setprojectBundle] = useState('');
  const [projectDI, setprojectDI] = useState('');
  const [projectMethodology, setprojectMethodology] = useState('');
  const [projectFrequency, setprojectFrequency] = useState('');
  const { register, handleSubmit } = useForm();
  const cat = Object.values(category);

  const navigate = useNavigate();

  const [customKpis, setCustomKpis] = useState([
    { customKpiName: '', customKpiThreshold: '' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...customKpis];
    data[index][event.target.name] = event.target.value;
    setCustomKpis(data);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(customKpis)
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
    let user = JSON.parse(sessionStorage.getItem("data"))
    if (projectName === '') {
      notify("Project name cannot be empty");
    }
    else {
      const kpis = [];
      const arr = Object.values(data);
    
      
      arr.map((index) => {
        if (index.kpiId !== false) {
          console.log(index);
          kpis.push({
            kpiId: parseInt(index.kpiId),
            kpiThreshold: parseInt(index.threshold),
          });
        }
      });
      if(kpis.length == 0)
      { 
        notify("Please select at least one KPI")
      }
      else{
      await axios.post(`http://localhost:8080/kpi/v3/${user.data.userName}`, {
        projectName,
        projectType,
        projectDU,
        projectBU,
        projectBundle,
        projectDI,
        projectMethodology,
        projectFrequency,
        kpis,
        customKpis
      }).then(
        alert("Project Saved to Your Dashboard "))
        .catch((e) => console.log(e))

      navigate("/PrivateRoute/ManagerDashboard")
    };}
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
                <option value="Aeroline">Aeroline</option>
                <option value="FR">FR</option>
                <option value="Germany">Germany</option>
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

              <p className="formlable">Project BU <span style={{ color: "red" }}>*</span> :</p>
              <select onChange={(e) => setprojectBU(e.target.value)}
                id="buSelect"
                name="buSelect"
                className="add-project-dropdown"
                required={true}
              >
                <option disabled selected > <b>--Select BU--</b></option>
                <option value="Airbus">Airbus</option>
                <option value="ST">ST</option>
                <option value="Thales">Thales</option>
                <option value="Saffran">Saffran</option>
              </select>
            </div>
          </td>
          
          <td>
            <div className="projectDetailDiv" >

              <p className="formlable">Project Bundle<span style={{ color: "red" }}>*</span> : </p>
              <select onChange={(e) => setprojectBundle(e.target.value)}
                id="bundleSelect"
                name="bundleSelect"
                className="add-project-dropdown"
                required={true}
              >
                <option disabled selected > <b>--Select Bundle--</b></option>
                <option value="PCSC">PCSC</option>
                <option value="PMS">PMS</option>
                <option value="BS1">BS1</option>
                <option value="BT1">BT1</option>
                <option value="BSR1">BSR1</option>
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
          <tr>
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
                    <td id={index} style={{ width: "33%", textAlign: "center" , fontSize:"1.3vw" }}>
                      {data.kpiName}
                    </td>
                    <td style={{ width: "33%", textAlign: "center" }}>
                      <input
                        type="checkbox"
                        value={`${data.kpiId}`}
                        {...register(`${fieldName}.kpiId`)}
                     />
                    </td>
                    <td style={{ width: "33%", textAlign: "center" }}>
                      <input
                        defaultValue={0}
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
          <OnlyDisplayHeader displayName="Additional Kpi" />
          {/* Additional Kpi form */}

          <table style={{ width: "100%" }}><tr >
            <th style={{ border: "none", width: "33%" }}>Kpi Name</th>
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
                        placeholder='Kpi Name'
                        onChange={event => handleFormChange(event, index)}
                        value={form.customKpiName}
                        style={{ maxWidth: "70%", textAlign:"center" }}
                      /></td>
                    <td >
                      <input
                        name='customKpiThreshold'
                        placeholder='Kpi Threshold'
                        onChange={event => handleFormChange(event, index)}
                        value={form.customKpiThreshold}
                        style={{ maxWidth: "70%", textAlign:"center" }}
                      /></td>


                    <td style={{ textAlign: "center", padding: "8px", width: "33%" }}>
                      <button className="removeButton" type="button" onClick={() => removeFields(index)} >Remove</button></td>
                  </tr>
                </table>
              </div>

            )
          })}

          <br />

          <input type="submit" className="submitButton"  />
          <div style={{ marginBottom: "50px" }}>
            <button type="button" className="AddMoreKpiButton" onClick={addFields} >Add More KPI..</button>
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
