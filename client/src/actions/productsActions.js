import {  GET_ERRORS, PRODUCT_UPDATED, PRODUCT_DELETED, SET_PRODUCTS, ADD_TO_CART, SET_CART_ITEMS } from '../actions/types';
import isEmpty from '../validation/is-empty';

import M from 'materialize-css';
import axios from 'axios';

export const clearErrors = () => dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });
        
};

export const getProduct = (id) => dispatch => {
    axios.get(`/api/products/${id}`)
        .then(res => {
            dispatch({
                type: PRODUCT_UPDATED,
                payload: res.data
            });
        })
        .catch(err => {
            M.toast({
                html: err.response.data,
                classes: 'toast-invalid'
            });
            if (err.response.status === 404) {
                dispatch({
                    type: PRODUCT_UPDATED,
                    payload: {}
                });
            } else {
                dispatch({
                    type: PRODUCT_UPDATED,
                    payload: []
                });
            }
        });
};

export const getProducts = () => dispatch => {
    axios.get('/api/products/all')
        .then(res => {
            dispatch({
                type: SET_PRODUCTS,
                payload: res.data
            });
        })
        .catch(err => {
            if (err.response.status === 404) {
                dispatch({
                    type: SET_PRODUCTS,
                    payload: []
                });
            } else {
                dispatch({
                    type: SET_PRODUCTS,
                    payload: []
                });
            }
        });
};

export const getHomepageProducts = () => dispatch => {
    axios.get('/api/products/home')
        .then(res => {
            dispatch({
                type: SET_PRODUCTS,
                payload: res.data
            });
        })
        .catch(err => {
            if (err.response.status === 404) {
                dispatch({
                    type: SET_PRODUCTS,
                    payload: []
                });
            } else {
                dispatch({
                    type: SET_PRODUCTS,
                    payload: []
                });
            }
        });
};

export const deleteProduct = (id) => dispatch => {
    axios.delete(`/api/products/delete/${id}`)
        .then(res => {
            dispatch({
                type: PRODUCT_DELETED,
                payload: res.data
            });
            M.toast({
                html: 'Product removed',
                classes: 'toast-valid'
            });
        })
        .catch(err => {
            console.log(err);
            M.toast({
                html: 'Product not removed',
                classes: 'toast-invalid'
            });
        });
};

export const toggleProduct = (id) => dispatch => {
    axios.put(`/api/products/toggleProduct/${id}`)
        .then(res => {
            dispatch({
                type: PRODUCT_UPDATED,
                payload: res.data
            });
        })
        .catch(err => M.toast({
            html: 'Something went wrong',
            classes: 'toast-invalid'
        }));
};

export const buyNow = (item, user) => (dispatch) => {
    if (isEmpty(user)) {
        dispatch({
            type: ADD_TO_CART,
            payload: [item]
        });
    } else {
        const data = { itemID: item.product._id, userID: user.id }
        axios.post('/api/cart/add', data)
            .then(res => {
                dispatch({
                    type: SET_CART_ITEMS,
                    payload: res.data
                });
            })
            .catch(err => console.error(err));
    }
};