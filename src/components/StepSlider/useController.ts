import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { Props } from "./types";

gsap.registerPlugin(Observer, useGSAP);

type UseController = Pick<
  Props,
  | "currentStep"
  | "steps"
  | "disabledSteps"
  | "onCurrentStepChange"
  | "onClick"
  | "onDragStart"
  | "onDragEnd"
>;

export const useController = ({
  steps: passedSteps,
  currentStep,
  disabledSteps,
  onCurrentStepChange,
  onDragStart,
  onDragEnd,
  onClick,
}: UseController) => {
  const [steps, setSteps] = useState(passedSteps);
  const [isDragging, setIsDragging] = useState(false);
  const currentStepRef = useRef(currentStep);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRectRef = useRef<DOMRect>();

  useLayoutEffect(() => {
    const getBoxSize = () => {
      containerRectRef.current = containerRef.current?.getBoundingClientRect();
    };

    getBoxSize();

    window.addEventListener("resize", getBoxSize);

    return () => {
      window.removeEventListener("resize", getBoxSize);
    };
  }, []);

  useGSAP(
    () => {
      let staleCurrentStep = 0;
      let startX = 0;

      Observer.create({
        target: containerRef.current,
        type: "touch,pointer",
        dragMinimum: 3,
        onToggleX(self) {
          startX = self.x ?? 0;
          staleCurrentStep = currentStepRef.current;
        },
        onDrag(self) {
          const sliderWidth = containerRectRef?.current?.width ?? 0;
          const stepWidth = sliderWidth / steps;
          const offset = (self.x ?? 0) - (startX ?? 0);
          const offsetInSteps = Math.round(offset / stepWidth);
          let nextStep = staleCurrentStep + offsetInSteps;

          if (nextStep < 0) {
            nextStep = 0;
          } else if (nextStep >= steps) {
            nextStep = steps - 1;
          }

          if (disabledSteps?.includes(nextStep)) return;

          if (nextStep !== currentStepRef.current) {
            onCurrentStepChange(nextStep);
          }
        },
        onDragStart(self) {
          onDragStart?.();
          setIsDragging(true);
          startX = self.startX ?? 0;
          staleCurrentStep = currentStepRef.current;
          document.documentElement.style.setProperty("cursor", "ew-resize");
          document.documentElement.style.setProperty("pointer-events", "none");
        },
        onDragEnd() {
          onDragEnd?.();
          setIsDragging(false);
          document.documentElement.style.removeProperty("cursor");
          document.documentElement.style.removeProperty("pointer-events");
        },
        onClick(self) {
          if (Math.round(self.startX ?? 0) === Math.round(self.x ?? 0)) {
            onClick?.();
          }
        },
      });
    },
    { scope: containerRef, dependencies: [steps], revertOnUpdate: true }
  );

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    if (!isDragging) {
      setSteps(passedSteps);
    }
  }, [passedSteps, isDragging]);

  return { steps, isDragging, containerRef };
};
