// import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();
  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };
  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign({
        description: step,
        completed: false,
        highlighted: index === 0 ? true : false,
        selected: index === 0 ? true : false,
      })
    );
    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);
  return (
    <div className="mx-4 p-4 d-flex justify-between items-center">
      {newStep.map((step, index) => (
        <div
          key={index}
          className={
            index !== newStep.length - 1
              ? "w-full flex items-center"
              : "flex items-center"
          }
        >
          <div className="relative d-flex flex-col items-center text-teal-600">
            <div
              className={`rounded-xl transition duration-500 ease-in-out bg-gray-300 h-12 w-24 flex items-center justify-center py-3  ${
                step.selected ? "bg-primary text-white " : ""
              }`}
            >
              {/* {step.completed ? (
                <span className="text-white font-bold text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-check-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                  </svg>
                </span>
              ) : (
                )} */}
                {step.description}
            </div>
           
          </div>
          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
              step.completed ? "border-primary" : "border-gray-300 "
            }  `}
          ></div>
        </div>
      ))}
    </div>
  );
};
export default Stepper;
