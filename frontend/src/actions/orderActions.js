import axios from 'axios'
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL } from '../constants/orderConstants'



export const createOrder = (order) =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: ORDER_CREATE_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    authorization: `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.post(`/api/orders`,order,config)
            dispatch({type: ORDER_CREATE_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:ORDER_CREATE_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}

export const getOrderDetails = (id) =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: ORDER_DETAILS_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    authorization: `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.get(`/api/orders/${id}`,config)
            dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:ORDER_DETAILS_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}


export const updateOrderPayment = (orderId, paymentResult) =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: ORDER_PAY_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    authorization: `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config)
            dispatch({type: ORDER_PAY_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:ORDER_PAY_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}

export const updateDeliveryStatus= (order) =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: ORDER_DELIVER_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    authorization: `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.put(`/api/orders/${order._id}/deliver`,{},config)
            dispatch({type: ORDER_DELIVER_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:ORDER_DELIVER_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}

export const getOrderList = () =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: ORDER_LIST_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    authorization: `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.get(`/api/orders`,config)
            dispatch({type: ORDER_LIST_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:ORDER_LIST_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}


export const getMyOrderList = () =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: MY_ORDER_LIST_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    authorization: `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.get(`/api/orders/myorders`,config)
            dispatch({type: MY_ORDER_LIST_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:MY_ORDER_LIST_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}