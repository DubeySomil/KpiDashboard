import SearchButton from '../Buttons/searchButton';
import SubmitButton from '../Buttons/SubmitButton';
import './InputForm2.css';

const ExpenseForm2 = () =>{
    return(
        <form>
  
  <input className='existing-user-form' type="text" id="fname" name="fname" placeholder="First name"/>
  
  <input className='existing-user-form' type="text" id="lname" name="lname" placeholder="Last name"/>

  <input className='existing-user-form' type="email" id="email" name="email" placeholder="Email"/>
   
  <SubmitButton/>
  <SearchButton/>
  
</form>
    )

}

export default ExpenseForm2;