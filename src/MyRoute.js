import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "./page/Home";
import SignUp from "./page/SignUp";
import User from "./page/User";
import UserDashboard from "./page/UserDashboard";

const MyRoute = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/viewusers' element={<User/>}/>
        <Route path='/userdashboard' element={<UserDashboard/>}/>


      </Routes>
    </Router>
    </>
  )
}

export default MyRoute