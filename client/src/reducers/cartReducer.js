import { ADD_TO_CART } from '../actions/types';

const initalState = [];

export default (state = initalState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let itemToReturn = null;
            state.find(item => {
                if (item._id === action.payload._id) {
                    itemToReturn = item;
                }
            });
            if (itemToReturn === null) {
                return [
                    ...state,
                    action.payload
                ];
            } else {
                return [...state];
            }
        default:
            return state;
    }
}; 