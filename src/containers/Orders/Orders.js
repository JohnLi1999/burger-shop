import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions/order';
import Spinner from '../../components/UI/Spinner/Spinner';

const CenteredDiv = styled.div`
  text-align: center;
  font-size: 30px;
  margin: 100px;
`;

const Orders = ({ token, userId, orders, loading, onFetchOrders }) => {
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [token, userId, onFetchOrders]);

  let orderList = (
    <CenteredDiv>
      <Spinner />
    </CenteredDiv>
  );
  if (!loading) {
    if (orders.length !== 0) {
      orderList = orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    } else {
      orderList = <CenteredDiv>No orders yet</CenteredDiv>;
    }
  }

  return orderList;
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
