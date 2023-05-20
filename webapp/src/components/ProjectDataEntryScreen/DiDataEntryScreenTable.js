import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function DiDataEntryScreenTable(props) {
    const[selectedYear,setSelectedYear] = useState(parseInt(new Date().getFullYear()))
     var months = [{name:"jan"},{name:"feb"},{name:"march"},{name:"april"},{name:"may"},{name:"june"},{name:"july"},{name:"aug"},{name:"sep"},{name:"oct"},{name:"nov"},{name:"dec"}]
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
    useEffect(()=>{
       console.log("props",props)
       axios.get(`http://localhost:8080/kpi/v3/${props.projectid}/${props.projectYear}`)
       .then((res) => {
         console.log("project details->", res)
         setKpiList(res.data.kpis)
         setCustomKpiList(res.data.customKpis)
    }).catch((e)=>console.log(e))
} ,[])

const getProjectByYear = (e) => {
    console.log(e)
    setSelectedYear(`${e.target.value}`)
    axios.get(`http://localhost:8080/kpi/v3/${props.projectid}/${selectedYear}`)
      .then(res => {
        console.log(res)
        setCustomKpiList(res.data.customKpis)
        setKpiList(res.data.kpis)
      })
      .catch((e) => console.log(e))

  }
        return (
          <div style={{ borderCollapse: "collapse", backgroundColor: "rgb(243, 243, 243)", heihgt: "auto" }}>
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
            <form  style={{ height: "auto" }}>
              {kpiList.map((data, index) => {
                let fieldName = `kpi[${index}]`;
                return (
                  <fieldset name={fieldName} key={fieldName}>
                    <table className="TableOfDataEntryScreen" style={{ width: "100%", border: "none" }}>
                      <tbody>
                        <tr key={index}>
                          <td className="kpiNameValue" name={`${fieldName}.kpiName`} ><input type="text" value={data.kpiName}  ></input></td>
                          {/* Threshold */}
                          <td className="thresholdNameValue" name={`${fieldName}.kpiThreshold`}  ><input type="number" value={data.kpiThreshold} ></input> </td>
                          {(() => {
                            if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                              if (data.month.january < data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.january} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.january`}  className="green" />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.january} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.january`} />
                                  </td>
                                )
                              }
                            }
                            else {
                              if (data.month.january >= data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.january} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.january`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.january} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.january`} />
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
                                    <input type="number" placeholder={data.month.february} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.february`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.february} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.february`} />
                                  </td>
                                )
                              }
                            }
                            else {
                              if (data.month.february >= data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.february} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.february`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.february} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.february`}  />
                                  </td>
                                )
                              }
                            }
                          })()}  {(() => {
                            if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                              if (data.month.march < data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.march} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.march`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.march} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.march`}  />
                                  </td>
                                )
                              }
                            }
                            else {
                              if (data.month.march >= data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.march} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.march`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.march}  readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.march`}  />
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
                                    <input type="number" placeholder={data.month.april} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.april`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.april} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.april`}  />
                                  </td>
                                )
                              }
                            }
                            else {
                              if (data.month.april >= data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.april} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.april`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.april} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.april`}  />
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
                                    <input type="number" placeholder={data.month.may} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.may`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.may} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.may`} />
                                  </td>
                                )
                              }
                            }
                            else {
                              if (data.month.may >= data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.may} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.may`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.may} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.may`} />
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
                                    <input type="number" placeholder={data.month.june} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.june`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.june} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.june`}  />
                                  </td>
                                )
                              }
                            }
                            else {
                              if (data.month.june >= data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.june} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.june`}  />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.june} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.june`}  />
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
                                    <input type="number" placeholder={data.month.july} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.july`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.july} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.july`}  />
                                  </td>
                                )
                              }
                            }
                            else {
                              if (data.month.july >= data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.july}  readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.july`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.july} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.july`} />
                                  </td>
                                )
                              }
                            }
                          })()}
                          {(() => {
                            if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                              if (data.month.august < data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.august} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.august`}  />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.august} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.august`}  />
                                  </td>
                                )
                              }
                            }
                            else {
                              if (data.month.august >= data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.august} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.august`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.august} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.august`}  />
                                  </td>
                                )
                              }
                            }
                          })()}
                          {(() => {
                            if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                              if (data.month.september < data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.september} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.september`}  />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.september} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.september`}/>
                                  </td>
                                )
                              }
                            }
                            else {
                              if (data.month.september >= data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.september} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.september`}  />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.september} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.september`}  />
                                  </td>
                                )
                              }
                            }
                          })()}
                          {(() => {
                            if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                              if (data.month.october < data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.october} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.october`}  />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.october} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.october`} />
                                  </td>
                                )
                              }
                            }
                            else {
                              if (data.month.october >= data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.october} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.october`}  />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.october} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.october`} />
                                  </td>
                                )
                              }
                            }
                          })()}
                          {(() => {
                            if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                              if (data.month.december < data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.december} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.december`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.december} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.december`} />
                                  </td>
                                )
                              }
                            }
                            else {
                              if (data.month.december >= data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.december} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.december`}  />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.december} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.december`}  />
                                  </td>
                                )
                              }
                            }
                          })()}
                          {(() => {
                            if (data.kpiName === 'DDBD' || data.kpiName === 'DDAD' || data.kpiName === 'Release Defect Density') {
                              if (data.month.december < data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.december} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.december`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.december} readOnly style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.december`} />
                                  </td>
                                )
                              }
                            }
                            else {
                              if (data.month.december >= data.kpiThreshold) {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.december} readOnly style={{ color: "black", backgroundColor: "#4BB543" }} name={`${fieldName}.december`} />
                                  </td>
                                )
                              }
                              else {
                                return (
                                  <td className="yearValue">
                                    <input type="number" placeholder={data.month.december}  style={{ color: "black", backgroundColor: "#FA113D" }} name={`${fieldName}.december`}  />
                                  </td>
                                )
                              }
                            }
                          })()}
                        </tr>
                        <tr>
                          
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                )
              })}
              
            </form>
    
            {customKpiList.length !== 0 && (
              <>
    
                <h2 style={{ marginTop: "3%", fontWeight: "bolder", textAlign: "center", marginLeft: "3%" }}>Custom KPI</h2>
                <table className="headingOfDataEntryScreen" style={{ overflow: "auto" }}>
    
                  <tr>
                    <th className="headingKpiName">KPI Name</th>
                    <th className="headingThreshold">Threshold</th>
             
                  </tr>
                </table>
                <form  style={{ height: "auto" }}>
                  {customKpiList.map((data, index) => {
                    let fieldName = `customKpi[${index}]`;
                    return (
                      <fieldset name={fieldName} key={fieldName}>
                        <table className="TableOfDataEntryScreen" style={{ width: "100%", border: "none" }}>
                          <tbody>
                            <tr key={index}>
                              <td className="kpiNameValue" name={`${fieldName}.customKpiName`} ><input type="text" value={data.customKpiName} ></input></td>
                              {(() => {
                                if (data.month.january >= data.customKpiThreshold) {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.january} style={{ color: "black", backgroundColor: "#4BB543" }} />
                                    </td>
                                  )
                                }
                                else {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.january} style={{ color: "black", backgroundColor: "#FA113D" }}/>
                                    </td>
                                  )
                                }
                              })()}
                              {(() => {
                                if (data.month.february >= data.customKpiThreshold) {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.february} style={{ color: "black", backgroundColor: "#4BB543" }}  />
                                    </td>
                                  )
                                }
                                else {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.february} style={{ color: "black", backgroundColor: "#FA113D" }} />
                                    </td>
                                  )
                                }
                              })()}  {(() => {
                                if (data.month.march >= data.kpiThreshold) {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.march} style={{ color: "black", backgroundColor: "#4BB543" }}  />
                                    </td>
                                  )
                                }
                                else {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.march} style={{ color: "black", backgroundColor: "#FA113D" }}  />
                                    </td>
                                  )
                                }
                              })()}
                              {(() => {
                                if (data.month.april >= data.kpiThreshold) {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.april} style={{ color: "black", backgroundColor: "#4BB543" }} />
                                    </td>
                                  )
                                }
                                else {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.april} style={{ color: "black", backgroundColor: "#FA113D" }}  />
                                    </td>
                                  )
                                }
                              })()}
                              {(() => {
                                if (data.month.may >= data.kpiThreshold) {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.may} style={{ color: "black", backgroundColor: "#4BB543" }} />
                                    </td>
                                  )
                                }
                                else {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.may} style={{ color: "black", backgroundColor: "#FA113D" }} />
                                    </td>
                                  )
                                }
                              })()}
                              {(() => {
                                if (data.month.june >= data.kpiThreshold) {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.june} style={{ color: "black", backgroundColor: "#4BB543" }}  />
                                    </td>
                                  )
                                }
                                else {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.june} style={{ color: "black", backgroundColor: "#FA113D" }}  />
                                    </td>
                                  )
                                }
                              })()}
                              {(() => {
                                if (data.month.july >= data.kpiThreshold) {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.july} style={{ color: "black", backgroundColor: "#4BB543" }}  />
                                    </td>
                                  )
                                }
                                else {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.july} style={{ color: "black", backgroundColor: "#FA113D" }} />
                                    </td>
                                  )
                                }
                              })()}
                              {(() => {
                                if (data.month.august >= data.kpiThreshold) {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.august} style={{ color: "black", backgroundColor: "#4BB543" }} />
                                    </td>
                                  )
                                }
                                else {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.august} style={{ color: "black", backgroundColor: "#FA113D" }} />
                                    </td>
                                  )
                                }
                              })()}
                              {(() => {
                                if (data.month.september >= data.kpiThreshold) {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.september} style={{ color: "black", backgroundColor: "#4BB543" }}  />
                                    </td>
                                  )
                                }
                                else {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.september} style={{ color: "black", backgroundColor: "#FA113D" }} />
                                    </td>
                                  )
                                }
                              })()}
                              {(() => {
                                if (data.month.october >= data.kpiThreshold) {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.october} style={{ color: "black", backgroundColor: "#4BB543" }} />
                                    </td>
                                  )
                                }
                                else {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.october} style={{ color: "black", backgroundColor: "#FA113D" }}  />
                                    </td>
                                  )
                                }
                              })()}
                              {(() => {
                                if (data.month.november >= data.kpiThreshold) {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.november} style={{ color: "black", backgroundColor: "#4BB543" }}  />
                                    </td>
                                  )
                                }
                                else {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.november} style={{ color: "black", backgroundColor: "#FA113D" }} />
                                    </td>
                                  )
                                }
                              })()}
                              {(() => {
                                if (data.month.december >= data.kpiThreshold) {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.december} style={{ color: "black", backgroundColor: "#4BB543" }}  />
                                    </td>
                                  )
                                }
                                else {
                                  return (
                                    <td className="yearValue">
                                      <input type="number" placeholder={data.month.december} style={{ color: "black", backgroundColor: "#FA113D" }} />
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
                  
                </form>
              </>)}

            </div>
            
  )
}

export default DiDataEntryScreenTable