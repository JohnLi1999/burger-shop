import React from 'react';
import { withRouter } from 'react-router-dom';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { BurgerDiv } from '../../styles/Burger';

const burger = ({ ingredients }) => {
  // Grab all the keys in props.ingredient
  let transformedIngredients = Object.keys(ingredients)
    .map(igKey => {
      // Map them to arrays whose length is equal the value of the key in ingredients object
      return [...Array(ingredients[igKey])].map((_, i) => {
        // Map every element to a BurgerIngredient Component whose type is the key in ingredients object
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      // Convert the array of arrays which has one type of ingredients to an array that has all ingredients
      return arr.concat(el);
    }, []);

  // Remind customers to add ingredients if there is none
  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <BurgerDiv>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </BurgerDiv>
  );
};

export default withRouter(burger);
