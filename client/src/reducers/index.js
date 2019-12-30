import { combineReducers } from 'redux';
import errorsReducer from './errorsReducer';
import userReducer from './userReducer';
import productsReducer from './productsReducer';
import servicesReducer from './servicesReducer';
import adminReducer from './adminReducer';

export default combineReducers({
    admin: adminReducer,
    user: userReducer,
    products: productsReducer,
    services: servicesReducer,
    errors: errorsReducer
});