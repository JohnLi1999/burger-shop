import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import { BuildControlsDiv, OrderButton } from '../../../styles/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = ({
  price,
  purchasable,
  disabled,
  ingredientAdded,
  ingredientRemoved,
  ordered,
  isAuth,
}) => (
  <BuildControlsDiv>
    <p>
      Current Price: <strong>{price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => ingredientAdded(ctrl.type)}
        removed={() => ingredientRemoved(ctrl.type)}
        disabled={disabled[ctrl.type]}
      />
    ))}
    <OrderButton disabled={!purchasable} onClick={ordered}>
      {isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </OrderButton>
  </BuildControlsDiv>
);

export default buildControls;
