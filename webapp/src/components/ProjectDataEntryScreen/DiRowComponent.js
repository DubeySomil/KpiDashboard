import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "./DataEntryScreenTableStyle.css";
import Modal from 'react-bootstrap/Modal';
import  { CardList, cardList }  from 'react-bootstrap-icons';
import { Label } from 'recharts';
import { Button, Input } from 'reactstrap';

function DiRowComponent(props) {
    const {january,february,march,april,may,june,july,august,september,october,november,december} =props.details.month

var months = [{name:"jan"},{name:"feb"},{name:"march"},{name:"april"},{name:"may"},{name:"june"},{name:"july"},{name:"aug"},{name:"sep"},{name:"oct"},{name:"nov"},{name:"dec"}]
var iconMonths = [{name:"january"},{name:"february"},{name:"march"},{name:"april"},{name:"may"},{name:"june"},{name:"july"},{name:"august"},{name:"september"},{name:"october"},{name:"november"},{name:"december"}]

const[modalname,setModalname] = useState()   
const[modalValue,setModalValue] = useState()  
const[inputId,setInputId]=useState()
const [show, setShow] = useState(false);
const[dataInModal,setDataInModal]=useState("")

let reverseKpi = ['DDBD','DDAD','Release Defect Density']

useEffect(()=>{},[])

const handleClose = () => {

 setShow(false);
 }

 const handleShow = (option) =>{ 
  setModalname(option.nam)
  setModalValue(option.val)
   console.log(option.nam)
   console.log(option.val)
   setShow(true);


 }
 
let[input,setInput] = useState({
    "january":january,
    "february":february,
    "march":march,
    "april":april,
    "may":may,
    "june":june,
    "july":july,
    "august":august,
    "september":september,
    "october":october,
    "november":november,
    "december":december
})
let[justificationInput,setJustificationInput] = useState({
  "januaryJustification":props.justiData.monthJustiDTO.january,
  "februaryJustification":props.justiData.monthJustiDTO.february,
  "marchJustification":props.justiData.monthJustiDTO.march,
  "aprilJustification":props.justiData.monthJustiDTO.april,
  "mayJustification":props.justiData.monthJustiDTO.may,
  "juneJustification":props.justiData.monthJustiDTO.june,
  "julyJustification":props.justiData.monthJustiDTO.july,
  "augustJustification":props.justiData.monthJustiDTO.august,
  "septemberJustification":props.justiData.monthJustiDTO.september,
  "octoberJustification":props.justiData.monthJustiDTO.october,
  "novemberJustification":props.justiData.monthJustiDTO.november,
  "decemberJustification":props.justiData.monthJustiDTO.december
})


const changeModalValue = (e) =>{
   let v = e.target.value;
   let n = e.target.name;
   
   setJustificationInput({...justificationInput,[n]:v})
    
  const index = props.justification.findIndex(object=>{
    return object.kpiId === props.details.kpiId
  })
  console.log("INDEX",index)
    if(index !== -1){
      props.justification[index].monthJustiDTO = justificationInput
    }


 setJustificationInput({...justificationInput,[modalname]:e.target.value})
}

const checkThreshold = (options)=>{
  let val = options.val;
  let month = options.month
  let num = input[month]
  if(!reverseKpi.includes(props.details.kpiName)){
  if(val>= props.details.kpiThreshold){
    return(<td className='yearValue'><input name={month} value={num}   style={{backgroundColor:"#198754"}}  ></input></td>)
  }
  else{
    return(<td className="yearValue"><input  name={month} value={num}   style={{backgroundColor:"#D0342C"}}  ></input></td>)
  }}
  else{
    if(val> props.details.kpiThreshold){
      return(<td className='yearValue'><input name={month} value={num}   style={{backgroundColor:"#D0342C"}}  ></input></td>)
    }
    else{
      return(<td className="yearValue"><input  name={month} value={num}   style={{backgroundColor:"#198754"}}  ></input></td>)
    }
  }
}
useEffect(()=>{
     setInput(props.details.month)
     setJustificationInput(
      props.justiData.monthJustiDTO
    )
},[props.details])

  return (
    
    <>
         

     <tr >
     <td className="kpiNameValue"><input value ={props.details.kpiName} style={{fontWeight:"bold",marginLeft:"2%"}}></input></td>
     <td className="thresholdNameValue"><input value ={props.details.kpiThreshold} style={{fontWeight:"bold"}}></input></td>
      {checkThreshold({val:january,month:"january"})}
      {checkThreshold({val:february,month:"february"})}
      {checkThreshold({val:march,month:"march"})}
      {checkThreshold({val:april,month:"april"})}
      {checkThreshold({val:may,month:"may"})}
      {checkThreshold({val:june,month:"june"})}
      {checkThreshold({val:july,month:"july"})}
      {checkThreshold({val:august,month:"august"})}
      {checkThreshold({val:september,month:"september"})}
      {checkThreshold({val:october,month:"october"})}
      {checkThreshold({val:november,month:"november"})}
      {checkThreshold({val:december,month:"december"})}
     </tr>
     <tr>
        <td></td>
        <td></td>
      {
          iconMonths.map((dat,index)=>{
            return(
              <>       
              <td  className="yearValue">
              <input type="text" className="justificationInput" name={dat.name.concat("Justification")} value={justificationInput[dat.name]}  onClick={(e) =>handleShow({val:e.target.value,nam:e.target.name})}></input>
              <CardList className="tableIcon"></CardList>
             </td>
             </>   )
    
  })
}
</tr>
<Modal show={show} onHide={handleClose}  size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered >
      <Modal.Header closeButton>
        <Modal.Title>KPI Justification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Label>Enter  KPI Justification</Label>
          <Input type="text" id="inputID" name={modalname} value={justificationInput[modalname]} readOnly style={{height:"auto",overflow:"auto",maxWidth:"100%"}}></Input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" style={{backgroundColor:"black"}} onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" style={{backgroundColor:"black"}} onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
      
    </Modal>
   </>
  )
  
}

export default DiRowComponent