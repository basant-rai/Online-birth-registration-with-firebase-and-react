import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  createUserWithEmailAndPassword
  ,
} from "firebase/auth";
import { auth } from "../firebase-config";

const SignUp = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        password
      );
      console.log(user);
      setSuccess("Ne user create");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };

  const showSuccess = () => {
    if (success) {
      return <div className="alert alert-success">{success}</div>;
    }
  };

  return (
    <>
      <Navbar />
      {showError()}
      {showSuccess()}

      <main className="form-signin w-50 m-auto">
        <h4 className="mt-3 text-primary fw-bold fs-1 ">
          Online Birth Registration
        </h4>
        <div className="mt-3">
          <h1 className="h3 mb-3 fw-normal">Applicant Registration</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="f-name"
              placeholder="Jonn"
              onChange={(e) => e.target.value}
            />
            <label htmlFor="f-name">First/Middle Name</label>
          </div>
          <div className="form-floating mt-3">
            <input
              type="text"
              onChange={(e) => e.target.value}
              className="form-control"
              id="l-name"
              placeholder="Doe"
            />
            <label htmlFor="l-name">Last Name</label>
          </div>
          <div className="form-floating mt-3">
            <input
              type="number"
              className="form-control"
              onChange={(e) => e.target.value}
              id="num"
              placeholder="Doe"
            />
            <label htmlFor="num">Mobile Number</label>
          </div>
          <div className="form-floating mt-3">
            <input
              type="email"
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mt-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3 mt-3">
            <label>
              <input type="checkbox" value="remember-me" /> I accept all terms &
              condition
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" onClick={register}>
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">
            Already have an account?&nbsp;
            <Link to="/">LogIn</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignUp;
