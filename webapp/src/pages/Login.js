import React from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';
import Header from '../components/Header';
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { dologin, isLoggedIn } from "../auth"
import './loginpage.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';




function Login() {

  const [loginName, setLoginName] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const navigate = useNavigate();
  const userLogin = () => {
    const notify = (message) => toast(message);
    axios.post("http://localhost:8080/kpi/login", {
      loginName,
      loginPassword
    }).then(response =>
      dologin(response, () => {
        notify("Login Successfull")
        navigate("/PrivateRoute/ManagerDashboard")
      })
    ).catch(err => {
      const message = err.response.data.message;
      notify(message);
    })

  }
  const [visible,setVisible] = useState(false)
  const userAccess = () => {

    const notify = (message) => toast(message);
    setVisible(true)
    axios.post("http://localhost:8080/kpi/access", {
      loginName,
      loginPassword
    }).then(response =>{
      setVisible(false)
      notify(response.data)}
    ).catch(err => {
      const message = err.response.data.message;
      setVisible(false)
      notify(message);
    })

  }
  const login = isLoggedIn()
  return (
    <>
   
      {visible && (
        <>
      <Header></Header>

          <div style={{ zindex: "22", margin: "20% auto", textAlign: "center", justifyContent: "center" }}>
            <h4>Requesting for access...</h4>
            
            <Spinner animation="grow" variant="info" style={{ zIndex: "22", fontSize: "50px", margin: "auto" }}></Spinner>
          </div>
        </>
      )}

     
        <>
      {!login && (
        <>
      <Header></Header>

        <MDBContainer className=' me-auto '>

          <MDBCard className="m-auto h-45" style={{ border: "solid 1px black", justifyContent: "center", boxSizing: "border-box", overflow: "hidden" }}>
            <MDBRow className='g-0'>

              <MDBCol md='20'>
                <MDBCardBody className='d-flex flex-column '>

                  <div className='d-flex flex-row mt-2' style={{ textAlign: "center" }}>
                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                    <span className="h1 fw-bold mb-0">KPI Dashboard</span>
                  </div>

                  <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                  <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg" onChange={(e) => setLoginName(e.target.value)} />
                  <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setLoginPassword(e.target.value)} />

                  <Button style={{ backgroundColor: "#555555", overflow: "hidden", marginBottom: "5px", marginTop: "-2%" }} onClick={userLogin}>Login</Button>
                  <p className="mb-1 mt-1 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="/Signup" style={{ color: '#393f81' }}>Register here</a></p>
                  <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Access Required? <Button onClick={userAccess} style={{ backgroundColor: "white", border: "none", color: "black", marginTop: "-1%" }}>Click here</Button></p>
                  {/* <Button style={{ backgroundColor: "#555555", overflow: "hidden", marginBottom: "5px", marginTop: "-2%" }} onClick={userAccess}>Want Access?</Button> */}


                </MDBCardBody>
                <ToastContainer
                  position="top-center" k
                  autoClose={1000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                />
              </MDBCol>

            </MDBRow>
          </MDBCard>

        </MDBContainer>
        </>)}
        </>
        
      {login && (
        userLogin()
      )}
    </>
  );
}

export default Login;