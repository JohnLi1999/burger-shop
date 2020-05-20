import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

const updateIngredientAmount = (state, action) => {
  let updatedCount = action.type === actionTypes.ADD_INGREDIENT ? 1 : -1;

  const updatedIngredient = {
    [action.ingredientName]:
      state.ingredients[action.ingredientName] + updatedCount,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedStates = {
    ingredients: updatedIngredients,
    totalPrice:
      state.totalPrice +
      updatedCount * INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };

  return updateObject(state, updatedStates);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false,
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return updateIngredientAmount(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return updateIngredientAmount(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
