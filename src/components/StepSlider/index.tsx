import { range } from "lodash-es";
import { Props } from "./types";
import { useController } from "./useController";
import * as Styled from "./styles";

export function StepSlider({
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
  ...otherProps
}: Props) {
  const { steps, containerRef, isDragging } = useController({
    steps: passedSteps,
    currentStep,
    disabledSteps,
    onCurrentStepChange,
    onDragStart,
    onDragEnd,
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
        const isActive = index === currentStep;
        const isDisabled = !!disabledSteps?.includes(index);
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
    </Styled.Container>
  );
}

export type { Props as StepSliderProps };
