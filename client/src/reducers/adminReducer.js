import { SET_ADMIN } from "../actions/types";
// import isEmpty from "../validation/is-empty";

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN: 
            return action.payload

        default:
            return state;
    }
};