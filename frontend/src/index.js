import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { hideLoading, parseRequestUrl, showLoading } from './utils';
import CartScreen from './screens/CartScreen';
import '../style.css';
import SigninScreen from './screens/SigninScreen';
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import DashboardScreen from './screens/DashboardScreen';
import ListOfProductsScreen from './screens/ListOfProductsScreen';
import ListOfOrdersScreen from './screens/ListOfOrdersScreen';
import AddProductScreen from './screens/AddProductScreen';
import UpdateProductScreen from './screens/UpdateProductScreen';
import UpdateOrderScreen from './screens/UpdateOrderScreen';

// import all images from "images" folder
const importAll = (require) => require.keys().reduce((acc, next) => {
// eslint-disable-next-line import/no-dynamic-require
  acc[next.replace('./', '')] = require(next);
  return acc;
}, {});

// eslint-disable-next-line no-unused-vars
const images = importAll(
  require.context('/images', false, /\.(gif|png|jpg|jpe?g)$/),
);
// create routes for application
const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/order/:id': OrderScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment' : PaymentScreen,
  '/placeorder':PlaceOrderScreen,
  '/dashboard': DashboardScreen,
  '/orderlist': ListOfOrdersScreen,
  '/productlist': ListOfProductsScreen,
  '/addproduct':AddProductScreen,
  '/updateproduct/:id': UpdateProductScreen,
  '/updateorder/:id': UpdateOrderScreen,
};
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '')
    + (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  hideLoading();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
