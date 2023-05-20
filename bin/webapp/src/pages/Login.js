import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import Header from '../components/Header';
import { getDefaultNormalizer } from "@testing-library/react"
import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row } from "reactstrap"
import Base from "../components/Base"
import { dologin, doLogout, isLoggedIn } from "../auth"
import ButtonWithoutBackground from "../components/Buttons/ButtonWithoutBackground"
import './loginpage.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Login() {

    const [loginName, setLoginName] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const navigation = useNavigate();
    let namefeild;
    const navigate = useNavigate();
    const userLogin = () => {
        const notify = (message) => toast(message);

        if(loginName === "" || loginPassword === "")
        {
            notify("Username or Password cannot be Blank"); 
        }
        // Webservice call
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
    const login = isLoggedIn()
  return (
    <> 
      <Header></Header>
    { !login && (
    <MDBContainer  className=' me-auto '>

      <MDBCard  className="m-auto h-45" style={{border:"solid 1px black",justifyContent:"center"}}>
        <MDBRow className='g-0'>

          <MDBCol md='20'>
            <MDBCardBody className='d-flex flex-column '>

              <div className='d-flex flex-row mt-2' style={{textAlign:"center"}}>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">KPI Dashboard</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg" onChange={(e)=>setLoginName(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={(e)=>setLoginPassword(e.target.value)}/>

              <Button  style={{backgroundColor:"#555555",overflow:"hidden",marginBottom:"5px",marginTop:"-2%"}}  onClick={userLogin}>Login</Button>
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/Signup" style={{color: '#393f81'}}>Register here</a></p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
            <ToastContainer
                                    position="top-center"
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

    </MDBContainer>)}
    {login && (
        userLogin()
    )}
    </>
  );
}

export default Login;