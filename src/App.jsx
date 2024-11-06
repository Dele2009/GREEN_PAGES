import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import About from './component/About';
import Body from './component/Body';
import SignIn from './component/SignIn';
import PostBusiness from './component/PostBusiness';
import Contact from './component/Contact';
import Dashboard from './component/Dashboard';
import PrivateRoute from './component/PrivateRoute';
import SignUp from './component/SignUp';
import Loader from './component/Loader';
import AdminLogin from './component/AdminLogin';
import AllBusinesses from './component/AllBusinesses';
import AddBusiness from './component/AddBusiness';
import AllUser from './component/AllUser';
import AdminLogOut from './component/AdminLogOut';
import AddUser from './component/AddUser';
import PendingApproval from './component/PendingApproval';
import ManageAdmin from './component/ManageAdmin';
import AddAdmin from './component/AddAdmin';
import UserDashboard from './component/UserDashboard';
import UserManagePage from './component/UserManagePage';
import UserPendingBusiness from './component/UserPendingBusiness';
import AdminPrivateRoute from './component/AdminPrivateRoute';
import UserLogout from './component/UserLogout';
import UserAddBusiness from './component/UserAddBusiness';




function App() {
  const [loading, setLoading] = useState(false)

  //loader functionality

  useEffect (()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <Router>
    <div className="App">
    {
      loading?<Loader/>:
      <Routes>
        <Route exact path='/' element={<Body/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/signin' element={<SignIn/>}/>
        <Route exact path='/signup' element={<SignUp/>}/>
        <Route exact path='/admin' element={<AdminLogin/>}/>
        <Route exact path='/post' element={<PrivateRoute />}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/dashboard' element={<AdminPrivateRoute element={<Dashboard/>}/>} />
        <Route exact path='/all-users' element={<AllUser/>}/>
        <Route exact path='/all-business' element={<AllBusinesses/>}/>
        <Route exact path='/add-users' element={<AddUser/>}/>
        <Route exact path='/logout' element={<AdminLogOut/>}/>
        <Route exact path='/add' element={<AddBusiness/>}/>
        <Route exact path='/pending' element={<PendingApproval/>}/>
        <Route exact path='manage-admin' element={<ManageAdmin/>}/>
        <Route exact path='add-admin' element={<AddAdmin/>}/>
        <Route exact path='/user-dashboard' element={<UserDashboard element={<UserDashboard/>} />}/>
        <Route exact path='/user-all' element={<UserManagePage/>}/>
        <Route exact path='/user-pending' element={<UserPendingBusiness/>}/>
        <Route exact path='/user-add' element={<UserAddBusiness/>}/>
        <Route exact path='/user-logout' element={<UserLogout/>}/>
      </Routes>
    }
   </div>
    </Router>
  );
}

export default App;
