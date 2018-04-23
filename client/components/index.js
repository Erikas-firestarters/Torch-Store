/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as ProductItem} from './products/product-item';
export {default as ProductList} from './products/product-list';
export {default as ProductDetail} from './products/product-detail';
export {default as Cart} from './cart';
export {default as CartItem} from './cart-item';
export {default as CartWidget} from './cart-widget';
export {default as Checkout} from './checkout';
export {default as CheckoutWidget} from './checkout-widget';
export {default as AddressForm} from './address-form';
export {default as ProductPage} from './products/product-page';
