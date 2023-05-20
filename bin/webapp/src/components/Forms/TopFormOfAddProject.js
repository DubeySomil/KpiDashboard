import React from "react";
import SubHeadBar from "../Header/SubHeader_1";
import "./TopFormOfAddProject.css";
function TopFormOfAddProject() {
  return (
    <div style={{ display: "flex", margin: "2%", overflow : "auto" , width : "100%" }}>
      <div>
        <table>
          <tr>
            <td>Project Name :</td>
            <td>
              <input
                className="InputOfAddProject"
                type="text"
                id="ProjectName"
                name="message"
                required = 'true'
                style={{ width: "180px" }}
              />
            </td>
          </tr>
          <tr>
            <td>Project Type :</td>
            <td>
              <select
                id="typeSelect"
                name="typeSelect"
                className="add-project-dropdown"
              >
                <option value="Airbus">Scrum</option>
                <option value="ST">Canban</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Project DU : </td>
            <td>
              <select
                id="duSelect"
                name="duSelect"
                className="add-project-dropdown">
                <option value="Aeroline">Aeroline</option>
                <option value="DU2">DU2</option>
                <option value="DU3">DU3</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <table>
          <tr>
            <td>ProjectBU :</td>
            <td>
              <select
                id="buSelect"
                name="buSelect"
                className="add-project-dropdown"
              >
                <option value="Airbus">Airbus</option>
                <option value="ST">ST</option>
                <option value="Thales">Thales</option>
                <option value="Saffran">Saffran</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Project Bundle : </td>
            <td>
              <select
                id="bundleSelect"
                name="bundleSelect"
                className="add-project-dropdown"
              >
                <option value="PCSC">PCSC</option>
                <option value="PMS">PMS</option>
                <option value="PCSC">PCSC</option>
                <option value="BS1">BS1</option>
                <option value="BT1">BT1</option>
                <option value="BSR1">BSR1</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
      <div style={{ display: "inline" }} className="dropdown-div">
        <label for="di">DI Responsible:</label>
        <br />
        <select id="diSelect" name="diSelect" className="add-project-dropdown">
          <option value="volvo">Ayushi</option>
          <option value="saab">Chitra</option>
          <option value="fiat">Varsha</option>
        </select>
      </div>
      <div className="dropdown-div">
        <label for="di">Methodology : </label>
        <br />
        <select id="diSelect" name="diSelect" className="add-project-dropdown">
          <option value="volvo">Waterfall</option>
          <option value="saab">Agile</option>
          <option value="fiat">Hybrid</option>
        </select>
      </div>
      {" "}
      <div className="dropdown-div">
        <label for="freq">Frequency : </label>
        <br />
        <select id="diSelect" name="diSelect" className="add-project-dropdown">
          <option value="Quarterly">Quarterly</option>
          <option value="AgiSprintWisele">AgiSprint wisele</option>
          <option value="TaskWise">Task wise</option>
          <option value="SubWise">Sub. wise</option>
          <option value="NoMonitoring">No Monitoring</option>
        </select>
      </div>
      <br />
    </div>
  );
}

export default TopFormOfAddProject;
