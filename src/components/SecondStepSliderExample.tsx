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
    value: 100,
    subtitle: "10%",
    title: "10 ETH",
    isDisabled: true,
  },
  {
    value: 5000,
    title: "50 ETH",
    subtitle: "50%",
    isHighlighted: true,
  },
  {
    value: 60000,
    subtitle: "60%",
    title: "60 ETH",
  },
  {
    value: 900000,
    subtitle: "90%",
    title: "90 ETH",
    isDisabled: true,
  },
  {
    value: 1000000,
    subtitle: "100%",
    title: "100 ETH",
  },
  {
    value: 10000000,
    subtitle: "100%",
    title: "100 ETH",
  },
  {
    value: 100000000,
    subtitle: "100%",
    title: "100 ETH",
  },
  {
    value: 1000000000,
    subtitle: "100%",
    title: "100 ETH",
  },
  {
    value: 10000000000,
    subtitle: "100%",
    title: "100 ETH",
  },
];
