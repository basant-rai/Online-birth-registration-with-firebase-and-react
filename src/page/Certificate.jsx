import { useState } from "react";
import { StepContextProvider } from "../components/context/StepContext";
import Address from "../components/layout/Address";
import Navbar from "../components/layout/Navbar";
import PersonalDetails from "../components/layout/PersonalDetails";
import Stepper from "../components/layout/Stepper";
import Verification from "../components/layout/Verification";

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
  
  return (
    <div className="">
      <Navbar />
      <div className="mx-auto container px-8 bg-white rounded-xl ">
        <div className="horizontal container mt-5 ">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <div className="pb-5">
          <StepContextProvider>{displayStep(currentStep)}</StepContextProvider>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
