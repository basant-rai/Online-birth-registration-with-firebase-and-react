import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepContextProvider } from "../components/context/StepContext";
import Address from "../components/layout/Address";
import Navbar from "../components/layout/Navbar";
import PersonalDetails from "../components/layout/PersonalDetails";
import Stepper from "../components/layout/Stepper";
import Verification from "../components/layout/Verification";
import { auth } from "../firebase-config";

const Certificate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Details", "Address", "Verification"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <PersonalDetails handleClick={handleClick} />;
      case 2:
        return <Address handleClick={handleClick} />;
      case 3:
        return <Verification handleClick={handleClick} />;
      default:
    }
  };
  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("jwt");
    return navigate("/");
  };

  return (
    <div className="">
      <Navbar />
      <div className="mx-auto container sm:px-8 bg-white rounded-xl pb-5 ">
        <div className="horizontal container mt-5 ">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <div className="">
          <StepContextProvider>{displayStep(currentStep)}</StepContextProvider>
        </div>
        <div className=" w-100 mt-3">
          <button
            onClick={logout}
            className="bg-danger w-100 px-5 py-2 rounded text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
