import { ADDRESS_UPDATED, SET_CURRENT_USER, REQUEST_SUCCESS } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
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
                user: action.payload
            }

        case ADDRESS_UPDATED:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
};