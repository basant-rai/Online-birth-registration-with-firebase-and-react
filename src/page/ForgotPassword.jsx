import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { auth } from "../firebase-config";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const handlePassword = useCallback(
    async (data) => {
      setMessage("");
      setError("");
      const { email } = data;
      try {
        await sendPasswordResetEmail(auth, email);
        setMessage("Please check your email to reset password");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        setError(error.message);
      }
    },
    [navigate]
  );
  return (
    <div>
      <Navbar />
      <form
        onSubmit={handleSubmit(handlePassword)}
        className="form-signin mx-auto mt-10"
      >
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
            <span>Forgot password</span>
          )}
        </button>
        {message && <div className="alert alert-danger mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default ForgotPassword;
