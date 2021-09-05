import {PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL} from '../constants/productsConstants'
import axios from 'axios'

export const listOfProducts = (keyword='', pageNumber = '') =>{
    return async (dispatch)=>{

        try {
            dispatch({type: PRODUCT_LIST_REQUEST})

            const {data} = await axios.get(`/api/products?keyword=${keyword}&page=${pageNumber}`)
            dispatch({type:PRODUCT_LIST_SUCCESS, payload: data})
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.message })
        }

    }
}

export const productDetails = (id)=>{
    return async (dispatch)=>{
        try {

            dispatch({type:PRODUCT_DETAILS_REQUEST})

            const {data} = await axios.get(`/api/products/${id}`)
            dispatch({type:PRODUCT_DETAILS_SUCCESS, payload: data})
            
        } catch (error) {
            dispatch({type:PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.message})
            
        }
    }
}

export const deleteProduct = (id) =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: PRODUCT_DELETE_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    authorization: `Bearer ${userData.token}`
                }
            }
            await axios.delete(`/api/products/${id}`,config)
            dispatch({type: PRODUCT_DELETE_SUCCESS})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:PRODUCT_DELETE_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}


export const createProduct = () =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: PRODUCT_CREATE_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    authorization: `Bearer ${userData.token}`
                }
            }
           const {data} =  await axios.post(`/api/products`,{},config)
            dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:PRODUCT_CREATE_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}


export const updateProduct = (product) =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: PRODUCT_UPDATE_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    authorization: `Bearer ${userData.token}`
                }
            }
           const {data} =  await axios.put(`/api/products/${product._id}`,product,config)
            dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:PRODUCT_UPDATE_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}

export const createProductReview = (productId, review) =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    authorization: `Bearer ${userData.token}`
                }
            }
           const {data} =  await axios.post(`/api/products/${productId}/reviews`,review,config)
            dispatch({type: PRODUCT_CREATE_REVIEW_SUCCESS})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:PRODUCT_CREATE_REVIEW_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}

export const listOfTopProducts = () =>{
    return async (dispatch)=>{

        try {
            dispatch({type: PRODUCT_TOP_REQUEST})

            const {data} = await axios.get(`/api/products/top`)
            
            dispatch({type:PRODUCT_TOP_SUCCESS, payload: data})
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:PRODUCT_TOP_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.message })
        }

    }
}