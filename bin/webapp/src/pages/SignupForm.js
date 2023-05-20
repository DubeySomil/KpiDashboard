import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import "./SignupStlyle.css" 
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from "react-router-dom"
import { useState } from 'react';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function SignupForm() {

    const navigate = useNavigate();
    const[userFirstName,setUserFirstName] = useState('');
    const[userLastName,setUserLastName] = useState('');
    const[userName,setUserName] = useState('');
    const[userEmail,setUserEmail] = useState('');
    const[userPassword,setUserPassword] = useState('');
    
    const notify = (message) => toast(message);

    const schema = yup.object().shape({
      userFirstName: yup.string().required("This is a required feild"),
      userLastName: yup.string().required("This is a required feild"),
      userName:yup.string().required("This is a required feild"),
      userEmail:yup.string().email('Invalid email format').required("This is a required feild"),
      userPassword:yup.string().required("This is a required feild")
   }) 
  
  const {register , handleSubmit , formState:{errors} } = useForm({
      resolver: yupResolver(schema)
  })
  

const SubmitDetails = (data)=>{
       console.log(data)

    axios.post("http://localhost:8080/kpi/v1/",{
        userLastName,
        userFirstName,
        userName,
        userEmail,
        userPassword
    }).then((res)=>{
        notify("User Created Succesfully")
        setTimeout(goToLogin,2500)           
     })
       .catch((e)=>console.log(e))
}



const goToLogin = ()=>{
    navigate("/")
}

  return (
    <>
    <form onSubmit={handleSubmit(SubmitDetails)}>
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Create account</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput placeholder='Your Firstname' id='firstname' type='text' className='w-100' onChange={(e)=>setUserFirstName(e.target.value)} {...register("userFirstName")} required/>
                {/* {<p style = {{color:'red'}}>{errors.userFirstName.message}</p>} */}
              </div>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput placeholder='Your Lastname' id='lastname' type='text' className='w-100' onChange={(e)=>setUserLastName(e.target.value)}   {...register("userLastName")} required/>
                {/* {<p style = {{color:'red'}}>{errors.userLastName?.message}</p>} */}
              </div>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput placeholder='Userid' id='username' type='text' className='w-100' onChange={(e)=>setUserName(e.target.value)}  {...register("userName")} required/>
                {/* {<p style = {{color:'red'}}>{errors.userName?.message}</p>} */}
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput placeholder='Your Email' id='useremail' type='email' onChange={(e)=>setUserEmail(e.target.value)}  {...register("userEmail")} required />
                {/* {<p style = {{color:'red'}}>{errors.userEmail?.message}</p>} */}
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput placeholder='Password' id='password' type='password'  onChange={(e)=>setUserPassword(e.target.value)}  {...register("userPassword")} required/>
                {/* {<p style = {{color:'red'}}>{errors.userPassword?.message}</p>} */}
              </div>
              <button  type ="submit" style={{color:"black"}}  >Register</button>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
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
     </>
  );
}
export default SignupForm;

