import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled('div')`
  --step-slider-container-radius: 0.8rem;
  position: relative;
  isolation: isolate;
  padding-left: 1.5rem;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: var(--step-slider-container-radius);

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

export const Wrapper = styled('div')<WrapperProps>`
  display: flex;
  gap: 1rem;
  width: 20.3rem;
  height: 4rem;
  transition: opacity ${(props) => (props.isVisible ? '0.2s' : '0s')};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
`;

export const Label = styled('span')`
  pointer-events: none;
  flex-shrink: 0;
  align-self: center;
  font-size: 1.3rem;
`;

type InputProps = {
  length: number;
};

export const Input = styled('input')<InputProps>`
  box-sizing: content-box;
  position: relative;
  z-index: 2;
  width: ${(props) => `calc(${props.length}ch + 2px)`};
  min-width: 1ch;
  padding: 0 1.5rem;
  border: 0;
  margin-left: auto;
  text-align: right;
  font-size: 1.3rem;
  font-family: "Inter", sans-serif;
  font-feature-settings: "tnum", "ss01", "cv05", "cv08";
  color: #fff;
  background-color: transparent;
  border-radius: 0 var(--step-slider-container-radius) var(--step-slider-container-radius) 0;
  outline: 0;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
