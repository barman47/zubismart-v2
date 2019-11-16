import { combineReducers } from 'redux';
import errorsReducer from './errorsReducer';
import userReducer from './userReducer';
import productsReducer from './productsReducer';
import servicesReducer from './servicesReducer';

export default combineReducers({
    user: userReducer,
    products: productsReducer,
    services: servicesReducer,
    errors: errorsReducer
});