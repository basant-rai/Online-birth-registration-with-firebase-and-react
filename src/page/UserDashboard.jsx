import React from "react";
import Navbar from "../components/Navbar";
import {
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";


const UserDashboard = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    return navigate('/')
  };
  return (
    <div>
      <Navbar />
      <h4 className="mt-3 text-primary fw-bold fs-1 text-center ">
          Online Birth Registration
        </h4>
      <div className="border border-primary w-50 mx-auto px-5 py-5 rounded mt-5">
      <h3 className="mx-auto text-center mt-2">
        Please fill your details of birth certificate
      </h3>
      <form className="">
        <div className="row">
          <div className="form-floating mt-3 w-full col">
            <input
              type="text"
              className="form-control"
              id="f-name"
              placeholder="Jonn"
              onChange={(e) => e.target.value}
              required
            />
            <label htmlFor="f-name">First/Middle Name</label>
          </div>

          <div className="form-floating mt-3 w-full col">
            <input
              type="text"
              onChange={(e) => e.target.value}
              className="form-control"
              id="l-name"
              placeholder="Doe"
              required
            />
            <label htmlFor="l-name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="form-floating mt-3 col">
            <input
              type="n"
              className="form-control"
              onChange={(e) => e.target.value}
              id="num"
              placeholder="gname"
              required
            />
            <label htmlFor="num">GrandFather Name</label>
          </div>
          <div className="form-floating mt-3 col">
            <input
              type="date"
              onChange={(e) => e.target.value}
              className="form-control"
              id="dob"
              required
              placeholder="dob"
              
            />
            <label htmlFor="dob">Date of birth</label>
          </div>
        </div>

        <div className="form-floating mt-3">
          <input
            onChange={(e) => e.target.value}
            type="text"
            className="form-control"
            id="F"
            required
            placeholder="fname"

          />
          <label htmlFor="F">Father Name</label>
        </div>
        <div className="form-floating mt-3">
          <input
            onChange={(e) => e.target.value}
            type="text"
            className="form-control"
            id="M"
            required
            placeholder="mname"
          />
          <label htmlFor="M">Mother Name</label>
        </div>
        <h3 className="mt-4">Permanent</h3>
        <div className="row">
          <div className="form-floating mt-2 col">
            <input
              onChange={(e) => e.target.value}
              type="text"
              className="form-control"
              id="a"
              required
              placeholder="fname"

            />
            <label htmlFor="a">Address</label>
          </div>
          <div className="form-floating mt-2 col">
            <input
              onChange={(e) => e.target.value}
              type="text"
              className="form-control"
              id="d"
              required
              placeholder="fname"

            />
            <label htmlFor="d">District</label>
          </div>
        </div>
        <button type="submit" className="bg-success px-5 py-2 mt-2 rounded text-white">
          Save
        </button>
      </form>
      </div>
      <div className="text-center">
      <button onClick={logout} className="bg-primary px-5 py-2 mt-2 rounded text-white">
          LogOut
        </button>
      </div>
      
    </div>
  );
};

export default UserDashboard;
