import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '../constants/Constants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const item = action.payload;

            
            const isItemExist = state.cartItems.find(i => i.productId === item.productId)

            // item.total =  
            if (isItemExist) {
                const quantity = Number(item.quantity)+Number(isItemExist.quantity);
                item.quantity = quantity;
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.productId === isItemExist.productId ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.productId !== action.payload)
            }


        // case SAVE_SHIPPING_INFO:
        //     return {
        //         ...state,
        //         shippingInfo: action.payload
        //     }


        default:
            return state
    }
}