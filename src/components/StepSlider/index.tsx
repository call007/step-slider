import { range } from "lodash-es";
import { Props } from "./types";
import { useController } from "./useController";
import * as Styled from "./styles";
import { PropsWithChildren } from "react";

export function StepSlider({
  children,
  steps: passedSteps,
  currentStep,
  disabledSteps,
  tooltipContent,
  highlightedFrom,
  highlightedColor = "#3187EE",
  isVisible = true,
  onCurrentStepChange,
  onDragStart,
  onDragEnd,
  onClick,
  ...otherProps
}: PropsWithChildren<Props>) {
  const { steps, containerRef, isDragging } = useController({
    steps: passedSteps,
    currentStep,
    disabledSteps,
    onCurrentStepChange,
    onDragStart,
    onDragEnd,
    onClick,
  });

  return (
    <Styled.Container
      ref={containerRef}
      draggable={false}
      isVisible={isDragging || isVisible}
      onMouseDown={(e) => e.preventDefault()}
      {...otherProps}
    >
      {range(steps).map((index) => {
        const isDisabled = !!disabledSteps?.includes(index);
        const isActive = index === currentStep && !isDisabled;
        const isHighlighted =
          typeof highlightedFrom === "number" && index >= highlightedFrom;

        return (
          <Styled.Dot
            key={index}
            isActive={isActive}
            isHighlighted={isHighlighted}
            isDisabled={isDisabled}
            isVisible={isVisible}
            highlightedColor={highlightedColor}
          >
            {isActive && tooltipContent && (
              <Styled.Tooltip
                isVisible={isVisible && isDragging}
                isHighlighted={isHighlighted}
              >
                {tooltipContent}
              </Styled.Tooltip>
            )}
          </Styled.Dot>
        );
      })}

      {children}
    </Styled.Container>
  );
}

export type { Props as StepSliderProps };
