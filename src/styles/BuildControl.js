import styled, { keyframes } from 'styled-components';

/* Build Controls Styles */
export const BuildControlsDiv = styled.div`
  width: 100%;
  background-color: #cf8f2e;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-shadow: 0 2px 1px #ccc;
  margin: auto;
  padding: 10px 0;
`;

const orderButtonKeyframes = keyframes`
  0% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const OrderButton = styled.button`
  background-color: #dad735;
  outline: none;
  cursor: pointer;
  border: 1px solid #966909;
  color: #966909;
  font-family: inherit;
  font-size: 1.2em;
  padding: 15px 30px;
  box-shadow: 2px 2px 2px #966909;
  animation: ${orderButtonKeyframes};

  &:hover,
  :active {
    background-color: #a0db41;
    border: 1px solid #966909;
    color: #966909;
  }

  &:disabled {
    cursor: not-allowed;
    color: #888888;
    border: 1px solid #ccc;
    background-color: #c7c6c6;
  }
`;

/* Build Control Styles */
export const BuildControlDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

export const BuildControlLabel = styled.div`
  padding: 10px;
  font-weight: bold;
  width: 80px;
`;

export const BuildControlButton = styled.button`
  display: block;
  font: inherit;
  padding: 5px;
  margin: 0 5px;
  width: 80px;
  border: 1px solid #aa6817;
  cursor: pointer;
  outline: none;

  &:disabled {
    background-color: #ac9980;
    border: 1px solid #7e7365;
    color: #ccc;
    cursor: default;
  }

  &:hover:disabled {
    background-color: #ac9980;
    color: #ccc;
    cursor: not-allowed;
  }
`;

export const BuildControlLessButton = styled(BuildControlButton)`
  background-color: #d39952;
  color: white;

  &:hover,
  :active {
    background-color: #daa972;
    color: white;
  }
`;

export const BuildControlMoreButton = styled(BuildControlButton)`
  background-color: #8f5e1e;
  color: white;

  &:hover,
  :active {
    background-color: #99703f;
    color: white;
  }
`;
