import React from 'react'
import "./InformationNavBar.css"
import Nav from 'react-bootstrap/Nav';
function InformationNavBar() {
  return (
    <div class="topnav">
    <Nav className="me-auto">
            <Nav.Link  href="/PrivateRoute/StaticInformation">Pace and Value</Nav.Link>
            <Nav.Link href="/PrivateRoute/SatisfactionSprintHealth">Satisfaction / Sprint Health</Nav.Link>

            <Nav.Link href="/PrivateRoute/QualityKpi">Quality KPI</Nav.Link>
            <Nav.Link  href="/PrivateRoute/LeanKpi">Lean KPI</Nav.Link>
            </Nav>
</div>
  )
}

export default InformationNavBar