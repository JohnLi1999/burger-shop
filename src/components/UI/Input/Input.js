import React from 'react';
import styled from 'styled-components';

const InputDiv = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const InputLabel = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`;

const InputElement = styled.div`
  outline: none;
  border: ${props =>
    props.invalid && props.touched ? '1px solid red' : '1px solid #ccc'};
  background-color: ${props =>
    props.invalid && props.touched ? '#fda49a' : 'white'};
  font: inherit;
  padding: 6px 10px;
  display: block;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background-color: #eee;
  }
`;

const ValidationErrorParagraph = styled.p`
  color: red;
  margin: 5px 0;
`;

const input = props => {
  const {
    label,
    elementType,
    elementConfig,
    value,
    invalid,
    touched,
    valueType,
    changed,
  } = props;

  let validationError = null;
  if (invalid && touched) {
    validationError = (
      <ValidationErrorParagraph>
        Please enter a valid {valueType}!
      </ValidationErrorParagraph>
    );
  }

  return (
    <InputDiv>
      <InputLabel>{label}</InputLabel>
      {elementType !== 'select' ? (
        <InputElement
          as={elementType}
          {...elementConfig}
          value={value}
          onChange={changed}
          invalid={invalid}
          touched={touched}
        />
      ) : (
        <InputElement
          as={elementType}
          {...elementConfig}
          value={value}
          onChange={changed}>
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </InputElement>
      )}
      {validationError}
    </InputDiv>
  );
};

export default input;
