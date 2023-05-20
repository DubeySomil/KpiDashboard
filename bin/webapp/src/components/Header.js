import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useEffect, useState } from 'react';
import { doLogout, getCureentUser } from '../auth';
import { isLoggedIn } from '../auth';
import "./Style.css"
import { Navigate, useNavigate } from 'react-router-dom';
import ButtonWithoutBackground from './Buttons/ButtonWithoutBackground';
import { Button } from 'reactstrap';

function Header() {
  let navigate = useNavigate();
  const [login, setLogin] = useState();
  const [user, setUserDetails] = useState(null);


  useEffect(() => {
    setLogin(isLoggedIn());
    setUserDetails(getCureentUser())
    //console.log( user)
  }, [login])

  const logout = () => {
    doLogout(() => {
      setLogin(false)
      navigate('/')
    })
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <Container>
        <Navbar.Brand href="/PrivateRoute/ManagerDashboard" style={{marginLeft:"-5%"}}>KPI Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {login && (
            <>
            <Nav className="me-auto">
            <Nav.Link  href="/PrivateRoute/AddProject">Add Project</Nav.Link>
            <Nav.Link href="/PrivateRoute/ProjectDataEntry">Project Data Entry</Nav.Link>
            <Nav.Link href="/PrivateRoute/Charts">Charts</Nav.Link>
            <Nav.Link  href="/PrivateRoute/Information">Information</Nav.Link>
            {(() => {
                  if (user.data.userRole === "Admin") {
                    return (
                        <Nav.Link  href="/PrivateRoute/UserDashboard">User Management</Nav.Link>
                    )
                  }
                })()}
          </Nav>
           <Nav>

           <NavDropdown title = {`Hello ${user.data.userFirstName}`} id="collasible-nav-dropdown">
           <NavDropdown.Item href="/PrivateRoute/ProfilePage">Profile</NavDropdown.Item>
               <NavDropdown.Item  href="/PrivateRoute/ChangePassword">Change Password
               </NavDropdown.Item>
              <NavDropdown.Item> <button style={{backgroundColor:"white",border:"none"}} onClick={logout}>logout</button></NavDropdown.Item> 
               <NavDropdown.Divider />
             </NavDropdown>
           </Nav>
            </> )}

            {
              !login &&(
                <>
          <Nav className="me-auto">
            <Nav.Link  href="/Signup">Signup</Nav.Link>
            <Nav.Link  href="/">Login</Nav.Link>
           
          </Nav>
                </>
              )
            }
         
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
