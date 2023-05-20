
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "./DataEntryScreenTableStyle.css";
import Modal from 'react-bootstrap/Modal';
import  { CardList }  from 'react-bootstrap-icons';
import { Label } from 'recharts';
import { Button, Input } from 'reactstrap';


function CustomRowComponent(props) {
const {january,february,march,april,may,june,july,august,september,october,november,december} =props.details.month

var months = [{name:"jan"},{name:"feb"},{name:"march"},{name:"april"},{name:"may"},{name:"june"},{name:"july"},{name:"aug"},{name:"sep"},{name:"oct"},{name:"nov"},{name:"dec"}]
var iconMonths = [{name:"january"},{name:"february"},{name:"march"},{name:"april"},{name:"may"},{name:"june"},{name:"july"},{name:"august"},{name:"september"},{name:"october"},{name:"november"},{name:"december"}]

const[modalname,setModalname] = useState()   
const[modalValue,setModalValue] = useState()  
const[inputId,setInputId]=useState()
const [show, setShow] = useState(false);
const[dataInModal,setDataInModal]=useState("")

let reverseKpi = ['DDBD','DDAD','Release Defect Density']

const[dummyState,setDummyState] = useState(false)
const[dummyState2,setDummyState2] = useState(false) 

const handleClose = () => {
 setShow(false);
 }

 useEffect(()=>{
  const index = props.customJustification.findIndex(object=>{
    return object.customKpiId === props.details.customKpiId
  })
  console.log("INDEX for custom is ",index)
    if(index !== -1){
      props.customJustification[index].monthJustiDTO = justificationInput
    }
 },[dummyState2])

 useEffect(()=>{
  const index = props.customKpiList.findIndex(object=>{
    return object.customKpiId === props.details.customKpiId
  })
    if(index !== -1){
      props.customKpiList[index].month = input
    }
 },[dummyState])

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
  "januaryJustification":props.customJustiData.monthJustiDTO.january,
  "februaryJustification":props.customJustiData.monthJustiDTO.february,
  "marchJustification":props.customJustiData.monthJustiDTO.march,
  "aprilJustification":props.customJustiData.monthJustiDTO.april,
  "mayJustification":props.customJustiData.monthJustiDTO.may,
  "juneJustification":props.customJustiData.monthJustiDTO.june,
  "julyJustification":props.customJustiData.monthJustiDTO.july,
  "augustJustification":props.customJustiData.monthJustiDTO.august,
  "septemberJustification":props.customJustiData.monthJustiDTO.september,
  "octoberJustification":props.customJustiData.monthJustiDTO.october,
  "novemberJustification":props.customJustiData.monthJustiDTO.november,
  "decemberJustification":props.customJustiData.monthJustiDTO.december
})
const hell = (e)=>{
let v = e.target.value;
let n = e.target.name;
setInput({...input,[e.target.name]:e.target.value})
setDummyState(!dummyState)

}

const changeModalValue = (e) =>{
   let v = e.target.value;
   let n = e.target.name;
   setJustificationInput({...justificationInput,[n]:v})
    setDummyState2(!dummyState2)
  
}

const checkThreshold = (options)=>{
  let val = options.val;
  let month = options.month
  let num = input[month]
  if(!reverseKpi.includes(props.details.kpiName)){
  if(val>= props.details.customKpiThreshold){
    return(<td className='yearValue'><input name={month} value={num} onChange={(e)=> hell(e)}  style={{backgroundColor:"#198754"}}  ></input></td>)
  }
  else{
    return(<td className="yearValue"><input  name={month} value={num}  onChange={(e)=> hell(e)} style={{backgroundColor:"#D0342C"}}  ></input></td>)
  }}
  else{
    if(val> props.details.customKpiThreshold){
      return(<td className='yearValue'><input name={month} value={num} onChange={(e)=> hell(e)}  style={{backgroundColor:"#D0342C"}}  ></input></td>)
    }
    else{
      return(<td className="yearValue"><input  name={month} value={num}  onChange={(e)=> hell(e)} style={{backgroundColor:"#198754"}}  ></input></td>)
    }
  }
}
useEffect(()=>{
     setInput(props.details.month)
     setJustificationInput(
      props.customJustiData.monthJustiDTO
    )
},[props.details])

  return (
    
    <>
          <Modal show={show} onHide={handleClose}  size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered >
      <Modal.Header closeButton>
        <Modal.Title>KPI Justification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Label>Enter  KPI Justification</Label>
          <Input type="text" id="inputID" name={modalname} value={justificationInput[modalname]} onChange={(e)=>changeModalValue(e)}></Input>
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

     <tr >
     <td className="kpiNameValue"><input value ={props.details.customKpiName} style={{fontWeight:"bold"}}></input></td>
     <td className="thresholdNameValue"><input value ={props.details.customKpiThreshold} style={{fontWeight:"bold"}}></input></td>
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
   </>
  )
}

export default CustomRowComponent