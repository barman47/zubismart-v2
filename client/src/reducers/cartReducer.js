import { ADD_TO_CART, SET_CART_ITEMS, CLEAR_CART, SET_PRODUCT_QUANTITY, SET_PRODUCT_QUANTITY_NO_USER } from '../actions/types';

const initalState = {
    products: []
};

export default (state = initalState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const productExists = state.products.some(product => product.product._id === action.payload[0].product._id);
            if (!productExists) {
                return {
                    ...state,
                    products: state.products.concat(action.payload)
                };
            }

            return state;
        // case ADD_ITEMS_TO_CART:
        //     console.log(action.payload);
        //     break;

        case SET_CART_ITEMS:
            return  action.payload;

        case SET_PRODUCT_QUANTITY:
            let updatedProducts = state.products;
            updatedProducts.forEach(product => {
                if (product._id === action.payload._id) {
                    product.quantity = action.payload.quantity;
                }
            });
            return {
                ...state,
                products: updatedProducts
            };

        case SET_PRODUCT_QUANTITY_NO_USER:
            let upToDateProducts = state.products;
            upToDateProducts.forEach(product => {
                if (product.product._id === action.payload.product._id) {
                    product.quantity = action.payload.quantity;
                }
            });
            return {
                ...state,
                products: upToDateProducts
            };

        case CLEAR_CART:
            return {
                products: []
            };

        default:
            return state;
    }
}; 