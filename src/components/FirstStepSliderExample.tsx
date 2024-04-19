import { useState } from 'react';
import { StepSliderInput } from './StepSliderInput';

const max = 1000;
const steps = 10;
const highlightedFrom = 3;

export function FirstStepSliderExample() {
  const [currentStep, setCurrentStep] = useState(4);

  const formatValue = (currentStep: number) =>
    Math.round((max / (steps - 1)) * currentStep);

  const [value, setValue] = useState(() => formatValue(currentStep));
  const percent = `${Math.round((value / max) * 100)}%`;

  return (
    <>
      <StepSliderInput
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue);
          let nextStep = Math.round((nextValue / max) * (steps - 1));

          if (nextStep < 0) {
            nextStep = 0;
          } else if (nextStep >= steps) {
            nextStep = steps - 1;
          }

          setCurrentStep(nextStep);
        }}
        steps={steps}
        currentStep={currentStep}
        onCurrentStepChange={(nextCurrentStep) => {
          setCurrentStep(nextCurrentStep);
          setValue(formatValue(nextCurrentStep));
        }}
        highlightedFrom={highlightedFrom}
        tooltipContent={
          <>
            <span>{value} ETH</span>
            {value > 0 && (
              <span style={{ fontSize: '12px', opacity: 0.5 }}>{percent}</span>
            )}
          </>
        }
      />
    </>
  );
}
