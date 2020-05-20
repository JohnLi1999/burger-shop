import React from 'react';
import styled from 'styled-components';

import burgerLogo from '../../assets/images/burger-logo.png';

const LogoDiv = styled.div`
  background-color: white;
  padding: 8px;
  height: ${props => props.height};
  box-sizing: border-box;
  border-radius: 5px;
`;

const LogoImg = styled.img`
  height: 100%;
`;

const logo = ({ height }) => (
  <LogoDiv height={height}>
    <LogoImg src={burgerLogo} alt="MyBurger" />
  </LogoDiv>
);

export default logo;
