import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_ADMIN } from './types';
import M from 'materialize-css';
import setAuthToken from '../utils/setAuthToken';

export const loginAdmin = (admin) => (dispatch) => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });
    axios.post('/api/admin/login', admin)
        .then(res => {
            M.toast({
                html: 'Admin Logged in successfuly',
                classes: 'toast-valid'
            });

            if (localStorage.jwtToken){
                localStorage.removeItem('jwtToken');
            }

            // Save token to local storage
            const { token } = res.data;
            
            // Set token to local storage
            localStorage.setItem('jwtAdminToken', token);

            // Set token to auth header
            setAuthToken(token);

            // Decode toke to get user data
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentAdmin(decoded));
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

// export const updateUserData = (userData) => (dispatch) => {
//     axios.put('/api/users/updateData', userData)
//         .then(res => {
//             if (localStorage.jwtToken) {
//                 localStorage.removeItem('jwtToken');

//                 const userData = res.data;
//                 const token = userData.token;
//                 delete userData.token;
                
//                 localStorage.setItem('jwtToken', token);
//                 setAuthToken(token);
//                 const decoded = jwt_decode(token);
//                 dispatch(setCurrentAdmin(decoded));
//             }
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: {}
//             });
//             M.toast({
//                 html: 'User Updated',
//                 classes: 'toast-valid'
//             });
//         })
//         .catch(err => {
//             try {
//                 dispatch({
//                     type: GET_ERRORS,
//                     payload: err.response.data
//                 });
//             } catch (err) {
//                 dispatch({
//                     type: GET_ERRORS
//                 });
//                 M.toast({
//                     html: 'Error! Please retry.',
//                     classes: 'toast-invalid'
//                 });
//             }
//         });
// };

// export const addAddress = (address) => (dispatch) => {
//     axios.put('/api/users/addAddress', address)
//         .then(res => {
//             M.toast({
//                 html: 'Address saved successfully',
//                 classes: 'toast-valid', 
//                 displayLength: 3000,
//                 completeCallback: () => {
//                     if (localStorage.jwtToken) {
//                         localStorage.removeItem('jwtToken');
        
//                         const userData = res.data;
//                         const token = userData.token;
//                         delete userData.token;
                        
//                         localStorage.setItem('jwtToken', token);
//                         setAuthToken(token);
//                         const decoded = jwt_decode(token);
//                         dispatch(setCurrentAdmin(decoded));
//                     }
//                 }
//             });
//         })
//         .catch(err => {
//             try {
//                 dispatch({
//                     type: GET_ERRORS,
//                     payload: err.response.data
//                 });
//             } catch (err) {
//                 dispatch({
//                     type: GET_ERRORS
//                 });
//                 M.toast({
//                     html: 'Error! Please retry.',
//                     classes: 'toast-invalid'
//                 });
//             }
//         });
// };

// export const removeAddress = (addressId) => (dispatch) => {
//     axios.put('/api/users/removeAddress', addressId)
//         .then(res => {
//             M.toast({
//                 html: 'Address Removed',
//                 classes: 'toast-valid',
//                 displayLength: 3000
//             });
//             if (localStorage.jwtToken) {
//                 localStorage.removeItem('jwtToken');

//                 const userData = res.data;
//                 const token = userData.token;
//                 delete userData.token;
                
//                 localStorage.setItem('jwtToken', token);
//                 setAuthToken(token);
//                 const decoded = jwt_decode(token);
//                 dispatch(setCurrentAdmin(decoded));
//             }
//         })
//         .catch(err => console.error(err));
// }; 

// export const changePassword = (data) => (dispatch) => {
//     axios.put('/api/users/changePassword', data)
//         .then(res => {
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: {}
//             });
//             M.toast({
//                 html: 'Password changed Successfully',
//                 classes: 'toast-valid'
//             });
//         })
//         .catch(err => {
//             try {
//                 dispatch({
//                     type: GET_ERRORS,
//                     payload: err.response.data
//                 });
//             } catch (err) {
//                 dispatch({
//                     type: GET_ERRORS
//                 });
//                 M.toast({
//                     html: 'Error! Please retry.',
//                     classes: 'toast-invalid'
//                 });
//             }
//         });
// };

// Set logged in user
export const setCurrentAdmin = (decoded) => {
    return {
        type: SET_ADMIN,
        payload: decoded
    };
}

export const logoutAdmin = () => (dispatch) => {
    localStorage.removeItem('jwtAdminToken');
    setAuthToken(false);
    dispatch(setCurrentAdmin(null));
    M.toast({
        html: 'Admin logged out Successfully',
        classes: 'toast-valid'
    });
};