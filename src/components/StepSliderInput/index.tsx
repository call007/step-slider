import { ChangeEvent, useRef, useState } from "react";
import { StepSlider, StepSliderProps } from "../StepSlider";
import * as Styled from "./styles";

interface Props extends StepSliderProps {
  value: number;
  name: string;
  onChange: (value: number) => void;
}

export function StepSliderInput({
  value,
  name,
  onChange,
  ...otherProps
}: Props) {
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [isInputFocusingByUser, setIsInputFocusingByUser] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const valueLength = value.toString().length;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInputFocusingByUser(true);
    const targetValue = Number(e.target.value);
    if (!isFinite(targetValue)) return;
    onChange(targetValue);
  };

  return (
    <Styled.Container>
      <Styled.Wrapper isVisible={!isSliderVisible}>
        <Styled.Label>Amount, ETH</Styled.Label>

        <Styled.Input
          ref={inputRef}
          type="text"
          name={name}
          value={value}
          isLargerZIndex={isInputFocusingByUser}
          length={valueLength}
          onChange={handleChange}
          onBlur={() => setIsInputFocusingByUser(false)}
        />
      </Styled.Wrapper>

      <StepSlider
        isVisible={isSliderVisible}
        onDragStart={() => {
          setIsSliderVisible(true);
          setIsInputFocusingByUser(false);
        }}
        onDragEnd={() => {
          setIsSliderVisible(false);
          inputRef.current?.focus();
        }}
        onClick={() => {
          setIsInputFocusingByUser(true);
          inputRef.current?.focus();
        }}
        css={Styled.stepSilder}
        {...otherProps}
      >
        <Styled.InputCursor length={valueLength}>&nbsp;</Styled.InputCursor>
      </StepSlider>
    </Styled.Container>
  );
}
