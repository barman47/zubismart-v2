import { PRODUCT_ADDED, SET_PRODUCTS, PRODUCT_UPDATED, PRODUCT_DELETED } from "../actions/types";

const initialState = {
    product: {},
    products: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: 
            return {
                ...state,
                products: action.payload
            };

            case PRODUCT_ADDED:
                return {
                    ...state,
                    product: action.payload
                };

            case PRODUCT_DELETED:
                return {
                    ...state,
                    products: state.products.filter(product => product._id !== action.payload._id)
                };

            case PRODUCT_UPDATED:
                return {
                    ...state,
                    product: action.payload
                };

        default:
            return state;
    }
};