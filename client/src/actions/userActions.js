import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER, SET_USER_COLOR, REQUEST_SUCCESS } from './types';
import M from 'materialize-css';
import setAuthToken from '../utils/setAuthToken';

export const loginUser = (user) => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
        payload: {}
    });
    axios.post('/api/users/login', user)
        .then(res => {
            M.toast({
                html: 'Logged in successfuly',
                classes: 'toast-valid'
            });

            // Save token to local storage
            const { token } = res.data;
            
            // Set token to local storage
            localStorage.setItem('jwtToken', token);

            // Set token to auth header
            setAuthToken(token);

            // Decode toke to get user data
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            try {
                switch (err.response.status) {
                    case 500:
                        const error = {
                            message: 'Please check your internet connection',
                            status: 500
                        };
                        dispatch({
                            type: GET_ERRORS,
                            payload: error
                        });
                        break;
    
                    default:
                        dispatch({
                            type: GET_ERRORS,
                            payload: err.response.data
                        });
                        break;
                }
            } catch (error) {
                console.log(error);
            }
        });
};

export const registerUser = (user, history) => (dispatch) => {
    axios.post('/api/users/register', user)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS,
                payload: {}
            });
            history.push('/users/login');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            
        });
};

export const updateUserData = (userData) => (dispatch) => {
    axios.put('/api/users/updateData', userData)
        .then(res => {
            dispatch({
                type: REQUEST_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            try {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            } catch (err) {
                dispatch({
                    type: GET_ERRORS
                });
                M.toast({
                    html: 'Error! Please retry.',
                    classes: 'toast-invalid'
                });
            }
        });
};

export const changePassword = (data) => (dispatch) => {
    axios.put('/api/users/changePassword', data)
        .then(res => dispatch({
            type: REQUEST_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            try {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            } catch (err) {
                dispatch({
                    type: GET_ERRORS
                });
                M.toast({
                    html: 'Error! Please retry.',
                    classes: 'toast-invalid'
                });
            }
        });
};

export const setUserColor = (color) => (dispatch) => dispatch({
    type: SET_USER_COLOR,
    payload: color
});

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
}

export const logoutUser = () => (dispatch) => {
    console.log('Logout user');
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};