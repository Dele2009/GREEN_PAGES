import { Outlet } from "react-router-dom"
import Footer from "../component/Footer"

const AuthLayout = () => {
     return (
          <div className="overflow-x-hidden">
               <Outlet />
               <Footer />
          </div>
     )
}

export default AuthLayout;