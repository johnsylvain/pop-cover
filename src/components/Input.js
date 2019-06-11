import styled from 'styled-components';

export const Input = styled.input`
  &,
  & + label {
    padding: 12px 20px;
    font-size: 1.5rem;
    color: #555555;
    font-family: inherit;
    background: rgba(0, 0, 0, 0.05);
    font-weight: 700;
    border-radius: 3px;
    border: 0;
    outline: 0;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  &[type='text'] {
    display: block;
    outline: 0;
    border: 0;
    grid-column: 1 / span 2;

    &::placeholder {
      color: rgba(135, 135, 135, 0.7);
    }
  }

  &[type='file'] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;

    & + label {
      cursor: pointer;
      border: 2px dashed
        ${props => (props.active ? 'royalblue' : 'rgba(135, 135, 135, 0.5)')};
      min-height: 200px;
    }
  }
`;
