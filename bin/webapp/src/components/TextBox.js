
import SubHeadBar from "./Header/SubHeader_1";
import ExpenseForm2 from "./InputForm/InputForm2";
import './TextBox.css';
const TextBox = () => {
    return (
      <div className="Text-box">
      
      <SubHeadBar option1="Existing user" option2="Add new user from active directory"/>
      <div className="form-style">
        <ExpenseForm2/>
      </div>
      </div>
    );
  }
  
  export default TextBox;
  