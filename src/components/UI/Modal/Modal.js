import React, { Component } from 'react';
import styled from 'styled-components';

import Backdrop from '../Backdrop/Backdrop';

const ModalDiv = styled.div`
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 70%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;

  @media (min-width: 600px) {
    width: 500px;
    left: calc(50% - 250px);
  }
`;

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    const { show, modalClosed, children } = this.props;

    return (
      <>
        <Backdrop show={show} clicked={modalClosed} />
        <ModalDiv
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0',
          }}>
          {children}
        </ModalDiv>
      </>
    );
  }
}

export default Modal;
