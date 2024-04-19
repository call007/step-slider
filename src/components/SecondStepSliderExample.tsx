import { useState } from 'react';
import { StepSliderInput } from './StepSliderInput';

export function SecondStepSliderExample() {
  const [currentStep, setCurrentStep] = useState(1);
  const [value, setValue] = useState(() => STEPS_LIST[currentStep].value);

  return (
    <StepSliderInput
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);

        const closestStep = STEPS_LIST.reduce((prevStep, currStep) =>
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
      steps={STEPS_LIST.length}
      currentStep={currentStep}
      onCurrentStepChange={(nextCurrentStep) => {
        setCurrentStep(nextCurrentStep);
        setValue(STEPS_LIST[nextCurrentStep].value);
      }}
      highlightedFrom={STEPS_LIST.findIndex((el) => el.isHighlighted)}
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
    title: '0 ETH',
  },
  {
    value: 10,
    subtitle: '10%',
    title: '10 ETH',
  },
  {
    value: 50,
    title: '50 ETH',
    subtitle: '50%',
    isHighlighted: true,
  },
  {
    value: 60,
    subtitle: '60%',
    title: '60 ETH',
  },
  {
    value: 100,
    subtitle: '100%',
    title: '100 ETH',
  },
];
