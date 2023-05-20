import React from 'react';
import './SubHeader_1.css';

const SubHeadBar = (props) =>{
    return(
        <div className='sub-Header-1'>

            <ul>
                <li><a class="active">{props.option1}</a></li>
                
                <li><a href="#contact">{props.option2}</a></li>
                
            </ul>
        </div>
    )
}

export default SubHeadBar;
