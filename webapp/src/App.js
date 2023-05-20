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
import Information from './pages/Information';
import Login from './pages/Login';
import ManagerDashboard from './pages/ManagerDashboard';
import ProfilePage from './pages/ProfilePage';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import ChangePassword from './pages/ChangePassword'
import Reports from './pages/Reports';
import Charts3 from './components/ChartDisplay/Charts3';
import Charts2 from './components/ChartDisplay/Charts2';
import Charts from './components/ChartDisplay/Charts';
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<Login />} />
        <Route path='/Signup' element={<Signup></Signup>} />
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='PrivateRoute' element={<PrivateRoute />}>

          <Route path='/PrivateRoute/ManagerDashboard' element={<ManagerDashboard />} />
          <Route path='/PrivateRoute/UserDashboard' element={<UserDashboard />} />
          <Route path='/PrivateRoute/AddProject' element={<AddProject />} />
          <Route path='/PrivateRoute/ProjectDataEntry' element={<ProjectDataEntry />} />
          <Route path='/PrivateRoute/ProfilePage' element={<ProfilePage />} />
          <Route path='/PrivateRoute/UserDashboard' element={<UserDashboard />} />
          <Route path='/PrivateRoute/Information' element={<Information />} />
          <Route path='/PrivateRoute/StaticInformation' element={<StaticInformation />}></Route>
          <Route path='/PrivateRoute/SatisfactionSprintHealth' element={<SatisfactionSprintHealth />}></Route>
          <Route path='/PrivateRoute/QualityKpi' element={<QualityKpi />}></Route>
          <Route path='/PrivateRoute/LeanKpi' element={<LeanKpi />}></Route>
          <Route path='/PrivateRoute/ChangePassword' element={<ChangePassword></ChangePassword>}> </Route>
          <Route path='/PrivateRoute/Reports' element={<Reports />} />
          <Route path='/PrivateRoute/Charts1' element={<Charts />} />
          <Route path='/PrivateRoute/Charts2' element={<Charts2 />} />
          <Route path='/PrivateRoute/Charts3' element={<Charts3 />} />

        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
