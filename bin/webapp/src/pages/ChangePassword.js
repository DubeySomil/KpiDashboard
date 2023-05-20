import React from "react";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Container, Form, FormGroup, Input } from "reactstrap";
import Base from "../components/Base";
import "./ChangepasswordStyle.css"
import Header from "../components/Header";
function ChangePassword() {
    const schema = yup.object().shape({
        oldpassword: yup.string().required("This is a required feild"),
        password: yup.string().notOneOf([yup.ref("oldpassword")],"New password cannot be same as your previous password").required("This is a required feild") 
    }) 
    const {register , handleSubmit , formState:{errors} } = useForm({
        resolver: yupResolver(schema)
    })
   
      const onCreatePost = (data) =>{
           console.log(data)
      }

    return(
     
     <>
     <Header></Header>
     <div className="box" >
        <form  className="create-form" onSubmit={handleSubmit(onCreatePost)}>
              <>
                <div>
                <label for="oldpassword" style={{fontWeight:"bold"}}>Old Password:</label>
                <input type="password" placeholder="Enter old password" id="oldpassword" {...register("oldpassword")} rows="10" cols="50" style={{marginLeft:"1%"}}/>
                {<p style = {{color:'red'}}>{errors.oldpassword?.message}</p>}
                </div>
                <div>
                <label for="password" style={{fontWeight:"bold"}}>New Password:</label>
                <input type="password" placeholder="Enter New Password" id="password" {...register("password")} rows="10" cols="50" style={{marginLeft:"1%"}}/>
                {<p style = {{color:'red'}}>{errors.password?.message}</p>}
                </div>
                <br></br>
                <input className="nav-btn" type="submit"/>
                </>
        </form>
        </div>
        </>
        
    )
}
export default ChangePassword;
