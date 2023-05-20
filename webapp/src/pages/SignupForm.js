import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
}
  from 'mdb-react-ui-kit';
import "./SignupStlyle.css"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Spinner from 'react-bootstrap/Spinner';

function SignupForm() {
  const [spinner, setSpinner] = useState(false)
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  const schema = yup.object().shape({
    userFirstName: yup.string().required("This is a required feild"),
    userLastName: yup.string(),
    userName: yup.string().required("This is a required feild"),
    userEmail: yup.string().email('Invalid email format').required("This is a required feild"),
    userPassword: yup.string().required("This is a required feild").matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    ReuserPassword: yup.string().oneOf([yup.ref("userPassword"), null], "Passwords donot match").required("This is a required feild"),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })


  const SubmitDetails = async (data) => {
    setSpinner(true)
    let userFirstName = data.userFirstName
    let userLastName = data.userLastName
    let userName = data.userName
    let userPassword = data.userPassword
    let userEmail = data.userEmail
    await axios.post("http://localhost:8080/kpi/v1/", {
      userLastName,
      userFirstName,
      userName,
      userEmail,
      userPassword
    }).then((res) => {
      setSpinner(false)
      notify("User Created Succesfully")
      setTimeout(goToLogin, 2000)
    })
      .catch((e) => {
        setSpinner(false)
        notify(e.response.data.message)
      })
  }



  const goToLogin = () => {
    navigate("/")
  }

  return (
    <>

      {

        spinner && (
          <>
          <div style={{ zindex: "22", margin: "20% auto", textAlign: "center", justifyContent: "center" }}>
            <h4>Please wait while the user is being registered</h4>
            <Spinner animation="grow" style={{ zIndex: "22", fontSize: "50px", margin: "auto" }}></Spinner>
            {/* <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark" /> */}
          </div>
       
          </>
        )
      }
      {!spinner && (
        <form onSubmit={handleSubmit(SubmitDetails)}>
          <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                    <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Create account</p>

                    <div className="d-flex flex-row align-items-center mb-4 " style={{ width: "400px" }} >
                      <MDBIcon fas icon="user me-3" size='lg' />
                      <MDBInput placeholder='Your Firstname' id='firstname' type='text' className='w-100'  {...register("userFirstName")} />
                      {<p style={{ color: 'red', display: "block" }}>{errors.userFirstName?.message}</p>}
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4 " style={{ width: "400px" }}>
                      <MDBIcon fas icon="user me-3" size='lg' />
                      <MDBInput placeholder='Your Lastname' id='lastname' type='text' className='w-100'   {...register("userLastName")} />
                      {<p style={{ color: 'red' }}>{errors.userLastName?.message}</p>}
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4 " style={{ width: "400px" }}>
                      <MDBIcon fas icon="user me-3" size='lg' />
                      <MDBInput placeholder='Userid' id='username' type='text' className='w-100'  {...register("userName")} />
                      {<p style={{ color: 'red' }}>{errors.userName?.message}</p>}
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4" style={{ width: "400px" }}>
                      <MDBIcon fas icon="envelope me-3" size='lg' />
                      <MDBInput placeholder='Your Email' id='useremail' type='email'   {...register("userEmail")} />
                      {<p style={{ color: 'red' }}>{errors.userEmail?.message}</p>}
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4" style={{ width: "400px" }}>
                      <MDBIcon fas icon="lock me-3" size='lg' />
                      <MDBInput placeholder='Password' id='password' type='password'    {...register("userPassword")} />
                      {<p style={{ color: 'red' }}>{errors.userPassword?.message}</p>}
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4" style={{ width: "400px" }}>
                      <MDBIcon fas icon="lock me-3" size='lg' />
                      <MDBInput placeholder='Re enter Password' id='Repassword' type='password'   {...register("ReuserPassword")} />
                      {<p style={{ color: 'red' }}>{errors.ReuserPassword?.message}</p>}
                    </div>

                    <button type="submit" style={{ color: "white",backgroundColor:"purple" }}  >Register</button>
                  </MDBCol>

                  <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                    <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                  </MDBCol>

                </MDBRow>
              </MDBCardBody>

            </MDBCard>
          </MDBContainer>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark" />

        </form>
      )}
      <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark" />
    </>
  );
}
export default SignupForm;

