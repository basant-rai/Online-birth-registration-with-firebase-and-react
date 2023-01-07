import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { useForm } from "react-hook-form";
import "./style.css";
import { isAuthenticated } from "../utils/isAuthenticated";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleSignUp = async (data) => {
    setError("");
    console.log(data);
    const {
      first_name,
      last_name,
      middle_name,
      email,
      password,
      phone_number,
    } = data;
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        first_name,
        last_name,
        middle_name,
        phone_number
      );
      await setDoc(doc(db, "user_info", user.user.uid), {
        email,
        phone_number,
      });
      await setDoc(doc(db, "user", user.user.uid), {
        first_name,
        last_name,
        middle_name,
      });
      await setDoc(doc(db, "user_address", user.user.uid), {});
      await setDoc(doc(db, "user_document", user.user.uid), {});
      setSuccess("New user created");
      reset();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  return (
    <>
      {!isAuthenticated() ? (
        <div>
          <Navbar />
          <main className="form-signin m-auto">
            <form onSubmit={handleSubmit(handleSignUp)} className="mt-2">
              <h1 className="h3 mb-3 fw-normal text-white">
                Applicant Registration
              </h1>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="f-name"
                  placeholder="Jonn"
                  {...register("first_name", { required: true })}
                />
                <label htmlFor="f-name">First Name</label>
              </div>
              {errors.first_name && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
              <div className="form-floating mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Jonn"
                  {...register("middle_name")}
                />
                <label htmlFor="f-name">Middle Name</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  type="text"
                  className="form-control"
                  {...register("last_name", { required: true })}
                  placeholder="Doe"
                />
                <label htmlFor="l-name">Last Name</label>
              </div>
              {errors.last_name && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
              <div className="form-floating mt-3">
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => e.target.value}
                  placeholder="Doe"
                  {...register("phone_number", { required: true })}
                />
                <label htmlFor="num">Mobile Number</label>
              </div>
              {errors.phone_number && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
              <div className="form-floating mt-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  {...register("email", { required: true })}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              {errors.email && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
              <div className="form-floating mt-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              {errors.password && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
              <div className="checkbox mt-3">
                <label>
                  <input
                    type="checkbox"
                    value="remember-me"
                    {...register("accept", { required: true })}
                  />
                  <span className="ms-1 text-white">
                    I accept all terms & condition
                  </span>
                </label>
              </div>
              {errors.accept && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
              <button
                className=" w-100 btn btn-lg btn-primary mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <span>Register</span>
                )}
              </button>
              <p className="mt-2 mb-3 text-white text-center">
                Already have an account?
              </p>
              <Link to="/" className="account text-white btn w-100 ">
                Login
              </Link>
              {success && (
                <div className="alert alert-success mt-3">{success}</div>
              )}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          </main>
        </div>
      ) : (
        <Navigate to="/userdashboard" />
      )}
    </>
  );
};

export default SignUp;
