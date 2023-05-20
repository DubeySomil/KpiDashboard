import React from 'react'
import './ButtonWithoutBackground.css';


function ButtonWithoutBackground(props) {
 
  const classes =  props.className;
  
  return (
    <div>
      <button class={classes}  >{props.buttonName}</button>
    </div>
  )
}

export default ButtonWithoutBackground
