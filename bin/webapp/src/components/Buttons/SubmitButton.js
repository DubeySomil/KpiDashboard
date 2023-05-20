import React from 'react';
import './SubmitButton.css'


const SubmitButton = () =>{

    const clickHandler = () =>{
        
        console.log("Form Submitted");
    }

    return(
    <button onClick={clickHandler} className='submit-button'>Submit</button>
    )

}

export default SubmitButton;
