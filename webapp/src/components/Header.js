import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useEffect, useState } from 'react';
import { doLogout, getCureentUser } from '../auth';
import { isLoggedIn } from '../auth';
import "./Style.css"
import { Link,useNavigate } from 'react-router-dom';


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

  

  return (<>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" ystyle={{height:"auto !important"}}>
      {/* <Container> */}
        <Navbar.Brand href="/PrivateRoute/ManagerDashboard" style={{marginLeft:"1%"}}> KPI Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {login && (
            <>
            <Nav className="me-auto" >
            {(() => {
                  if (user.data.userRole.roleName === "Admin") {
                    return (
                      <>
                        <Link to="/PrivateRoute/AddProject" style={{marginLeft:'10px'}}>Add Project</Link>
                        <Link to="/PrivateRoute/ProjectDataEntry" style={{marginLeft:'10px'}}>Project Data Entry</Link>
                        <Link to="/PrivateRoute/Reports" style={{marginLeft:'10px'}}>Reports</Link>
                        <Link to="/PrivateRoute/Information" style={{marginLeft:'10px'}}>Information</Link>
                        <Link to="/PrivateRoute/UserDashboard" style={{marginLeft:'10px'}}>User Management</Link>
                    </>)
                  }
                })()}
                  {(() => {
                  if (user.data.userRole.roleName === "DI") {
                    return (
                      <>
                        <Link to="/PrivateRoute/ProjectDataEntry">Project Data Entry</Link>
                        <Link to="/PrivateRoute/Reports">Reports</Link>
                        <Link  to="/PrivateRoute/Information">Information</Link>
                    </>)
                  }
                })()}
                
                {(() => {
                  if (user.data.userRole.roleName === "Manager") {
                    return (
                      <>
                       <Link  to="/PrivateRoute/AddProject">Add Project</Link>
                        <Link to="/PrivateRoute/ProjectDataEntry">Project Data Entry</Link>
                        <Link to="/PrivateRoute/Reports">Reports</Link>
                        <Link  to="/PrivateRoute/Information">Information</Link>
                    </>)
                  }
                })()}
                
          </Nav>
           <Nav style={{marginTop:"0.5%" , marginRight:"2%"}}>
           <p data-letters={`${user.data.userFirstName[0]}`.toUpperCase()}></p>
             <NavDropdown title = {`Hello ${user.data.userFirstName}`}  id="collasible-nav-dropdown"> 
           <NavDropdown.Item href="/PrivateRoute/ProfilePage">Profile</NavDropdown.Item>
               <NavDropdown.Item  href="/PrivateRoute/ChangePassword">Change Password
               </NavDropdown.Item>
              <NavDropdown.Item> <button style={{backgroundColor:"white",border:"none"}} onClick={logout}>logout</button></NavDropdown.Item> 
             
               
             </NavDropdown>
           </Nav>
            </> )}

            {
              !login &&(
                <>
          <Nav className="me-auto">
            <Link  to="/Signup">Signup</Link>
            <Link  to="/">Login</Link>
           
          </Nav>
          
                </>
              )
            }
            
        </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>

           </>
  );
}

export default Header;
