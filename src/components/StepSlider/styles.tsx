import styled from "@emotion/styled";
import { Props } from "../StepSlider/types";
import { css } from "@emotion/react";

const ON_HIDE_TRANSITION_DURATION_MS = 200;

type ContainerProps = {
  isVisible: boolean;
};

export const Container = styled("div")<ContainerProps>`
  -webkit-user-select: none;
  user-select: none;
  cursor: ew-resize;

  display: flex;
  width: 100%;
  height: 100%;
  min-height: 1rem;
  padding: 0.2rem;
  transition: opacity
    ${({ isVisible }) =>
      isVisible ? "0ms" : `${ON_HIDE_TRANSITION_DURATION_MS}ms`};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};

  ${({ isVisible }) =>
    isVisible &&
    css`
      pointer-events: auto;
      z-index: 100;
    `}

  &:hover {
    opacity: 1;
  }
`;

type DotProps = Pick<Required<Props>, "highlightedColor" | "isVisible"> & {
  isActive: boolean;
  isHighlighted: boolean;
  isDisabled: boolean;
};

const getDotBgColor = ({
  isHighlighted,
  isActive,
  isDisabled,
  highlightedColor,
}: DotProps) => {
  if (isDisabled) {
    return "#CFCFD4";
  } else if (isHighlighted) {
    return isActive ? "#ffffff" : highlightedColor;
  } else {
    return isActive ? "#1A1A1A" : "#CFCFD4";
  }
};

export const Dot = styled("div")<DotProps>`
  position: relative;
  display: flex;
  flex-grow: 1;
  background-color: ${({ isActive, isHighlighted, highlightedColor }) =>
    isActive && (isHighlighted ? highlightedColor : "#CFCFD4")};
  border-radius: 0.6rem;
  transition: inherit;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0.2)};

  &::after {
    content: "";
    width: 0.3rem;
    height: 0.3rem;
    margin: auto;
    background-color: ${getDotBgColor};
    border-radius: 50%;
    opacity: ${({ isDisabled, isVisible }) =>
      isVisible ? 1 : isDisabled ? 0.1 : 0};
    transition: inherit;
  }
`;

type TooltipProps = {
  isVisible: boolean;
  isHighlighted: boolean;
};

export const Tooltip = styled("div")<TooltipProps>`
  isolation: isolate;
  position: absolute;
  left: 50%;
  bottom: calc(100% + 0.9rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 9rem;
  min-height: 3.6rem;
  padding: 0.2rem 0.6rem;
  font-size: 1.3rem;
  line-height: 1;
  white-space: nowrap;
  color: ${({ isHighlighted }) => (isHighlighted ? "#ffffff" : "#1A1A1A")};
  background-color: inherit;
  border-radius: 0.8rem;
  transition-property: opacity, transform, visibility;
  transition-duration: ${ON_HIDE_TRANSITION_DURATION_MS}ms;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateX(-50%)
    translateY(${({ isVisible }) => (isVisible ? 0 : "-0.5rem")});
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: calc(100% - 1px);
    left: 50%;
    width: 1rem;
    height: 1rem;
    transform: translate(-50%, -50%) rotate(45deg) skew(8deg, 8deg);
    border-radius: 0.2rem 0;
    background-color: inherit;
  }
`;
