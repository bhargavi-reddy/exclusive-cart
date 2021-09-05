import {CART_ADD_ITEM,CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, PAYMENT_METHOD} from '../constants/cartConstants'
import axios from 'axios'

export const addToCart = (id, qty)=>{
    return async (dispatch, getState) =>{
        const {data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload:{
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }

}

export const removeFromCart = (id) =>{
    return async (dispatch, getState)=>{
        dispatch({
            type: CART_REMOVE_ITEM,
            payload:id
        })
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
    }

}

export const saveShippingAddress = (data) =>{
    return async (dispatch)=>{
        dispatch({
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload:data
        })
        localStorage.setItem('shippingAddress',JSON.stringify(data))
    }
}
export const savePaymentMethod = (paymentMethod)=>{
    return async (dispatch) =>{
        dispatch({
            type: PAYMENT_METHOD,
            payload: paymentMethod
        })
        localStorage.setItem('paymentMethod',paymentMethod)
    }
    
}