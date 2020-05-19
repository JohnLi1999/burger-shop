import React from 'react';

import styled from 'styled-components';

const themes = {
  success: '#5c9210',
  danger: '#944317',
};

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => themes[props.theme]};
  outline: none;
  cursor: pointer;
  font: inherit;
  padding: 10px;
  margin: 10px;
  font-weight: bold;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const button = props => {
  const { clicked, theme, children, disabled } = props;

  return (
    <Button onClick={clicked} theme={theme} disabled={disabled}>
      {children}
    </Button>
  );
};

export default button;
