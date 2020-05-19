import React from 'react';
import styled from 'styled-components';

const OrderDiv = styled.div`
  width: 80%;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 10px;
  margin: 10px auto;
  box-sizing: border-box;
`;

const IngredientSpan = styled.span`
  text-transform: capitalize;
  display: inline-block;
  margin: 0 8px;
  border: 1px solid #ccc;
  padding: 5px;
`;

const order = props => {
  const { ingredients, price } = props;

  const ingredients_order = [];
  for (let ingredientName in ingredients) {
    ingredients_order.push({
      name: ingredientName,
      amount: ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients_order.map(ig => {
    return (
      <IngredientSpan key={ig.name}>
        {ig.name} ({ig.amount})
      </IngredientSpan>
    );
  });

  return (
    <OrderDiv>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>CAN {price.toFixed(2)}</strong>
      </p>
    </OrderDiv>
  );
};

export default order;
