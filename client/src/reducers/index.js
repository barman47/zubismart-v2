import { combineReducers } from 'redux';
import errorsReducer from './errorsReducer';
import brandsReducer from './brandsReducer';
import userReducer from './userReducer';
import productsReducer from './productsReducer';
import servicesReducer from './servicesReducer';
import adminReducer from './adminReducer';
import cartReducer from './cartReducer';

export default combineReducers({
    admin: adminReducer,
    brands: brandsReducer,
    cart: cartReducer,
    user: userReducer,
    products: productsReducer,
    services: servicesReducer,
    errors: errorsReducer
});