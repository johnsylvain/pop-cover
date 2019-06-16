import React from 'react';
import styled from 'styled-components';

import { CheckboxChecked, CheckboxUnchecked } from './Icon';

const StyledInput = styled.input`
  appearance: none;
  opacity: 0;
  position: absolute;
  z-index: 0;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const CheckBoxWrapper = styled.div`
  position: relative;
  margin: 0;
  margin-right: 5px;
  width: 24px;
  height: 24px;

  svg {
    font-size: 24px;
  }

  svg[data-name='checked'] {
    display: none;
    fill: #3498db;
  }

  svg[data-name='empty'] {
    display: inline-block;
    fill: rgba(0, 0, 0, 0.1);
  }

  > input:checked {
    & ~ svg[data-name='checked'] {
      display: inline-block;
    }

    & ~ svg[data-name='empty'] {
      display: none;
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
        <CheckboxChecked data-name="checked" />
        <CheckboxUnchecked data-name="empty" />
      </CheckBoxWrapper>
      {children}
    </Label>
  );
};
