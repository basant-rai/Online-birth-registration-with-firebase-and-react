import React, { useCallback, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useForm } from "react-hook-form";
import "./style.css";
import { isAuthenticated } from "../utils/isAuthenticated";

const Home = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogIn = useCallback(
    async (data) => {
      console.log(data);
      setError("");
      const { email, password } = data;
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        const accessToken = await user.user.accessToken;
        const id = user.user.uid;
        localStorage.setItem("jwt", JSON.stringify({accessToken,id}));
        // localStorage.setItem("id", JSON.stringify(id));


        setTimeout(() => {
          navigate("/filldetails");
        }, 2000);
      } catch (error) {
        console.log(error.message);
        setError("Username and password incorrect");
      }
    },
    [navigate]
  );

  return (
    <>
      {!isAuthenticated() ? (
        <div>
          <Navbar />
          <main className="form-signin mx-auto">
            <form onSubmit={handleSubmit(handleLogIn)} className="">
              <h1 className="h3 mb-3 fw-normal text-white">Applicant login</h1>
              <div className="form-floating">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
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
              <button
                type="submit"
                className="btn btn-lg btn-primary mt-2 w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <span>Sign in</span>
                )}
              </button>
              <p className="mt-3 mb-3 text-white text-center">
                Don't have account?&nbsp;
              </p>
              <Link
                to="/signup"
                className="account text-white btn  w-100 py-2 "
              >
                Create-account
              </Link>
              {error && <div className="alert alert-danger mt-5">{error}</div>}
            </form>
          </main>
        </div>
      ) : (
        <Navigate to="/filldetails" />
      )}
    </>
  );
};

export default Home;
