import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  signInWithEmailAndPassword,
 
} from "firebase/auth";
import { auth } from "../firebase-config";

const Home = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setSuccess(true)   
     } catch (error) {
      console.log(error.message);
      setError("Username and password incorrect")
    }
  };
  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };
  const redirect = () => {
    if (success) {
        return navigate("/viewusers");

      }
  };
  return (
    <>
      <Navbar />
      {showError()}
      {redirect()}
      <main className="form-signin w-50 m-auto">
        <h4 className="mt-3 text-primary fw-bold fs-1 text-center">Online Birth Registration</h4>
        <div className="mt-5" >
          <h1 className="h3 mb-3 fw-normal">Applicant login</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mt-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" onClick={login}>
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">
            Don't have account?&nbsp;
            <Link to="/signup" className="text-primary">
              SignUp
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
