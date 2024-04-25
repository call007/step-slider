import { useMemo, useState } from "react";
import { StepSliderInput } from "./StepSliderInput";

export function SecondStepSliderExample() {
  const [currentStep, setCurrentStep] = useState(0);
  const [value, setValue] = useState(() => STEPS_LIST[currentStep].value);

  const highlightedFrom = useMemo(
    () => STEPS_LIST.findIndex((step) => step.isHighlighted),
    [STEPS_LIST]
  );

  const disabledSteps = useMemo(
    () =>
      STEPS_LIST.reduce<number[]>(
        (prevSteps, nextSteps, index) =>
          nextSteps.isDisabled ? [...prevSteps, index] : prevSteps,
        []
      ),
    [STEPS_LIST]
  );

  return (
    <StepSliderInput
      value={value}
      steps={STEPS_LIST.length}
      currentStep={currentStep}
      highlightedFrom={highlightedFrom}
      disabledSteps={disabledSteps}
      onChange={(nextValue) => {
        setValue(nextValue);

        const closestStep = STEPS_LIST.reduce((prevStep, currStep) =>
          !currStep.isDisabled &&
          Math.abs(currStep.value - nextValue) <=
            Math.abs(prevStep.value - nextValue)
            ? currStep
            : prevStep
        );

        const nextCurrentStep = STEPS_LIST.findIndex(
          (step) => step.value === closestStep.value
        );

        setCurrentStep(nextCurrentStep);
      }}
      onCurrentStepChange={(nextCurrentStep) => {
        setCurrentStep(nextCurrentStep);
        setValue(STEPS_LIST[nextCurrentStep].value);
      }}
      tooltipContent={
        <>
          <span>{STEPS_LIST[currentStep].title}</span>

          {STEPS_LIST[currentStep].subtitle && (
            <span>{STEPS_LIST[currentStep].subtitle}</span>
          )}
        </>
      }
    />
  );
}

const STEPS_LIST = [
  {
    value: 0,
    title: "0 ETH",
  },
  {
    value: 10,
    subtitle: "10%",
    title: "10 ETH",
    isDisabled: true,
  },
  {
    value: 50,
    title: "50 ETH",
    subtitle: "50%",
    isHighlighted: true,
  },
  {
    value: 60,
    subtitle: "60%",
    title: "60 ETH",
  },
  {
    value: 90,
    subtitle: "90%",
    title: "90 ETH",
    isDisabled: true,
  },
  {
    value: 100,
    subtitle: "100%",
    title: "100 ETH",
  },
];
