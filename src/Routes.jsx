import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import About from './component/About';
import Body from './component/Body';
import SignIn from './component/SignIn';
import PostBusiness from './component/PostBusiness';
import Contact from './component/Contact';
import Dashboard from './component/Dashboard';
import PrivateRoute from './component/PrivateRoute';
import SignUp from './component/SignUp';
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
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import UserLayout from './layouts/UserLayout';




function AppRoutes() {
     const location = useLocation();

     useEffect(() => {
          // Scroll to the top whenever the pathname changes
          window.scrollTo(0, 0);
     }, [location.pathname]);
     return (
          <Routes>
               <Route path='/' element={<MainLayout />}>
                    <Route index element={<Body />} />
                    <Route path='about' element={<About />} />
                    <Route path='contact' element={<Contact />} />
               </Route>
               <Route path='/auth' element={<AuthLayout />}>
                    <Route path='signin' element={<SignIn />} />
                    <Route path='signup' element={<SignUp />} />
               </Route>

               <Route path='/member' element={<UserLayout />}>
                    <Route path='dashboard' element={<UserDashboard />} />
                    <Route path='user-all' element={<UserManagePage />} />
                    <Route path='user-pending' element={<UserPendingBusiness />} />
                    <Route path='user-add' element={<UserAddBusiness />} />
                    <Route path='user-logout' element={<UserLogout />} />
               </Route>

               <Route path='/dashboard' element={<AdminPrivateRoute element={<Dashboard />} />} />
               <Route exact path='/admin' element={<AdminLogin />} />
               <Route exact path='/post' element={<PrivateRoute />} />
               <Route exact path='/all-users' element={<AllUser />} />
               <Route exact path='/all-business' element={<AllBusinesses />} />
               <Route exact path='/add-users' element={<AddUser />} />
               <Route exact path='/logout' element={<AdminLogOut />} />
               <Route exact path='/add' element={<AddBusiness />} />
               <Route exact path='/pending' element={<PendingApproval />} />
               <Route exact path='manage-admin' element={<ManageAdmin />} />
               <Route exact path='add-admin' element={<AddAdmin />} />
          </Routes>
     );
}

export default AppRoutes;
