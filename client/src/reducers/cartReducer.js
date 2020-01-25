import { ADD_TO_CART, ADD_ITEMS_TO_CART, SET_CART_ITEMS, CLEAR_CART } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initalState = {
    products: []
};

export default (state = initalState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            try {
                if (!state.products.includes(action.payload[0])) {
                    return {
                        ...state,
                        products: state.products.concat(action.payload)
                    };
                } else {
                    return state;
                }
            } catch (err) {

            }

        case ADD_ITEMS_TO_CART:
            console.log(action.payload);
            // let items = action.filter(item => state.products.contains())
            break;

        case SET_CART_ITEMS:
            return  action.payload;

        case CLEAR_CART:
            return {
                products: []
            };

        default:
            return state;
    }
}; 