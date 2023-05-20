import React from "react";
import Header from "../Header";
import OnlyDisplayHeader from "../Header/OnlyDisplayHeader";
import InformationNavBar from "./InformationNavBar";
import "./StaticInformation.css";
function LeanKpi() {
  return (
    <>
      <Header />
      <InformationNavBar />
      <OnlyDisplayHeader displayName="Lean Kpi" />
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
          <td>Lead time</td>
          <td>
            Total elapsed time from the point when a task (user story / Defect)
            enters a system (for example it is written up in a backlog or
            created in an Agile project tracking tool), until the time it is
            completed
          </td>
          <td>
            To assess the average lead time for a task and reduce it over a
            period of time by removing the wastages
          </td>
          <td>
            DATE 1 = Task creation date <br /> DATE 2 = Task completion date <br /><br /><b> Lead time </b>
            = DATE 2 - DATE 1 <br /> <br /> ** If a task goes in the backlog and sits there
            for six months, and then is built and delivered in one month, the
            lead time is seven months.
          </td>
          <td>At a fixed frequency (monthly / weekly)</td>
        </tr>

        <tr>
          <td>Cycle Time
          </td>
          <td>Total elapsed time from the point when a Task (user story / Defect) enters "In progress" status, until the time it is "Fixed and completed" status
          </td>
          <td>To assess the average lead time for a task and reduce it over a period of time by removing the wastages
          </td>
          <td>"DATE 1 = Task goes to ""in Progress"" state
            DATE 2 = Task goes to ""Completed"" state

            <br /><br /><b> Lead time </b> = DATE 2 - DATE 1

            <b> Goal </b>  : Average cycle time should be <span>&#60;</span>= half of iteration duration <br /> <br />

            **  If a Task gets stuck or bounces back from one state to another (for example bouncing between QA and Development), make sure to include all the time"
          </td>
          <td>At a fixed frequency (monthly / weekly)
          </td>
        </tr>

        <tr>
          <td>Feature Lead time
          </td>
          <td>Feature Lead Time is like Task Lead Time, but for features instead of Tasks (Since tasks are often bundled together and released as a feature)
          </td>
          <td>This Metric helps in identifying how long it takes a feature to go from an idea to production
          </td>
          <td>"DATE 1 = Feature creation date
            DATE 2 = Feature completion date

            <b> Feature Lead time</b> = DATE 2 - DATE 1

            <b> Goal </b> : To reduce the average Feature lead time (providing value to customer quickly)
            "
          </td>
          <td>At a fixed frequency (monthly / weekly)
          </td>
        </tr>

        <tr>
          <td> Task Through put
          </td>
          <td>It is the number of tasks (stories / defects)  completed per time unit  irrespective of their size (or complexity)
          </td>
          <td>This metric will provide the team represented on a Kanban board a way to track their performance over time
          </td>
          <td>No of Tasks (story/defect) completed in defined duration
          </td>
          <td>At a fixed frequency (monthly / weekly)
          </td>
        </tr>
      </table>
    </>
  );
}

export default LeanKpi;
