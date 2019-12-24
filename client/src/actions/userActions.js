import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ADDRESS_UPDATED, GET_ERRORS, SET_CURRENT_USER, SET_USER_COLOR, REQUEST_SUCCESS } from './types';
import M from 'materialize-css';
import setAuthToken from '../utils/setAuthToken';

export const loginUser = (user) => (dispatch) => {
    dispatch({
        type: GET_ERRORS,
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
                type: GET_ERRORS,
                payload: {}
            });
            history.push('/users/login');
            M.toast({
                html: 'Registration Successful',
                classes: 'toast-valid'
            });
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
            if (localStorage.jwtToken) {
                localStorage.removeItem('jwtToken');

                const userData = res.data;
                const token = userData.token;
                delete userData.token;
                
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
            }
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            M.toast({
                html: 'User Updated',
                classes: 'toast-valid'
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

export const addAddress = (address) => (dispatch) => {
    axios.put('/api/users/addAddress', address)
        .then(res => {
            M.toast({
                html: 'Address saved successfully',
                classes: 'toast-valid', 
                displayLength: 3000,
                completeCallback: () => {
                    if (localStorage.jwtToken) {
                        localStorage.removeItem('jwtToken');
        
                        const userData = res.data;
                        const token = userData.token;
                        delete userData.token;
                        
                        localStorage.setItem('jwtToken', token);
                        setAuthToken(token);
                        const decoded = jwt_decode(token);
                        dispatch(setCurrentUser(decoded));
                    }
                }
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

export const removeAddress = (addressId) => (dispatch) => {
    axios.put('/api/users/removeAddress', addressId)
        .then(res => {
            M.toast({
                html: 'Address Removed',
                classes: 'toast-valid',
                displayLength: 3000
            });
            if (localStorage.jwtToken) {
                localStorage.removeItem('jwtToken');

                const userData = res.data;
                const token = userData.token;
                delete userData.token;
                
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
            }
        })
        .catch(err => console.error(err));
}; 

export const changePassword = (data) => (dispatch) => {
    axios.put('/api/users/changePassword', data)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            M.toast({
                html: 'Password changed Successfully',
                classes: 'toast-valid'
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
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser(null));
};