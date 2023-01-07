import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "./page/Home";
import SignUp from "./page/SignUp";
// import UserDashboard from "./page/UserDashboard";
import Private from "./components/layout/Private";
import Certificate from "./page/Certificate";
import PdfDownload from "./page/PdfDownload";
import ForgotPassword from "./page/ForgotPassword";

const MyRoute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          <Route path="/" element={<Private />}>
            <Route path='/filldetails' element={<Certificate />} />
            <Route path='/downloadpdf' element={<PdfDownload />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default MyRoute