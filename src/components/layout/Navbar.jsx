import React from "react";

const Navbar = () => {
  return (
    <div className="py-2 ">
      <div className="d-flex align-items-center justify-content-center ">
        <img src="/images/logo.png" alt="logo" className="me-4" style={{height:'150px'}}/>
        
      </div>
      <h4 className="mt-3 text-primary fw-bold text-center text-white" style={{fontSize:"52px"}}>
          Online Birth Registration
        </h4>
    </div>
  );
};

export default Navbar;
