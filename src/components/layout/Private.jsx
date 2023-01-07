import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/isAuthenticated";

const Private = () => {
 
  return <>{isAuthenticated() ? <Outlet /> : <Navigate to="/" />}</>;
};

export default Private;
