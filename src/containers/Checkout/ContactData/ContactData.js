import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactDataDiv = styled.div`
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

class ContactData extends Component {
  inputConfig = (elementType, type, placeholder, minLength, maxLength) => {
    return {
      elementType: elementType,
      elementConfig: {
        type: type,
        placeholder: placeholder,
      },
      value: '',
      validation: {
        required: true,
        minLength: minLength,
        maxLength: maxLength,
      },
      valid: false,
      touch: false,
    };
  };

  state = {
    orderForm: {
      name: this.inputConfig('input', 'text', 'Your Name', 3, 30),
      street: this.inputConfig('input', 'text', 'Street', 5, 100),
      zipCode: this.inputConfig('input', 'text', 'ZIP Code', 6, 6),
      country: this.inputConfig('input', 'text', 'Country', 2, 30),
      email: this.inputConfig('input', 'email', 'Your E-mail', 5, 200),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
        touched: false,
      },
    },
    formIsValid: false,
  };

  orderHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const { igs, price, token, onOrderBurger, userId } = this.props;
    const order = {
      ingredients: igs,
      price: price,
      orderData: formData,
      userId: userId,
    };
    onOrderBurger(order, token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const { orderForm } = this.state;

    // Deep Copy and update values
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    // Check overall form validity
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    // Update state
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const { orderForm, formIsValid } = this.state;

    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({ id: key, config: orderForm[key] });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            valueType={
              formElement.id === 'zipCode' ? 'zip code' : formElement.id
            }
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button theme="success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <ContactDataDiv>
        <h4>Enter your Contact Data</h4>
        {form}
      </ContactDataDiv>
    );
  }
}

const mapStateToProps = state => {
  return {
    igs: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
