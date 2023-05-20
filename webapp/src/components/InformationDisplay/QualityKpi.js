import React from "react";
import Header from "../Header";
import OnlyDisplayHeader from "../Header/OnlyDisplayHeader";
import InformationNavBar from "./InformationNavBar";
import "./StaticInformation.css";

function QualityKpi() {
  return (
    <>
      <Header />
      <InformationNavBar />
      <OnlyDisplayHeader displayName="Quality Kpi" />

      <table className="infoTable">
        {/* Table head */}
        <tr style={{position:"sticky",top:"0"}}>
          {/* <th></th> */}
          <th>KPI</th>
          <th>Definition </th>
          <th>Objective</th>
          <th>Calculations</th>
          <th>Frequency</th>
        </tr>

        {/* table data */}
        <tr>
          <td> Defect Density (Sprint wise)</td>
          <td>
            Number of defect created in a sprint vis-à-vis the estimated
            development days in a sprint
          </td>
          <td>
            the main goal is to assess the quality of software (on functional
            terms) and take appropriate actions before it is releases for
            production
          </td>
          <td>
            <b>
              
              Defect Density = (No of defects / Estimated development days) *
              100 
              <br /> <br /> Alert
            </b>
            : if DD is beyond the objective consistently for 2 or more sprint
          </td>
          <td>each sprint / Release / PI</td>
        </tr>

        <tr>
          <td>Coverage of Acceptance Criteria</td>
          <td>
            Check passing of acceptance criteria (tests against what has been
            specified by the product owner (PO) in the backlog
          </td>
          <td>
            The goal is to set a criteria for a software (or a user story) to be
            considered as a shippable software (user story)
          </td>
          <td>
            Coverage = (Number of acceptance test cases passed / total
            acceptance test case) * 100 <br />
            <br />
            <b> Alert </b>: if less than 90% of the functional tests of embedded
            user stories are implemented, or automated
          </td>
          <td>each user story / PI / Release</td>
        </tr>

        <tr>
          <td>Technical Debt</td>
          <td>
            "A measurement by using a suitable tool (for example : SonarCube,
            checkstyle etc...) The technical debt could be, a need for
            refactoring, documentation, non-blocking operation but having a
            potential impact on the maintenance and scalability of the system"
          </td>
          <td> Compliance with the technical Quality standards</td>
          <td>
            Setup the baseline (of technical debt) before starting the sprint <br /><br />
            Measure the technical debt for any new and incremental developments
            (compared to the baseline) <br /><br />
            <b> Alert : Blockers <span>&#62;</span> 0,
              Critical<span>&#62;</span> 0 </b> (for any new and incremental
            developments) <br /> ** these thresholds can be adapted based on project
            context
          </td>
          <td>After few sprints</td>
        </tr>
      </table>
    </>
  );
}

export default QualityKpi;
