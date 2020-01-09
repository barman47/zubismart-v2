import { SET_BRANDS } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_BRANDS:
            return action.payload;
            
        default:
            return state;
    }
};