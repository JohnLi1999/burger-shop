import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

const CenteredDiv = styled.div`
  text-align: center;
`;

export const BurgerBuilder = ({
  isAuthenticated,
  igs,
  price,
  error,
  history,
  onInitIngredients,
  onIngredientAdded,
  onIngredientRemoved,
  onInitPurchase,
  onSetAuthRedirectPath,
}) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    history.push('/checkout');
  };

  const disabledInfo = {
    ...igs,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? (
    <CenteredDiv>
      <p>Ingredients can't be loaded</p>
    </CenteredDiv>
  ) : (
    <CenteredDiv>
      <Spinner />
    </CenteredDiv>
  );

  if (igs) {
    burger = (
      <>
        <Burger ingredients={igs} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(igs)}
          ordered={purchaseHandler}
          price={price}
          isAuth={isAuthenticated}
        />
      </>
    );
    orderSummary = (
      <OrderSummary
        ingredients={igs}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

const mapStateToProps = state => {
  return {
    igs: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: igName => dispatch(actions.addIngredient(igName)),
    onIngredientRemoved: igName => dispatch(actions.removeIngredient(igName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
