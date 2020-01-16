import { ADD_TO_CART } from '../actions/types';

const initalState = [];

export default (state = initalState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // TODO: Do not add item to cart if item already exists.
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
}; 