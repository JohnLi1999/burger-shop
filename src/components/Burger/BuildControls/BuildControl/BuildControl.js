import React from 'react';

import {
  BuildControlDiv,
  BuildControlLabel,
  BuildControlLessButton,
  BuildControlMoreButton,
} from '../../../../styles/BuildControl';

const buildControl = ({ label, added, removed, disabled }) => (
  <BuildControlDiv>
    <BuildControlLabel>{label}</BuildControlLabel>
    <BuildControlLessButton onClick={removed} disabled={disabled}>
      Less
    </BuildControlLessButton>
    <BuildControlMoreButton onClick={added}>More</BuildControlMoreButton>
  </BuildControlDiv>
);

export default buildControl;
