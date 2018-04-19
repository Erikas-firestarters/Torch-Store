import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import userOrders from './userOrders'
import categories from './categories';
import activeCategory from './activecategory';
import product from '../';
import products from '../products';

const reducer = combineReducers({ user, userOrders, categories, product, products, activeCategory });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './categories';
export * from './activecategory';
export * from './products';
export * from './product';
export * from './userOrders';

