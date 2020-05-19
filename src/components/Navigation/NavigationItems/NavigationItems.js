import React from 'react';
import styled from 'styled-components';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 20px;

  @media (min-width: 500px) {
    flex-flow: row;
    margin-top: 0;
  }
`;

const navigationItems = props => {
  const { isAuthenticated } = props;

  return (
    <NavigationList>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {isAuthenticated ? (
        <>
          <NavigationItem link="/orders">Orders</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </>
      ) : (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      )}
    </NavigationList>
  );
};

export default navigationItems;
