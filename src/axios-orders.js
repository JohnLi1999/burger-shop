import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-shop-676eb.firebaseio.com/',
});

export default instance;
