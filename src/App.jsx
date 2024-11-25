// import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import AppRoutes from './Routes'
import Loader from './component/Loader';
import { ToastContainer } from 'react-toastify'





function App() {
  const [loading, setLoading] = useState(true)

  //loader functionality

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      <ToastContainer
        autoClose={7000}
        className='z-[9999999999] !w-fit !max-w-[600px]'
        closeOnClick
        newestOnTop
        draggable
        limit={4}
      />
      <Router>
        <div className="App">
          {
            loading ? <Loader /> : <AppRoutes />
          }
        </div>
      </Router>
    </>
  );
}

export default App;
