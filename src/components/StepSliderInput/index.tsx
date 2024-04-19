import { ChangeEvent, useRef, useState } from 'react';
import { StepSlider, StepSliderProps } from '../StepSlider';
import * as Styled from './styles';

interface Props extends StepSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function StepSliderInput({ value, onChange, ...otherProps }: Props) {
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = Number(e.target.value);
    if (!isFinite(targetValue)) return;
    onChange(targetValue);
  };

  return (
    <Styled.Container>
      <StepSlider
        isVisible={isSliderVisible}
        onDragStart={() => {
          setIsSliderVisible(true);
        }}
        onDragEnd={() => {
          setIsSliderVisible(false);
          inputRef.current?.focus();
        }}
        onClick={() => {
          inputRef.current?.focus();
        }}
        css={Styled.stepSilder}
        {...otherProps}
      />

      <Styled.Wrapper isVisible={!isSliderVisible}>
        <Styled.Label>Amount, ETH</Styled.Label>

        <Styled.Input
          ref={inputRef}
          type="text"
          value={value}
          length={value.toString().length}
          onChange={handleChange}
        />
      </Styled.Wrapper>
    </Styled.Container>
  );
}
