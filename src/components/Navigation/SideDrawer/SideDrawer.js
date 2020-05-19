import React from 'react';
import styled from 'styled-components';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawerDiv = styled.div`
  position: fixed;
  width: 280px;
  max-width: 70%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  background-color: white;
  padding: 32px 16px;
  box-sizing: border-box;
  transition: transform 0.3s ease-out;
  transform: ${props => (props.show ? 'translateX(0)' : 'translateX(-100%)')};

  @media (min-width: 500px) {
    display: none;
  }
`;

const sideDrawer = props => {
  const { open, closed, isAuth } = props;

  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <SideDrawerDiv show={open} onClick={closed}>
        <Logo height="11%" />
        <NavigationItems isAuthenticated={isAuth} />
      </SideDrawerDiv>
    </>
  );
};

export default sideDrawer;
