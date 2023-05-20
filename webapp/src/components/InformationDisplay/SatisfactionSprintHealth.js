import React from "react";
import "./StaticInformation.css";
import OnlyDisplayHeader from "../Header/OnlyDisplayHeader";
import Header from "../Header";
import InformationNavBar from "./InformationNavBar";

function SatisfactionSprintHealth() {
  return (
    <>
    <Header/>
    <InformationNavBar/>
      <OnlyDisplayHeader displayName=" Sprint health" />
      <table className="infoTable">
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
          <td>User Satisfaction</td>
          <td>
            Measure the ability of the team to meet the client's expectations
            (team involvement).
          </td>
          <td>
            Objective is to overall gauge the user satisfaction and bring in
            improvements from user perspective
          </td>
          <td>
            At the end of the sprint demonstration, the business manager (s) and
            the end users present vote to express their satisfaction on the
            achievement of the sprint content, on a scale of 0 to 5. The overall
            satisfaction score is obtained by calculating the average of the
            different scores. Average grade (grades 0-5) Goal = 5
          </td>
          <td>at each demonstration</td>
        </tr>
        <tr>
          <td>Team Mood</td>
          <td>
            Using a 1-5 scale or smiley face indicators at retrospectives (or
            each day)
          </td>
          <td>
            Objective is to overall gauge the team mood though out the sprints
            and find out opportunities for better team engagement
          </td>
          <td>
            Individuals can assess either their own happiness, or make a
            subjective assessment of overall team happiness for discussion
          </td>
          <td>at each sprint</td>
        </tr>


        <OnlyDisplayHeader displayName="Satisfaction" />
        <tr>
          <td>Product Backlog health</td>
          <td>
            Product backlog has well groomed users stories for at-least "next" 2
            sprints
          </td>
          <td>
            Maintaining a healthy backlog for an agile / Monitor PO capacity to
            feed the development team
          </td>
          <td>
            "A = No of stories planned for current sprint B = No of groomed
            stories in the product backlog Product backlog health = Good (if A *
            2 <span>&#60;</span> B) Product backlog health = Poor (if A * 2{" "}
            <span>&#62;</span> B) Alert = backlog health is ""Poor"" for 2
            continuous sprints"
          </td>
          <td>at each sprint</td>
        </tr>
        <tr>
          <td>Dev vs non Dev ratio</td>
          <td>
            Ratio of Non development time Vs development time across sprint
          </td>
          <td></td>
          <td>
            "Let A = Time spent in ceremonies, grooming etc. (non development
            activities) Let B = Time spent in Dev activities <br/> <br/> <b> Development ratio </b> =
            B / (A+B) * 100-<br/> <br/> <b> Objective </b> = 20% of the Total Sprint Capacity"
          </td>
          <td>at each sprint</td>
        </tr>
        <tr>
          <td>Requirements Volatility</td>
          <td>
            Percentage of Number of User stories changed during the sprint Vs
            total number of User stories in that sprint Note - Types of changes
            can include added or increased, edited and deleted, scope/
            acceptance criteria etc.
          </td>
          <td>
            This quantifies the percent of requirements that change within each
            sprint. Since it is important to deliver working software at the end
            of each sprint, requirements creep/change needs to be controlled.
            Note - Volatility in the first few sprints is expected, but high
            volatility in a stable agile project may lead to a delayed release.
          </td>
          <td>
            A = No of stories changed during current sprint B = No of stories
            planned for current sprint <br/><br/> <b> Volatility </b> % = A/B * 100 <br/><br/> <b> Objective </b> = 0%
          </td>
          <td>at each sprint</td>
        </tr>
      </table>
    </>
  );
}

export default SatisfactionSprintHealth;
