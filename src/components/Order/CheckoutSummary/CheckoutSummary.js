import React from 'react';
import styled from 'styled-components';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummaryDiv = styled.div`
  text-align: center;
  margin: auto;
`;

const checkoutSummary = ({
  ingredients,
  checkoutCancelled,
  checkoutContinued,
}) => (
  <CheckoutSummaryDiv>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={ingredients} />
    </div>
    <Button theme="danger" clicked={checkoutCancelled}>
      CANCEL
    </Button>
    <Button theme="success" clicked={checkoutContinued}>
      CONTINUE
    </Button>
  </CheckoutSummaryDiv>
);

export default checkoutSummary;
