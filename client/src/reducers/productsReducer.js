import { SET_PRODUCTS } from "../actions/types";

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: 
            return action.payload

        default:
            return state;
    }
};