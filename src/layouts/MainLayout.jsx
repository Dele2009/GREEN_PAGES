import { Outlet } from "react-router-dom"
import Header from "../component/Header"
import Footer from "../component/Footer"

const MainLayout = () =>{
     return(
          <div className="overflow-x-hidden">
               <Header />
               <Outlet />
               <Footer/>
          </div>
     )
}

export default MainLayout;