import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Form, Table } from "reactstrap";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "reactstrap";
import { Navigate, useNavigate } from "react-router-dom";
import "./DataEntryScreenTableStyle.css";
import OnlyDisplayHeader from "../Header/OnlyDisplayHeader";
import CustomKpiPage from "./CustomKpiPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RowComponent from "./RowComponent";

const DataEntryScreenTable2 = ({ id }) => {
  const [dummyState, setDummyState] = useState(0);
  const [selectedYear, setSelectedYear] = useState(
    parseInt(new Date().getFullYear())
  );
  const [kpiList, setKpiList] = useState([
    {
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
      },
    },
  ]);

  const [customKpiList, setCustomKpiList] = useState([
    {
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
        december: 0,
      },
      reasonDecember: "",
    },
  ]);
  const notify = (message) => toast(message);
  const navigate = useNavigate();
  const { register, handleSubmit, errors, reset } = useForm([
    { defaultValues: kpiList },
  ]);
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    reset: reset1,
  } = useForm({ defaultValues: customKpiList });

  useEffect(
    () => {
      axios
        .get(`http://localhost:8080/kpi/v3/${id}/${selectedYear}`)
        .then((res) => {
          console.log("project details->", res);
          setKpiList(res.data.kpis);
          setCustomKpiList(res.data.customKpis);
          reset(res.data);
          reset1(res.data);
        });
    },
    [reset, reset1, id, selectedYear, dummyState],
    
  );

  const getProjectByYear = (e) => {
    console.log(e);
    setSelectedYear(`${e.target.value}`);
    axios
      .get(`http://localhost:8080/kpi/v3/${id}/${selectedYear}`)
      .then((res) => {
        console.log(res);
        setCustomKpiList(res.data.customKpis);
        setKpiList(res.data.kpis);
      })
      .catch((e) => console.log(e));
  };
  const enlargeInput = (data) => {
    var btn = document.createElement("input");
    btn.type = "button";
    btn.name = "button";
    btn.value = "Click Me";
    btn.id = data.id;
    btn.innerHTML = "This is button label";
    btn.style.color = "black";

    var foo = document.getElementById(data.id);
    foo.appendChild(btn);
    //Now add button

    var text = document.getElementById(data.id);
    text.style.height = "100px";
    text.style.width = "150px";
    text.style.zIndex = "1";
    // if (text.style.display === "none") {
    //   text.style.display = "block";
    //   text.style.backgroundColor="red";
    // } else {
    //   text.style.display = "none";
    // }
    console.log(data.id);
    console.log(data.value);
  };

  const onSubmit2 = (data) => {
    console.log("custom kpi dta is ", data.customKpi);
    let projectId = parseInt(id);
    const customKpis = data.customKpi;
    customKpis.map((index) => {
      {
        if (index.january === "") {
          index.january = -1;
        }
        if (index.february === "") {
          index.february = -1;
        }
        if (index.march === "") {
          index.march = -1;
        }
        if (index.april === "") {
          index.april = -1;
        }
        if (index.may === "") {
          index.may = -1;
        }
        if (index.june === "") {
          index.june = -1;
        }
        if (index.july === "") {
          index.july = -1;
        }
        if (index.august === "") {
          index.august = -1;
        }
        if (index.september === "") {
          index.september = -1;
        }
        if (index.october === "") {
          index.october = -1;
        }
        if (index.november === "") {
          index.november = -1;
        }
        if (index.december === "") {
          index.december = -1;
        }
      }
    });
    let year = selectedYear;
    axios
      .post("http://localhost:8080/kpi/v3/updatecustom", {
        projectId,
        year,
        customKpis,
      })
      .then((res) => {
        notify("Custom Kpi's updated Successfully");
        setDummyState(!dummyState);
      })
      .catch((e) => console.log(e));
  };

  const onSubmit = (data) => {
    console.log("data", data);
    // console.log(data.kpi)
    let projectId = parseInt(id);
    // const kpi1  = Object.values(data);
    // const kpi1 = data.kpi
    //  console.log(kpi1)
    const kpis = data.kpi;
    console.log(kpis);
    kpis.map((index) => {
      {
        if (index.january === "") {
          index.january = -1;
        }
        if (index.february === "") {
          index.february = -1;
        }
        if (index.march === "") {
          index.march = -1;
        }
        if (index.april === "") {
          index.april = -1;
        }
        if (index.may === "") {
          index.may = -1;
        }
        if (index.june === "") {
          index.june = -1;
        }
        if (index.july === "") {
          index.july = -1;
        }
        if (index.august === "") {
          index.august = -1;
        }
        if (index.september === "") {
          index.september = -1;
        }
        if (index.october === "") {
          index.october = -1;
        }
        if (index.november === "") {
          index.november = -1;
        }
        if (index.december === "") {
          index.december = -1;
        }
      }
      console.log(kpis);
    });
    let year = selectedYear;
    axios
      .post("http://localhost:8080/kpi/v3/update", {
        projectId,
        year,
        kpis,
      })
      .then(() => {
        notify("Project Details updated successfully");
        setDummyState(!dummyState);
        //setTimeout(goToLogin,2500)
      })
      .catch((e) => console.log(e));
  };
  const goToLogin = () => {
    navigate("/PrivateRoute/ManagerDashboard");
  };
  let user = JSON.parse(sessionStorage.getItem("data"));
  let role = user.data.userRole;
  if (role !== "DI") {
    return (
      <div
        style={{
          borderCollapse: "collapse",
          backgroundColor: "rgb(243, 243, 243)",
          heihgt: "auto",
        }}
      >
       
        <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>KPI</h2>
        <table
          className="headingOfDataEntryScreen"
          style={{ overflow: "auto", border: "none" }}
        >
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

        <form onSubmit={handleSubmit(onSubmit)} style={{ height: "auto" }}>
      
            <table
              className="TableOfDataEntryScreen"
              style={{ width: "100%", border: "none" }}
            >
              <tbody>
                {kpiList.map((data, index) => {
                  let fieldName = `kpi[${index}]`;
                  // return <RowComponent props={data}></RowComponent>;
                })}
              </tbody>
            </table>
      

          <input
            type="submit"
            style={{
              backgroundColor: "blueviolet",
              color: "whitesmoke",
              marginBottom: "3%",
              marginRight: "1%",
              float: "right",
              padding: "7px",
              border: "solid black 2px",
              borderRadius: "15px",
            }}
          />
        </form>

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
};
export default DataEntryScreenTable2;
