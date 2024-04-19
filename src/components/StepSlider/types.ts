import { ReactNode } from 'react';

export interface Props {
  steps: number;
  currentStep: number;
  disabledSteps?: number[];
  tooltipContent?: ReactNode;
  highlightedFrom?: number;
  highlightedColor?: string;
  isVisible?: boolean;
  onCurrentStepChange: (step: number) => void;
  onClick?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}
