import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import { useEffect } from 'react';

export default function UserProfile() {

    var user = JSON.parse(sessionStorage.getItem("data"))
    console.log(user.data)
    var status = "";
    if(user.data.userStatus === true) {
        status = "Active"
    }else {
        status = "Disabled"
    }
    
    useEffect(()=>{
    let a = JSON.parse(sessionStorage.getItem("data"))
        
          console.log(a.data.userStatus)  
    },[])
  return (
    <>
    <section style={{ backgroundColor: '#eee',height:"100vh" }}>
      <MDBContainer className="py-5" style={{overflow:"hidden"}}>
         
        <MDBRow  style={{height:"100vh",width:"80vw"}}>
          <MDBCol lg="4">
            <MDBCard className="mb-4" >
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ height:"37vh" }}
                  fluid />
               
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Name:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.data.userFirstName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.data.userEmail}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Role:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.data.userRole.roleName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Status</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{status}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
               
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
}