import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "reactstrap";
import "./ChangepasswordStyle.css"
import axios from "axios";
import Header from "../components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { doLogout } from "../auth";
import { useNavigate } from "react-router-dom";
function ChangePassword() {
  let navigate = useNavigate();
  const notify = (message) => toast(message);
  const schema = yup.object().shape({
    oldpassword: yup.string().required("This is a required feild"),
    password: yup.string().min(8).notOneOf([yup.ref("oldpassword")], "New password cannot be same as your previous password").matches(
      "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ).required("This is a required feild"),
    Verifypassword: yup.string().oneOf([yup.ref("password")], "Passwords donot match")
  })
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onCreatePost = (data) => {
    let a = JSON.parse(sessionStorage.getItem("data"))
    console.log(a)
    let oldpassword = data.oldpassword
    let password = data.password
    axios.put(`http://localhost:8080/kpi/v1/updatePassword/${a.data.userName}`, {
      oldpassword,
      password
    }).then((res) => {

      notify("Password updated successfully")
      setTimeout(doLogout(() => {
        navigate("/")
      }), 5000)
    }
    )
      .catch((err) => {
        const message = err.response.data.message;
        notify(message);
      }
      )
  }

    return(
     <>
     <Header></Header>
     <form  onSubmit={handleSubmit(onCreatePost)} style={{marginTop:"-1%"}}>
     <MDBContainer  className=' me-auto ' >

    <MDBCard  className="m-auto h-90 mt-3" style={{border:"solid 1px black",justifyContent:"center"}}>
    <MDBRow className='g-0'>

    <MDBCol md='20'>
      <MDBCardBody className='d-flex flex-column ' style={{marginTop:"3%"}} >

                  <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px', fontWeight: "bold" }}>Change your account's password</h5>

                  <MDBInput wrapperClass='mb-4' label='Current password' placeholder="Enter your current password" id='formControlLg' type='password' size="lg" {...register("oldpassword")} />
                  {<p style={{ color: 'red' }}>{errors.oldpassword?.message}</p>}
                  <MDBInput wrapperClass='mb-4' label='New password' placeholder="Enter your new password" id='formControlLg' type='password' size="lg" {...register("password")} />
                  {<p style={{ color: 'red' }}>{errors.password?.message}</p>}
                  <div style={{display:"flex"}}>
                  <label>Re Enter password</label>
                  <MDBInput wrapperClass='mb-4' 
                  // label='Re Enter password'
                    placeholder="Re enter your new password" id='formControlLg' type='password' size="lg" {...register("Verifypassword")} style={{ marginBottom: "-2%" }} />
                  </div>
                  {<p style={{ color: 'red' }}>{errors.Verifypassword?.message}</p>}

                  <Button style={{ backgroundColor: "#555555", overflow: "hidden", marginBottom: "5px", marginTop: "-2%" }}  >Change Password</Button>

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

        </MDBContainer>
      </form>
    </>

  )
}
export default ChangePassword;
