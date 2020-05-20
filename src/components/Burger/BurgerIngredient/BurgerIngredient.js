import React from 'react';
import PropTypes from 'prop-types';

import {
  BreadBottomDiv,
  BreadTopDiv,
  Seed1,
  Seed2,
  Meat,
  Cheese,
  Salad,
  Bacon,
} from '../../../styles/Burger';

const burgerIngredient = ({ type }) => {
  let ingredient = null;

  switch (type) {
    case 'bread-bottom':
      ingredient = <BreadBottomDiv />;
      break;
    case 'bread-top':
      ingredient = (
        <BreadTopDiv>
          <Seed1 />
          <Seed2 />
        </BreadTopDiv>
      );
      break;
    case 'salad':
      ingredient = <Salad />;
      break;
    case 'bacon':
      ingredient = <Bacon />;
      break;
    case 'cheese':
      ingredient = <Cheese />;
      break;
    case 'meat':
      ingredient = <Meat />;
      break;

    default:
      ingredient = null;
  }

  return ingredient;
};

burgerIngredient.propTypes = { type: PropTypes.string.isRequired };

export default burgerIngredient;
