import React from 'react'

function Button() {
  return (
    <div>
      <a className="btn btn-primary" href="#" role="button">Link</a>
<button className="btn btn-primary" type="submit">Button</button>
<input className="btn btn-primary" type="button" value="Input"/>
<input className="btn btn-primary" type="submit" value="Submit"/>
<input className="btn btn-primary" type="reset" value="Reset"></input>
    </div>
  )
}

export default Button
