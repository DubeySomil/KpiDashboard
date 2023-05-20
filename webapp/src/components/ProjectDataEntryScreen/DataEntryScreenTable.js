import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Form, Table } from "reactstrap";
import React from "react";
import { useForm } from "react-hook-form";
import { Input ,Label} from "reactstrap";
import { Navigate, useNavigate } from "react-router-dom";
import "./DataEntryScreenTableStyle.css";
import OnlyDisplayHeader from "../Header/OnlyDisplayHeader";
import CustomKpiPage from "./CustomKpiPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import DiDataEntryScreenTable from "./DiDataEntryScreenTable";
import  { CardList, cardList }  from 'react-bootstrap-icons';


const DataEntryScreenTable = ({ id }) => {

  var months = [{name:"jan"},{name:"feb"},{name:"march"},{name:"april"},{name:"may"},{name:"june"},{name:"july"},{name:"aug"},{name:"sep"},{name:"oct"},{name:"nov"},{name:"dec"}]
  const [dummyState, setDummyState] = useState(0)
  const [selectedYear, setSelectedYear] = useState(parseInt(new Date().getFullYear()))
  const [kpiList, setKpiList] = useState([{
    kpiId: 0,
    kpiName: null,
    kpiThreshold: null,
    month: {
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
  const[inputVal,setInputVal] = useState("")
  const [customKpiList, setCustomKpiList] = useState([{
    customKpiId: 0,
    customKpiName: null,
    customKpiThreshold: null,
    month: {
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
  const notify = (message) => toast(message);
  const navigate = useNavigate();
  const { register, handleSubmit, errors, reset } = useForm([{ defaultValues: kpiList }]);
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    reset: reset1
  } = useForm({ defaultValues: customKpiList });

  useEffect(() => {
    axios.get(`http://localhost:8080/kpi/v3/${id}/${selectedYear}`)
      .then((res) => {
        console.log("project details->", res)
        setKpiList(res.data.kpis)
        setCustomKpiList(res.data.customKpis)
        reset(res.data)
        reset1(res.data)
        
      })
  }, [reset, reset1, id, selectedYear, dummyState])

  const getProjectByYear = (e) => {
    console.log(e)
    setSelectedYear(`${e.target.value}`)
    axios.get(`http://localhost:8080/kpi/v3/${id}/${selectedYear}`)
      .then(res => {
        console.log(res)
        setCustomKpiList(res.data.customKpis)
        setKpiList(res.data.kpis)
      })
      .catch((e) => console.log(e))

  }
  const onSubmit2 = (data) => {
    console.log("custom kpi dta is ", data.customKpi)
    let projectId = parseInt(id)
    const customKpis = data.customKpi
    customKpis.map((index) => {
      {   
        index.map((x)=>{
          if(x === "")
          {
            x= -1;
          }
        })
      }
    })
    let year = selectedYear
    axios.post("http://localhost:8080/kpi/v3/updatecustom", {
      projectId,
      year,
      customKpis
    })
      .then((res) => {
        notify("Custom Kpi's updated Successfully")
        setDummyState(!dummyState)
      }).catch((e) => console.log(e))
  }

  const onSubmit = (data) => {
    console.log("data",data)
    // console.log(data.kpi)
    let projectId = parseInt(id)
    // const kpi1  = Object.values(data);
    // const kpi1 = data.kpi
    //  console.log(kpi1)
    const kpis = data.kpi
    console.log(kpis)
    kpis.map((index) => {
      {
        index.map((x)=>{
          if(x=== ""){
            x = -1;
          }
        })   
      }
      console.log(kpis)
    })
    let year = selectedYear
    axios.post("http://localhost:8080/kpi/v3/update", {
      projectId,
      year,
      kpis
    }).then(() => {
      notify("Project Details updated successfully")
      setDummyState(!dummyState)
      //setTimeout(goToLogin,2500)  
    })
      .catch((e) => console.log(e))

  };
  const [show, setShow] = useState(false);
  const[inputId,setInputId]=useState()

  const handleClose = () => {
   let data = document.getElementById("inputID").value;
   console.log(data);
  document.getElementById(inputId).value = data;
  setShow(false);
  }
  const[dataInModal,setDataInModal]=useState("")
  const handleShow = (e) =>{ 
    console.log("ss",e.target.value)
    setShow(true);
    setInputId(e.target.id);  
    setDataInModal(e.target.value)
  }
  
  const goToLogin = () => {
    navigate("/PrivateRoute/ManagerDashboard")
  }
   
  const setValue = (e)=>{
    setInputVal(e.target.value);
    e.target.value = inputVal;
  }
  let user = JSON.parse(sessionStorage.getItem("data"))
  let role = user.data.userRole
  if (role !== "DI") {
    return (
      <div style={{ borderCollapse: "collapse", backgroundColor: "rgb(243, 243, 243)", height: "auto" }}>
        
        <Modal show={show} onHide={handleClose}  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered >
        <Modal.Header closeButton>
          <Modal.Title>KPI Justification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Label>Enter  KPI Justification</Label>
            <Input type="text" id="inputID" defaultValue={dataInModal}></Input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{backgroundColor:"black"}} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" style={{backgroundColor:"black"}} onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        <lable>
          <strong>
            {" "}
            <font size="+2" color="Purple" style={{ padding: "14px 16px" }}>
              Select Year :{" "}
            </font>
          </strong>
        </lable>
        <select style={{ backgroundColor: "rgb(243, 243, 243)", margin: "20px", borderRadius: "10px", minWidth: "100px", textAlign: "center", minHeight: "40px", }} onChange={(e) => getProjectByYear(e)}>
          <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
          <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
          <option value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</option>
          <option value={new Date().getFullYear() - 3}>{new Date().getFullYear() - 3}</option>
          <option value={new Date().getFullYear() - 4}>{new Date().getFullYear() - 4}</option>

        </select>
        <h2 style={{ textAlign: "center", fontWeight: "bolder" }} >KPI</h2>
        <table className="headingOfDataEntryScreen" style={{ overflow: "auto", border: "none" }}>
          <tr>
            <th className="headingKpiName">KPI Name</th>
            <th className="headingThreshold">Threshold</th>
            {months.map((data)=>{
                    return(
                        <th style={{ textAlign: "center" }}>{data.name}</th>
                    )
                })}
          </tr>
        </table>

        <form onSubmit={handleSubmit(onSubmit)} style={{ height: "auto" }}>
          {kpiList.map((data, index) => {
            let fieldName = `kpi[${index}]`;
            return (
              <fieldset name={fieldName} key={fieldName}>
                <table className="TableOfDataEntryScreen" style={{ width: "100%", border: "none" }}>
                  <tbody>
                    <tr key={index}>
                      <td className="kpiNameValue" name={`${fieldName}.kpiName`} ><input type="text" style={{fontWeight:"bold"}} value={data.kpiName}   {...register(`${fieldName}.kpiName`)}></input></td>
                      {/* Threshold */}
                      <td className="thresholdNameValue" name={`${fieldName}.kpiThreshold`}  ><input type="number" value={data.kpiThreshold}       {...register(`${fieldName}.kpiThreshold`)}></input> </td>
                      {/* <td className="yearValue">
                    <input type="number"   placeholder={data.month.january}   name= {`${fieldName}.january`}  {...register(`${fieldName}.january`)}/>
                  </td>
                  <td className="yearValue"   >
                    <input type="number"  placeholder={data.month.february} name={`${fieldName}.february`} {...register(`${fieldName}.february`)}/>
                  </td> */}
                      {(() => {
                        if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                          if (data.month.january < data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" defaultValue={data.month.january}  onChange={(e)=>setValue(e)} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.january`} {...register(`${fieldName}.january`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number"  defaultValue={data.month.january} onChange={(e)=>setValue(e)} style={{ color: "black", backgroundColor: "#FA113D" }}    {...register(`${fieldName}.january`)} className="green" />
                              </td>
                            )
                          }
                        }
                        else {
                          if (data.month.january >= data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" defaultValue={data.month.january} onChange={(e)=>setValue(e)} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.january`} {...register(`${fieldName}.january`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" defaultValue={data.month.january}  onChange={(e)=>setValue(e)} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.january`} {...register(`${fieldName}.january`)} className="green" />
                              </td>
                            )
                          }
                        }
                      })()}
                      {(() => {
                        if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                          if (data.month.february < data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number"  value={data.month.february} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.february`} {...register(`${fieldName}.february`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" value={data.month.february}  onChange={setKpiList([{...kpiList,
                                }])} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.february`} {...register(`${fieldName}.february`)} className="green" />
                              </td>
                            )
                          }
                        }
                        else {
                          if (data.month.february >= data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.february} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.february`} {...register(`${fieldName}.february`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.february} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.february`} {...register(`${fieldName}.february`)} className="green" />
                              </td>
                            )
                          }
                        }
                      })()}  {(() => {
                        if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                          if (data.month.march < data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.march} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.march`} {...register(`${fieldName}.march`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.march} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.march`} {...register(`${fieldName}.march`)} className="green" />
                              </td>
                            )
                          }
                        }
                        else {
                          if (data.month.march >= data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.march} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.march`} {...register(`${fieldName}.march`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.march} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.march`} {...register(`${fieldName}.march`)} className="green" />
                              </td>
                            )
                          }
                        }
                      })()}
                      {(() => {
                        if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                          if (data.month.april < data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.april} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.april`} {...register(`${fieldName}.april`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.april} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.april`} {...register(`${fieldName}.april`)} className="green" />
                              </td>
                            )
                          }
                        }
                        else {
                          if (data.month.april >= data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.april} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.april`} {...register(`${fieldName}.april`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.april} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.april`} {...register(`${fieldName}.april`)} className="green" />
                              </td>
                            )
                          }
                        }
                      })()}
                      {(() => {
                        if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                          if (data.month.may < data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.may} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.may`} {...register(`${fieldName}.may`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.may} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.may`} {...register(`${fieldName}.may`)} className="green" />
                              </td>
                            )
                          }
                        }
                        else {
                          if (data.month.may >= data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.may} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.may`} {...register(`${fieldName}.may`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.may} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.may`} {...register(`${fieldName}.may`)} className="green" />
                              </td>
                            )
                          }
                        }
                      })()}
                      {(() => {
                        if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                          if (data.month.june < data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.june} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.june`} {...register(`${fieldName}.june`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.june} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.june`} {...register(`${fieldName}.june`)} className="green" />
                              </td>
                            )
                          }
                        }
                        else {
                          if (data.month.june >= data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.june} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.june`} {...register(`${fieldName}.june`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.june} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.june`} {...register(`${fieldName}.june`)} className="green" />
                              </td>
                            )
                          }
                        }
                      })()}
                      {(() => {
                        if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                          if (data.month.july < data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.july} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.july`} {...register(`${fieldName}.july`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.july} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.july`} {...register(`${fieldName}.july`)} className="green" />
                              </td>
                            )}}
                        else {
                          if (data.month.july >= data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.july} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.july`} {...register(`${fieldName}.july`)} className="green" />
                              </td>
                            )}
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.july} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.july`} {...register(`${fieldName}.july`)} className="green" />
                              </td>
                            )}}
                      })()}
                      {(() => {
                        if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                          if (data.month.august < data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.august} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.august`} {...register(`${fieldName}.august`)} className="green" />
                              </td>
                            )
                          }
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.august} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.august`} {...register(`${fieldName}.august`)} className="green" />
                              </td>
                            )}
                        }
                        else {
                          if (data.month.august >= data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.august} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.august`} {...register(`${fieldName}.august`)} className="green" />
                              </td>
                            )}
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.august} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.august`} {...register(`${fieldName}.august`)} className="green" />
                              </td>
                            )}}
                      })()}
                      {(() => {
                        if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                          if (data.month.september < data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.september} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.september`} {...register(`${fieldName}.september`)} className="green" />
                              </td>
                            )}
                          else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.september} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.september`} {...register(`${fieldName}.september`)} className="green" />
                              </td>
                            )}}
                        else {
                          if (data.month.september >= data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.september} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.september`} {...register(`${fieldName}.september`)} className="green" />
                              </td>
                            )}else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.september} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.september`} {...register(`${fieldName}.september`)} className="green" />
                              </td>
                            )}}
                      })()}
                      {(() => {
                        if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                          if (data.month.october < data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.october} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.october`} {...register(`${fieldName}.october`)} className="green" />
                              </td>
                            )}else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.october} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.october`} {...register(`${fieldName}.october`)} className="green" />
                              </td>
                            )}}else {
                          if (data.month.october >= data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.october} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.october`} {...register(`${fieldName}.october`)} className="green" />
                              </td>
                            )} else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.october} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.october`} {...register(`${fieldName}.october`)} className="green" />
                              </td>
                            )
                          }}})()}
                      {(() => {
                        if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                          if (data.month.december < data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.december} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.december`} {...register(`${fieldName}.december`)} className="green" />
                              </td>
                            )}else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.december} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.december`} {...register(`${fieldName}.december`)} className="green" />
                              </td>
                            ) }}else {
                          if (data.month.december >= data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.december} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.december`} {...register(`${fieldName}.december`)} className="green" />
                              </td>
                            )}else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.december} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.december`} {...register(`${fieldName}.december`)} className="green" />
                              </td>
                            )}}})()}
                      {(() => {
                        if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                          if (data.month.december < data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.december} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.december`} {...register(`${fieldName}.december`)} className="green" />
                              </td>
                            )}else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.december} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.december`} {...register(`${fieldName}.december`)} className="green" />
                              </td>
                            )}}else {
                          if (data.month.december >= data.kpiThreshold) {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.december} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.december`} {...register(`${fieldName}.december`)} className="green" />
                              </td>
                            )} else {
                            return (
                              <td className="yearValue">
                                <input type="number" placeholder={data.month.december} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.december`} {...register(`${fieldName}.december`)} className="green" />
                              </td>
                            )}} })()}
                    </tr>
                    <tr>
                    <td className="yearValue"><div><input type="text"   style={{width:"100%",textAlign:"left" , border:"none",color:"black"}} value="KPI Justifications" disabled></input></div></td>
                    <td  className="yearValue"><input  className="reasonBox" disabled id={data.kpiName} style={{border:"none"}}  readOnly></input></td>
                    
                     {
                      months.map((dat,index)=>{
                        return(
                          <td  className="yearValue">
                              <input type="text" className="justificationInput" id={(data.kpiName+dat.name)} {...register(`${fieldName}.${(dat.name).concat("justification")}`)} onClick={(e) =>handleShow(e)}></input>
                             
                             <CardList className="tableIcon"></CardList>
                          </td>
                        )
                      })
                     }
                     </tr> 
                  </tbody> 
                </table>
              </fieldset>
            )
          })}
          <br></br>
          <input type="submit" style={{ backgroundColor: "blueviolet", color: "whitesmoke", marginBottom: "3%", marginRight: "1%", float: "right", padding: "7px", border: "solid black 2px", borderRadius: "15px" }} />
        </form>

        {customKpiList  && (
          <>
            <h2 style={{ marginTop: "3%", fontWeight: "bolder", textAlign: "center", marginLeft: "3%" }}>Custom KPI</h2>
            <table className="headingOfDataEntryScreen" style={{ overflow: "auto" }}>
                <tr>
                <th className="headingKpiName">KPI Name</th>
                <th className="headingThreshold">Threshold</th>
                {months.map((data)=>{
                    return(
                        <th style={{ textAlign: "center" }}>{data.name}</th>
                    )
                })}
              </tr>
            </table>
            <form onSubmit={handleSubmit(onSubmit2)} style={{ height: "auto" }}>
              {customKpiList.map((data, index) => {
                let fieldName = `customKpi[${index}]`;
                return (
                  <fieldset name={fieldName} key={fieldName}>
                    <table className="TableOfDataEntryScreen" style={{ width: "100%", border: "none" }}>
                      <tbody>
                        <tr key={index}>
                          <td className="kpiNameValue" name={`${fieldName}.customKpiName`} ><input type="text" value={data.customKpiName}   {...register(`${fieldName}.customKpiName`)}></input></td>
                           
                          {(() => {
                            if (data.month.january >= data.customKpiThreshold) {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.january} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.january`} {...register(`${fieldName}.january`)} className="green" />
                                </td>
                              )
                            }
                            else {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.january} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.january`} {...register(`${fieldName}.january`)} className="green" />
                                </td>
                              )
                            }
                          })()}
                          {(() => {
                            if (data.month.february >= data.customKpiThreshold) {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.february} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.february`} {...register(`${fieldName}.february`)} className="green" />
                                </td>
                              )
                            }
                            else {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.february} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.february`} {...register(`${fieldName}.february`)} className="green" />
                                </td>
                              )
                            }
                          })()}  {(() => {
                            if (data.month.march >= data.kpiThreshold) {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.march} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.march`} {...register(`${fieldName}.march`)} className="green" />
                                </td>
                              )
                            }
                            else {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.march} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.march`} {...register(`${fieldName}.march`)} className="green" />
                                </td>
                              )
                            }
                          })()}
                          {(() => {
                            if (data.month.april >= data.kpiThreshold) {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.april} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.april`} {...register(`${fieldName}.april`)} className="green" />
                                </td>
                              )
                            }
                            else {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.april} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.april`} {...register(`${fieldName}.april`)} className="green" />
                                </td>
                              )
                            }
                          })()}
                          {(() => {
                            if (data.month.may >= data.kpiThreshold) {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.may} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.may`} {...register(`${fieldName}.may`)} className="green" />
                                </td>
                              )
                            }
                            else {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.may} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.may`} {...register(`${fieldName}.may`)} className="green" />
                                </td>
                              )
                            }
                          })()}
                          {(() => {
                            if (data.month.june >= data.kpiThreshold) {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.june} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.june`} {...register(`${fieldName}.june`)} className="green" />
                                </td>
                              )
                            }
                            else {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.june} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.june`} {...register(`${fieldName}.june`)} className="green" />
                                </td>
                              )
                            }
                          })()}
                          {(() => {
                            if (data.month.july >= data.kpiThreshold) {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.july} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.july`} {...register(`${fieldName}.july`)} className="green" />
                                </td>
                              )
                            }
                            else {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.july} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.july`} {...register(`${fieldName}.july`)} className="green" />
                                </td>
                              )
                            }
                          })()}
                          {(() => {
                            if (data.month.august >= data.kpiThreshold) {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.august} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.august`} {...register(`${fieldName}.august`)} className="green" />
                                </td>
                              )
                            }
                            else {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.august} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.august`} {...register(`${fieldName}.august`)} className="green" />
                                </td>
                              )
                            }
                          })()}
                          {(() => {
                            if (data.month.september >= data.kpiThreshold) {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.september} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.september`} {...register(`${fieldName}.september`)} className="green" />
                                </td>
                              )
                            }
                            else {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.september} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.september`} {...register(`${fieldName}.september`)} className="green" />
                                </td>
                              )
                            }
                          })()}
                          {(() => {
                            if (data.month.october >= data.kpiThreshold) {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.october} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.october`} {...register(`${fieldName}.october`)} className="green" />
                                </td>
                              )
                            }
                            else {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.october} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.october`} {...register(`${fieldName}.october`)} className="green" />
                                </td>
                              )
                            }
                          })()}
                          {(() => {
                            if (data.month.november >= data.kpiThreshold) {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.november} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.november`} {...register(`${fieldName}.november`)} className="green" />
                                </td>
                              )
                            }
                            else {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.november} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.november`} {...register(`${fieldName}.november`)} className="green" />
                                </td>
                              )
                            }
                          })()}
                          {(() => {
                            if (data.month.december >= data.kpiThreshold) {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.december} style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.december`} {...register(`${fieldName}.december`)} className="green" />
                                </td>
                              )
                            }
                            else {
                              return (
                                <td className="yearValue">
                                  <input type="number" placeholder={data.month.december} style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.december`} {...register(`${fieldName}.december`)} className="green" />
                                </td>
                              )
                            }
                          })()}
                        </tr>       
                      </tbody>
                    </table>
                  </fieldset>
                )
              })}
              <br></br>
              <input type="submit" style={{ backgroundColor: "blueviolet", color: "whitesmoke", marginBottom: "3%", marginRight: "1%", float: "right", padding: "7px", border: "solid black 2px", borderRadius: "15px" }} />
            </form>
          </>)}
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          theme="dark"
        />
      </div>
    );
  }
  else{
    return(<DiDataEntryScreenTable projectid={id} projectYear = {selectedYear}  ></DiDataEntryScreenTable>)
  } 
}
export default DataEntryScreenTable;
