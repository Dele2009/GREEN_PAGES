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
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import ERROR_4_0_4 from './component/404';




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

               <Route
                    path='/member'
                    element={
                         <ProtectedRoute>
                              <UserLayout />
                         </ProtectedRoute>
                    }
               >
                    <Route path='dashboard' element={<UserDashboard />} />
                    <Route path='all-businesses' element={<UserManagePage />} />
                    <Route path='pending-businesses' element={<UserPendingBusiness />} />
                    <Route path='add-business' element={<UserAddBusiness />} />
                    <Route path='user-logout' element={<UserLogout />} />
               </Route>

               <Route path='/admin-login' element={<AdminLogin />} />
               
               <Route
                    path='/admin'
                    element={
                         <AdminPrivateRoute>
                              <AdminLayout />
                         </AdminPrivateRoute>
                    }
               >
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='all-businesses' element={<AllBusinesses />} />
                    <Route path='add-business' element={<AddBusiness />} />
                    <Route path='pending-businesses' element={<PendingApproval />} />
                    <Route path='manage-admin' element={<ManageAdmin />} />
                    <Route path='add-admin' element={<AddAdmin />} />
                    <Route path='all-users' element={<AllUser />} />
                    <Route path='add-users' element={<AddUser />} />

               </Route>
               <Route path='/post' element={<PrivateRoute />} />
               <Route path='*' element={<ERROR_4_0_4/>} />
               {/* <Route path='/logout' element={<AdminLogOut />} /> */}
          </Routes>
     );
}

export default AppRoutes;
