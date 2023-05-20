import React from "react";
import Header from "../Header";
import OnlyDisplayHeader from "../Header/OnlyDisplayHeader";
import InformationNavBar from "./InformationNavBar";
import "./StaticInformation.css";

function StaticInformation() {
  return (
    <>
    <Header/>
    <InformationNavBar/>
      <OnlyDisplayHeader displayName="Pace and Value" />
      <table className="infoTable">
        {/* Table head */}
        <tr>
          {/* <th></th> */}
          <th>KPI</th>
          <th>Definition </th>
          <th>Objective</th>
          <th>Calculations</th>
          <th>Frequency</th>
        </tr>

        {/* table data */}
        <tr>
          <td> Velocity Rate (Vr) </td>
          <td>
            Velocity rate is the number of story points burned by the team in
            one day
          </td>
          <td>
            Velocity helps the development team determine how much work it can
            take-on in a given sprint. It also allows individuals to make
            high-level estimates for how long a project will take. <br /><br /> The
            development team can also use velocity to determine its efficiency
            and growth by following its velocity over time
          </td>
          <td>
            A = Sum of the story points corresponding to the user story
            delivered and demonstrated at the end of Sprint. <br /> B = Team
            development capacity <br /><br />
            <b> Velocity Rate = A/B </b>
             <br /><br /> <b> Alert </b>= Inconsistent
            velocity rate across the sprint
          </td>
          <td>each sprint</td>
        </tr>

        <tr>
          <td>Predictability (PDTB)</td>
          <td>
            Number of US demonstrated at the end of Sprint compared to planned
            US
          </td>
          <td>
            Measuring ""Churn"" in agile.
            <br />
            <br /> In addition to the raw velocity that
            we want to continually improve, we also want to improve our
            predictability (Being able to declare when you are going to deliver
            something)
          </td>
          <td>
            "A = Sum of the story points corresponding to the users story
            delivered and demonstrated at the end of Sprint <br /> B (team commitment)
            = Sum of the story points corresponding to the planned user story of
            the Sprint planning meeting. <br /><br />
            Predictability = (A / B) * 100
            <br /><br /> 
            <b>Alert </b>: <span>&#60;</span> X% (X = 90) (continuously for 2 sprints)
          </td>
          <td>each sprint</td>
        </tr>

        <tr>
          <td>Bouncing back stories</td>
          <td>
            The ratio of user stories that bounce back to backlog from a sprint.
          </td>
          <td>
            Opportunity to assess the probable issues with code , requirements ,
            data, environments etc…
          </td>
          <td>
            A = Number of stories planned for a sprint <br /> B = Number of Stories
            which could not be completed and was pushed back to backlog (to be
            done in another sprint) <br /><br /> <b> Bouncing ratio = B/A*100 <br /> Alert </b>= when the
            ratio is higher than 10% or 20%
          </td>
          <td>at each sprint</td>
        </tr>

        <tr>
          <td>Value Delivered</td>
          <td>
            This is a cumulative ratio of value delivered to customer (sprint
            after sprint) ** This Metric required PO to assign business value to
            each story
          </td>
          <td>
            The main goal of measuring business value metrics is to track cost
            management , but the overall point of employing them is to
            communicate a company's progression toward certain long- and
            short-term objectives
          </td>
          <td>
            <b> Value delivered </b> = total business value of Epics / total business
            value for all Epics in a product backlog * 100 <br /><br /> <b> Goal </b>= Value
            delivered should be high during initial sprints
          </td>
          <td>each sprint / PI / Release</td>
        </tr>

        <tr>
          <td>Sprint Burndown</td>
          <td>
            The number of hours remaining to complete the stories planned for
            the current sprint, for each day during the sprint
          </td>
          <td>
            The objective is to have a clear view on how much value a sprint has
            already delivered and how close we are to completing our commitment
            to customers
          </td>
          <td>
            Burndown could be measured based on story points OR task hours. With
            of these can be modeled using the burndown chart <br /><br /> ** Use the tool
            (JIRA) to generate the sprint burndown graph <br /><br /> Alert = Deviation for
            the ideal path
          </td>
          <td>each sprint</td>
        </tr>
      </table>
    </>
  );
}

export default StaticInformation;
