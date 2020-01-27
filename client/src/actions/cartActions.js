import { ADD_TO_CART, SET_CART_ITEMS, ADD_ITEMS_TO_CART, SET_PRODUCT_QUANTITY, SET_PRODUCT_QUANTITY_NO_USER } from './types';
import axios from 'axios';
import isEmpty from '../validation/is-empty';
import { FloatingActionButton } from 'materialize-css';

export const addToCart = (item, user) => (dispatch) => {
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

// export const addItemsToCart = (items, user) => (dispatch) => {
//     const data = {
//         userID: user.id,
//         items
//     };
//     axios.post('/api/cart/addItems', data)
//         .then(res => {
//             dispatch({
//                 type: ADD_ITEMS_TO_CART,
//                 payload: [res.data]
//             });
//             console.log(res.data);
//         })
//         .catch(err => console.error(err));
// };

export const increaseItemCount = (item, user) => (dispatch) => {
    try {
        if (user.authenticated) {
            const data = { itemID: item._id, userID: user.user.id }
            axios.post('/api/cart/increment', data)
                .then(res => {
                    dispatch({
                        type: SET_PRODUCT_QUANTITY,
                        payload: res.data
                    });
                })
                .catch(err => console.error(err));
        } else {
            const data = {
                quantity: item.quantity + 1,
                product: item.product
            };
            dispatch({
                type: SET_PRODUCT_QUANTITY_NO_USER,
                payload: data
            });
        }
    } catch (err) {}
};

export const decreaseItemCount = (item, user) => (dispatch) => {
    try {
        if (user.authenticated) {
            const data = { itemID: item._id, userID: user.user.id }
            axios.post('/api/cart/decrement', data)
            .then(res => {
                    dispatch({
                        type: SET_PRODUCT_QUANTITY,
                        payload: res.data
                    });
                })
                .catch(err => console.error(err));
        } else {
            if (item.quantity !== 1) {
                const data = {
                    quantity: item.quantity - 1,
                    product: item.product
                };
                dispatch({
                    type: SET_PRODUCT_QUANTITY_NO_USER,
                    payload: data
                });
            }
        }
    } catch (err) {}
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
        .catch(err => console.error(err));
    }
};

export const removeCartItem = (cartId, productId) => (dispatch) => {
    const data = {
        cartId, productId
    };
    axios.put(`/api/cart/remove/${cartId}/${productId}`)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: SET_CART_ITEMS,
                payload: res.data
            });
        })
        .catch(err => console.error(err))
    console.log(data);
};