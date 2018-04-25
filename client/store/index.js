import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import categories from './categories';
import activeCategory from './activecategory';
import product from './product';
import products from './products';
import userOrders from './userOrders'
import cart from './cart';
import reviews from './view-reviews';
import admin from './admin';
import { reducer as formReducer } from 'redux-form'
import adminOrders from './adminOrders'
const reducer = combineReducers({ form: formReducer, user, userOrders, categories, product, products, activeCategory, cart, reviews, admin});


const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const config = {
  key: 'root', // key is required
  storage, // storage is now required
};

const persistReducers = persistReducer(config, reducer);
const store = createStore(persistReducers, middleware);
let persistor = persistStore(store)

export function configureStore () {
return { persistor, store}
}

export default store;
export * from './user';
export * from './categories';
export * from './activecategory';
export * from './products'
export * from './product';
export * from './userOrders'
export * from './cart'
export * from './userOrders';
export * from './view-reviews';
export * from './admin';
export * from './adminOrders';
