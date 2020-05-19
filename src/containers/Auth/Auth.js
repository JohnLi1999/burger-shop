import React, { Component } from 'react';
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

class Auth extends Component {
  inputConfig = (elementType, type, placeholder, validation) => {
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

  state = {
    controls: {
      email: this.inputConfig('input', 'email', 'Mail Address', {
        required: true,
        isEmail: true,
      }),
      password: this.inputConfig('input', 'password', 'Password', {
        required: true,
        minLength: 6,
      }),
    },
    isSignUp: true,
  };

  inputChangedHandler = (event, controlName) => {
    const { controls } = this.state;

    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    const { controls, isSignUp } = this.state;
    const { onAuth } = this.props;

    event.preventDefault();
    onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const { controls } = this.state;
    const { loading, error } = this.props;

    const formElementsArray = [];
    for (let key in controls) {
      formElementsArray.push({ id: key, config: controls[key] });
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
        changed={event => this.inputChangedHandler(event, formElement.id)}
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
        <form onSubmit={this.submitHandler}>
          {form}
          <Button theme="success">
            {this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}
          </Button>
        </form>
        <Button theme="danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </AuthenticationDiv>
    );
  }
}

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
