import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import LeanKpi from './components/InformationDisplay/LeanKpi';
import QualityKpi from './components/InformationDisplay/QualityKpi';
import SatisfactionSprintHealth from './components/InformationDisplay/SatisfactionSprintHealth';
import StaticInformation from './components/InformationDisplay/StaticInformation';
import PrivateRoute from './components/PrivateRoute';
import ProjectDataEntry from './components/ProjectDataEntryScreen/ProjectDataEntry';
import AddProject from './pages/AddProject';
import Charts from './pages/Charts';
import Information from './pages/Information';
import Login from './pages/Login';
import ManagerDashboard from './pages/ManagerDashboard';
import ProfilePage from './pages/ProfilePage';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import ChangePassword from './pages/ChangePassword'
function App() {
  return (
   <BrowserRouter>
     <Routes>
         
          <Route path='' element= {<Login/>} />
          <Route path='/Signup' element= {<Signup></Signup>} />
          <Route path= 'PrivateRoute' element = {<PrivateRoute/>}>

            
          <Route path= '/PrivateRoute/ManagerDashboard' element = {<ManagerDashboard/>}/>
          <Route path= '/PrivateRoute/UserDashboard' element = {<UserDashboard/>}/>
          <Route path= '/PrivateRoute/AddProject' element = {<AddProject/>}/>
          <Route path= '/PrivateRoute/ProjectDataEntry' element = {<ProjectDataEntry/>}/>
          <Route path= '/PrivateRoute/Charts' element = {<Charts/>}/>
          <Route path= '/PrivateRoute/ProfilePage' element = {<ProfilePage/>}/>
          <Route path= '/PrivateRoute/UserDashboard' element = {<UserDashboard/>}/>
          <Route path= '/PrivateRoute/Information' element = {<Information/>}/>
          <Route path= '/PrivateRoute/StaticInformation' element = {<StaticInformation/>}></Route>
          <Route path= '/PrivateRoute/SatisfactionSprintHealth' element = {<SatisfactionSprintHealth/>}></Route>
          <Route path= '/PrivateRoute/QualityKpi' element = {<QualityKpi/>}></Route>
          <Route path= '/PrivateRoute/LeanKpi' element = {<LeanKpi/>}></Route>
          <Route path= '/PrivateRoute/ChangePassword' element = {<ChangePassword></ChangePassword>}> </Route>
          </Route>
      </Routes>
    </BrowserRouter>

  
  );
}

export default App;
