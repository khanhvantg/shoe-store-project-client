import axios from './axios'
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '../constants/Constants'

export const addItemToCart = (data,quantity) => async (dispatch, getState) => {
    //const { data } = await axios.get(`/api/product/${id}`)
    console.log(data);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            productId: data.id,
            name: data.name,
            price: data.price,
            image: data.images[0].link,
            //stock: data.product.stock,
            quantity,
            total: quantity
        }
        
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}