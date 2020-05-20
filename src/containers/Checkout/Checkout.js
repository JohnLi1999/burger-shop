import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = ({ igs, purchased, history, match }) => {
  const checkoutCancelledHandler = () => {
    history.goBack();
  };

  const checkoutContinuedHandler = () => {
    history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;

  if (igs) {
    const purchasedRedirect = purchased && <Redirect to="/" />;
    summary = (
      <>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={igs}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route path={match.path + '/contact-data'} component={ContactData} />
      </>
    );
  }

  return summary;
};

const mapStateToProps = state => {
  return {
    igs: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
