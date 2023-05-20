import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import './ChartsNavBar.css'
function ChartsNavBar() {
    const location = useLocation();
    return (<>
        <div className="topnav">
            <Nav className="me-auto">
            <Link to="/PrivateRoute/Charts1" className={location.pathname === '/PrivateRoute/Charts1' ? 'active' : ''}>Charts For Single Project</Link>
        {/* <Link to="/PrivateRoute/Charts2" className={location.pathname === '/PrivateRoute/Charts2' ? 'active' : ''}>Charts 2</Link> */}
        <Link to="/PrivateRoute/Charts3" className={location.pathname === '/PrivateRoute/Charts3' ? 'active' : ''}>Charts for Multiple Project</Link>
      </Nav>
        </div>
    </>
    )
}
export default ChartsNavBar;
