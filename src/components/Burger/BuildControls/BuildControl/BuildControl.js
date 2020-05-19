import React from 'react';

import {
  BuildControlDiv,
  BuildControlLabel,
  BuildControlLessButton,
  BuildControlMoreButton,
} from '../../../../styles/BuildControl';

const buildControl = props => {
  const { label, added, removed, disabled } = props;

  return (
    <BuildControlDiv>
      <BuildControlLabel>{label}</BuildControlLabel>
      <BuildControlLessButton onClick={removed} disabled={disabled}>
        Less
      </BuildControlLessButton>
      <BuildControlMoreButton onClick={added}>More</BuildControlMoreButton>
    </BuildControlDiv>
  );
};

export default buildControl;
