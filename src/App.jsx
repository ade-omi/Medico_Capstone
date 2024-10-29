// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
     
//     </>
//   )
// }

// export default App

// My Version starts from here 

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavbarSection from './components/Navbar';
import Footer from './components/Footer';
import PatientSignup from './pages/PatientSignup';
import DoctorSignup from './pages/DoctorSignup';
import DoctorLogin from './pages/DoctorLogin';
import PatientLogin from './pages/PatientLogin';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';


function App(){
  return (

    <Router> 
        <NavbarSection /> 
        <Routes>
            {/* Homepage */}

            <Route path='/' element={<Home /> } /> 

            <Route path='/patient-signup' element={<PatientSignup /> }  /> 
            <Route path='/doctor-signup' element={<DoctorSignup /> } /> 
            <Route path='/doctor-login' element={<DoctorLogin />} />
            <Route path='/patient-login' element={<PatientLogin />} />
            <Route path='/patient-dashboard' element={<PatientDashboard />} />
            <Route path='/doctor-dashboard' element={ <DoctorDashboard /> } />

        </Routes>
        <Footer /> 
    </Router>


  );
}

export default App;