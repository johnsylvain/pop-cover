import React from 'react';
import styled from 'styled-components';

import { Check } from './Icon';

const StyledInput = styled.input`
  appearance: none;
  opacity: 0;
  position: absolute;
  z-index: 0;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const CheckBoxWrapper = styled.div`
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.05);
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  margin-right: 10px;

  svg[data-name='checked'] {
    display: none;
    font-size: 20px;
    fill: #3498db;
  }

  > input:checked {
    & ~ svg[data-name='checked'] {
      display: inline-block;
    }
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')}
  font-weight: 500;
  user-select: none;
`;

export const Checkbox = ({ children, ...props }) => {
  const { disabled } = props;

  return (
    <Label disabled={disabled}>
      <CheckBoxWrapper>
        <StyledInput type="checkbox" {...props} />
        <Check data-name="checked" />
      </CheckBoxWrapper>
      {children}
    </Label>
  );
};
