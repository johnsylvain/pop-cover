import styled from 'styled-components';

export const Input = styled.input`
  &,
  & + label {
    padding: 12px 20px;
    font-size: 1.2rem;
    color: #555555;
    font-family: inherit;
    border: 2px solid rgba(0, 0, 0, 0.05);
    font-weight: 500;
    border-radius: 3px;
    outline: 0;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1000px) {
      font-size: 0.9rem;
    }
  }

  &[type='text'] {
    display: block;
    outline: 0;
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
        ${props => (props.active ? '#3498db' : 'rgba(0, 0, 0, 0.05)')};
      height: 100%;
      min-height: 100px;
    }
  }
`;
