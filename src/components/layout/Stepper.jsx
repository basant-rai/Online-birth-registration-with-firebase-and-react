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
    <div className="sm:mx-4 py-4 sm:px-4 flex justify-between items-center">
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
