import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const AuthenticationDiv = styled.div`
  margin: 20px auto;
  width: 80%;
  text-align: center;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const ErrorMessageHeader = styled.h3`
  color: red;
  margin: 5px 0;
`;

const Auth = ({ loading, error, onAuth }) => {
  const inputConfig = (elementType, type, placeholder, validation) => {
    return {
      elementType: elementType,
      elementConfig: {
        type: type,
        placeholder: placeholder,
      },
      value: '',
      validation: validation,
      valid: false,
      touched: false,
    };
  };

  const [authForm, setAuthForm] = useState({
    email: inputConfig('input', 'email', 'Mail Address', {
      required: true,
      isEmail: true,
    }),
    password: inputConfig('input', 'password', 'Password', {
      required: true,
      minLength: 6,
    }),
  });
  const [isSignUp, setIsSignUp] = useState(true);

  const inputChangedHandler = (event, authField) => {
    const updatedControls = updateObject(authForm, {
      [authField]: updateObject(authForm[authField], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[authField].validation
        ),
        touched: true,
      }),
    });

    setAuthForm(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    onAuth(authForm.email.value, authForm.password.value, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({ id: key, config: authForm[key] });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      touched={formElement.config.touched}
      valueType={formElement.id}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (error) {
    errorMessage = (
      <ErrorMessageHeader>ERROR: {error.message}</ErrorMessageHeader>
    );
  }

  return (
    <AuthenticationDiv>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button theme="success">{isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
      </form>
      <Button theme="danger" clicked={switchAuthModeHandler}>
        SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}
      </Button>
    </AuthenticationDiv>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSingUp) =>
      dispatch(actions.auth(email, password, isSingUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
