import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled("div")`
  --step-slider-container-radius: 0.8rem;
  --input-padding: 1.5rem;
  position: relative;
  isolation: isolate;
  padding-left: 1.5rem;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: var(--step-slider-container-radius);
  transition: background-color 0.2s;

  &:focus-within {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const stepSilder = css`
  position: absolute;
  left: 0;
  top: 0;
`;

type WrapperProps = {
  isVisible: boolean;
};

export const Wrapper = styled("div")<WrapperProps>`
  display: flex;
  gap: 1rem;
  width: 20.3rem;
  height: 4rem;
  text-align: left;
  transition: opacity ${(props) => (props.isVisible ? "0.2s" : "0s")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
`;

export const Label = styled("span")`
  pointer-events: none;
  flex-shrink: 1000;
  align-self: center;
  min-width: 5.5rem;
  font-size: 1.3rem;
`;

const input = (length: number) => css`
  font-size: 1.3rem;
  font-family: "Inter", sans-serif;
  font-feature-settings: "tnum", "ss01", "cv05", "cv08";
  width: ${`calc(${length}ch + 2px)`};
  min-width: 1ch;
`;

type InputProps = {
  length: number;
  isLargerZIndex: boolean;
};

export const Input = styled("input")<InputProps>`
  ${(props) => input(props.length)};
  box-sizing: content-box;
  position: relative;
  z-index: ${(props) => props.isLargerZIndex && 2};
  padding: 0 var(--input-padding);
  border: 0;
  margin-left: auto;
  text-align: right;
  color: #fff;
  background-color: transparent;
  border-radius: 0 var(--step-slider-container-radius)
    var(--step-slider-container-radius) 0;
  outline: 0;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

type InputCursor = {
  length: number;
};

export const InputCursor = styled("div")<InputCursor>`
  ${(props) => input(props.length)};
  cursor: text;
  position: absolute;
  top: 50%;
  right: var(--input-padding);
  transform: translateY(-50%);
`;
