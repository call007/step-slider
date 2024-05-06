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
      name="SecondStepSliderExample"
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
            <span style={{ fontSize: "12px", opacity: 0.5 }}>
              {STEPS_LIST[currentStep].subtitle}
            </span>
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
    value: 1000,
    title: "1000 ETH",
    subtitle: "10%",
  },
  {
    value: 2000,
    title: "2000 ETH",
    subtitle: "20%",
  },
  {
    value: 3000,
    title: "3000 ETH",
    subtitle: "30%",
    isHighlighted: true,
  },
  {
    value: 4000,
    title: "4000 ETH",
    subtitle: "40%",
    isDisabled: true,
  },
  {
    value: 5000,
    subtitle: "50%",
    title: "5000 ETH",
  },
  {
    value: 6000,
    subtitle: "60%",
    title: "6000 ETH",
  },
  {
    value: 7000,
    subtitle: "70%",
    title: "7000 ETH",
  },
  {
    value: 8000,
    subtitle: "80%",
    title: "8000 ETH",
  },
  {
    value: 9000,
    subtitle: "90%",
    title: "9000 ETH",
  },
  {
    value: 10000,
    subtitle: "100%",
    title: "10000 ETH",
  },
];
