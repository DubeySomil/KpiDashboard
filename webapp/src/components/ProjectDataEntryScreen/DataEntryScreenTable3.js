import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./DataEntryScreenTableStyle.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RowComponent from "./RowComponent";
import CustomRowComponent from "./CustomRowComponent";
import DiCustomRowComponent from "./DiCustomRowComponent";
import DiRowComponent from "./DiRowComponent";

function DataEntryScreenTable3({ id }) {
  const notify = (message) => toast(message);
  const [customKpiExist, setCustomKpiExist] = useState(false);
  var months = [{ name: "Jan" }, { name: "Feb" }, { name: "March" }, { name: "April" }, { name: "May" }, { name: "June" }, { name: "July" }, { name: "Aug" }, { name: "Sep" }, { name: "Oct" }, { name: "Nov" }, { name: "Dec" }]
  const [dummyState, setDummyState] = useState(0)
  const [selectedYear, setSelectedYear] = useState(parseInt(new Date().getFullYear()))
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState("")
  const [show, setShow] = useState(false);
  const [inputId, setInputId] = useState()
  const [dataInModal, setDataInModal] = useState("")
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
      december: 0,
    }
  }])
  const [justification, setJustification] = useState([{
    kpiId: 0,
    kpiName: "",
    kpiThreshold: 0,
    monthJustiDTO: {
      januaryJustification: "",
      februaryJustification: "",
      marchJustification: "",
      aprilJustification: "",
      mayJustification: '',
      juneJustification: "",
      julyJustification: "",
      augustJustification: "",
      septemberJustification: "",
      octoberJustification: "",
      novemberJustification: "",
      decemberJustification: ""
    }
  }])

  const [customJustification, setCustomJustification] = useState([{
    customKpiId: 0,
    customKpiName: "",
    customKpiThreshold: 0,
    monthJustiDTO: {
      januaryJustification: "",
      februaryJustification: "",
      marchJustification: "",
      aprilJustification: "",
      mayJustification: '',
      juneJustification: "",
      julyJustification: "",
      augustJustification: "",
      septemberJustification: "",
      octoberJustification: "",
      novemberJustification: "",
      decemberJustification: ""
    }
  }])

  const { register, handleSubmit, errors, reset } = useForm([{ defaultValues: kpiList }]);

  useEffect(() => {
    axios.get(`http://localhost:8080/kpi/v3/${id}/${selectedYear}`)
      .then((res) => {
        console.log("project details->", res.data.justification)
        setKpiList(res.data.kpis)
        setJustification(res.data.justification)

        console.log(res.data)
        if (res.data.customKpis.length !== 0) {
          setCustomKpiList(res.data.customKpis)
          setCustomJustification(res.data.customJustification)
          setCustomKpiExist(true)
        }
        //  reset(res.data)
        //   reset1(res.data)            
      })
  }, [id, selectedYear, dummyState])

  useEffect(() => {
    setCustomKpiExist(false)
  }, [selectedYear, id])

  const getProjectByYear = (e) => {
    console.log(e)
    setSelectedYear(`${e.target.value}`)
    axios.get(`http://localhost:8080/kpi/v3/${id}/${selectedYear}`)
      .then(res => {
        // console.log(res)
        setCustomKpiList(res.data.customKpis)
        setKpiList(res.data.kpis)
      })
      .catch((e) => console.log(e))

  }

  const onSubmit = (data) => {

    console.log("data", data)
    // console.log(data.kpi)
    // let projectId = parseInt(id)
    // const kpi1  = Object.values(data);
    // const kpi1 = data.kpi
    //  console.log(kpi1)
    // const kpis = data.kpi
    // console.log(kpis)
    // kpis.map((index) => {
    //   {
    //     index.map((x)=>{
    //       if(x=== ""){
    //         x = -1;
    //       }
    //     })   
    //   }
    //   console.log(kpis)
    // })
    // let year = selectedYear
    // axios.post("http://localhost:8080/kpi/v3/update", {
    //   projectId,
    //   year,
    //   kpis
    // }).then(() => {
    //   notify("Project Details updated successfully")
    //   setDummyState(!dummyState)
    //   //setTimeout(goToLogin,2500)  
    // })
    //   .catch((e) => console.log(e))

  };


  const handleClick = () => {
    let projectId = parseInt(id)
    const arr = []
    arr.push(id, selectedYear, kpiList, justification, customKpiList, customJustification)
    console.log(arr)
    const kpis = kpiList
    const customKpis = customKpiList
    let year = selectedYear
    axios.post("http://localhost:8080/kpi/v3/update", {
      projectId,
      year,
      kpis,
      justification,
      customKpis,
      customJustification

    }).then(() => {
      notify("Project Details updated successfully")
      //  setDummyState(!dummyState)
      //  setTimeo""ut(goToLogin,2500)  
      console.log("update succesfull")
    })
      .catch((e) => console.log(e))
  }


  const handleClose = () => {
    let data = document.getElementById("inputID").value;
    console.log(data);
    document.getElementById(inputId).value = data;
    setShow(false);
  }

  const handleShow = (e) => {
    console.log("ss", e.target.value)
    setShow(true);
    setInputId(e.target.id);
    setDataInModal(e.target.value)
  }

  const goToLogin = () => {
    navigate("/PrivateRoute/ManagerDashboard")
  }

  const setValue = (e) => {
    setInputVal(e.target.value);
    e.target.value = inputVal;
  }
  let user = JSON.parse(sessionStorage.getItem("data"))
  let role = user.data.userRole

  if (role.roleName !== "DI") {
    return (
      <div style={{ borderCollapse: "collapse", backgroundColor: "rgb(243, 243, 243)", height: "auto" }}>
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
            {months.map((data) => {
              return (
                <th style={{ textAlign: "center" }}>{data.name}</th>
              )
            })}
          </tr>
        </table>


        <table className="TableOfDataEntryScreen" style={{ width: "100%", border: "none", }}>
          <tbody>
            {kpiList.map((data, index) => {
              //  let fieldName = `kpi[${index}]`;
              //  <fieldset name={fieldName} key={fieldName}>

              return (<RowComponent details={data} n={index} kpiList={kpiList} setKpiList={setKpiList} justification={justification} setJustification={setJustification} justiData={justification[index]}></RowComponent>)
            })}

          </tbody>

        </table>
        {customKpiExist && (

          <>
            <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>Custom KPI</h2>
            <table className="headingOfDataEntryScreen" style={{ overflow: "auto", border: "none" }}>
              <tr>
                <th className="headingKpiName">KPI Name</th>
                <th className="headingThreshold">Threshold</th>
                {months.map((data) => {
                  return (
                    <th style={{ textAlign: "center" }}>{data.name}</th>
                  )
                })}
              </tr>
            </table>

            <table className="TableOfDataEntryScreen" style={{ width: "100%", border: "none" }}>
              <tbody>
                {customKpiList.map((data, index) => {
                  //  let fieldName = `kpi[${index}]`;
                  //  <fieldset name={fieldName} key={fieldName}>

                  return (<CustomRowComponent details={data} n={index} customKpiList={customKpiList} setCustomKpiList={setCustomKpiList} customJustification={customJustification} setCustomJustification={setCustomJustification} customJustiData={customJustification[index]}></CustomRowComponent>)
                })}

              </tbody>

            </table>
          </>

        )}

        <input type="submit" onClick={handleClick} style={{ backgroundColor: "blueviolet", color: "whitesmoke", marginBottom: "3%", marginRight: "1%", padding: "7px", border: "solid black 2px", borderRadius: "15px", float: "right", marginTop: "1%" }} />


        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

      </div>

    )
  }
  else {
    return (
      <div style={{ borderCollapse: "collapse", backgroundColor: "rgb(243, 243, 243)", height: "auto" }}>
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
            {months.map((data) => {
              return (
                <th style={{ textAlign: "center" }}>{data.name}</th>
              )
            })}
          </tr>
        </table>


        <table className="TableOfDataEntryScreen" style={{ width: "100%", border: "none", }}>
          <tbody>
            {kpiList.map((data, index) => {


              return (<DiRowComponent details={data} n={index} kpiList={kpiList} setKpiList={setKpiList} justification={justification} setJustification={setJustification} justiData={justification[index]}></DiRowComponent>)
            })}

          </tbody>

        </table>
        {customKpiExist && (

          <>
            <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>Custom KPI</h2>
            <table className="headingOfDataEntryScreen" style={{ overflow: "auto", border: "none" }}>
              <tr>
                <th className="headingKpiName">KPI Name</th>
                <th className="headingThreshold">Threshold</th>
                {months.map((data) => {
                  return (
                    <th style={{ textAlign: "center" }}>{data.name}</th>
                  )
                })}
              </tr>
            </table>

            <table className="TableOfDataEntryScreen" style={{ width: "100%", border: "none" }}>
              <tbody>
                {customKpiList.map((data, index) => {


                  return (<DiCustomRowComponent details={data} n={index} customKpiList={customKpiList} setCustomKpiList={setCustomKpiList} customJustification={customJustification} setCustomJustification={setCustomJustification} customJustiData={customJustification[index]}></DiCustomRowComponent>)
                })}

              </tbody>

            </table>

          </>

        )}

      </div>
    )
  }
}

export default DataEntryScreenTable3