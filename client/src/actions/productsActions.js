import { PRODUCT_ADDED, GET_ERRORS, SET_PRODUCTS } from '../actions/types';

import axios from 'axios';

export const clearErrors = () => dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });
        
};

export const getProducts = () => dispatch => {
    axios.get('/api/products/all')
        .then(res => {
            console.log(res);
            dispatch({
                type: SET_PRODUCTS,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
};