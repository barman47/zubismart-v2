import { ADDRESS_ADDED, SET_CURRENT_USER, SET_USER_COLOR, REQUEST_SUCCESS } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
    msg: '',
    authenticated: false,
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                authenticated: !isEmpty(action.payload),
                user: action.payload
            };

        case REQUEST_SUCCESS:
            return {
                ...state,
                msg: action.payload
            }

        case ADDRESS_ADDED:
            return {
                ...state,
                user: action.payload
            }

        case SET_USER_COLOR:
            return {
                ...state,
                color: action.payload
            };

        default:
            return state;
    }
};