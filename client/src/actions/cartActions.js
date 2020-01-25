import { ADD_TO_CART, SET_CART_ITEMS, ADD_ITEMS_TO_CART } from './types';
import axios from 'axios';
import isEmpty from '../validation/is-empty';

export const addToCart = (item, user) => (dispatch) => {
    if (isEmpty(user)) {
        console.log('no user');
        dispatch({
            type: ADD_TO_CART,
            payload: [item]
        });
    } else {
        console.log('there is user');
        const data = { itemID: item._id, userID: user.id }
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

export const addItemsToCart = (items, user) => (dispatch) => {
    console.log(items);
    console.log('adding items');
    const data = {
        userID: user.id,
        items
    };
    axios.post('/api/cart/addItems', data)
        .then(res => {
            dispatch({
                type: ADD_ITEMS_TO_CART,
                payload: [res.data]
            });
            console.log(res.data);
        })
        .catch(err => console.error(err));
};

export const increaseItemCount = (item, user) => (dispatch) => {
    if (!isEmpty(user)) {
        const data = { itemID: item._id, userID: user.id }
        axios.post('/api/cart/increment', data)
            .then(res => {
                console.log('updated product ', res.data);
                dispatch({
                    type: ADD_TO_CART,
                    payload: item
                });
            })
            .catch(err => console.error(err));
    } else {
        dispatch({
            type: ADD_TO_CART,
            payload: item
        });
    }
};

export const decreaseItemCount = (item, user) => (dispatch) => {
    console.log(item);
    if (!isEmpty(user)) {
        const data = { itemID: item._id, userID: user.id }
        axios.post('/api/cart/decrement', data)
            .then(res => {
                console.log('updated product ', res.data);
                dispatch({
                    type: ADD_TO_CART,
                    payload: item
                });
            })
            .catch(err => console.error(err));
    } else {
        dispatch({
            type: ADD_TO_CART,
            payload: item
        });
    }
};

export const getCartItems = (user) => (dispatch) => {
    if (!isEmpty(user)) {
        const {id} = user;
        axios.get(`/api/cart/${id}`)
        .then(res => {
            if (res.data !== null) {
                dispatch({
                    type: SET_CART_ITEMS,
                    payload: res.data
                });
            }
        })
        .catch(err => console.log(err));
    }
};