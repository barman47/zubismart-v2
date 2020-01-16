import { SET_ADMIN } from "../actions/types";

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN: 
            return action.payload

        default:
            return state;
    }
};