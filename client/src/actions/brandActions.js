import { GET_ERRORS, SET_BRANDS } from './types';
import axios from 'axios';
import M from 'materialize-css';

export const addBrand = (brand) => (dispatch) => {
    axios.post('/api/brands/add', brand)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            M.toast({
                html: res.data.msg,
                classes: 'toast-valid'
            });
        })
        .catch(err => {
            try {
                M.toast({
                    html: 'Brand not added',
                    classes: 'toast-invalid'
                });
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            } catch (error) {
                dispatch({
                    type: GET_ERRORS,
                    payload: {}
                });
            }
        });
};

export const getBrands = () => (dispatch) => {
    try {
        axios.get('/api/brands/all')
        .then(res => {
            dispatch({
                type: SET_BRANDS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        }); 
    }
};