import {USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGOUT_REQUEST, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_DETAILS_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_FAIL, USER_DELETE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL} from '../constants/userConstants'
import {MY_ORDER_LIST_RESET} from '../constants/orderConstants'
import axios from 'axios'
import { CART_RESET } from '../constants/cartConstants'

export const userLogin = (email, password) =>{
    return async (dispatch)=>{

        try {
            dispatch({type: USER_LOGIN_REQUEST})

            const config = {
                headers:{
                    'Content-type': 'application/json'
                }
            }
            const {data} = await axios.post('/api/users/login', {email: email, password: password},config)
            dispatch({type:USER_LOGIN_SUCCESS, payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:USER_LOGIN_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}

export const userLogout = ()=>{
    return async(dispatch)=>{
        try {
            localStorage.removeItem('userInfo')
            dispatch({type: USER_LOGOUT_REQUEST, payload: {}})
            dispatch({type: MY_ORDER_LIST_RESET })
            dispatch({type: USER_DETAILS_RESET})
            dispatch({type: CART_RESET})
        } catch (error) {
            console.log(error)
        }
    }
}
export const userRegister = (name, email, password) =>{
    return async (dispatch)=>{

        try {
            dispatch({type: USER_REGISTER_REQUEST})

            const config = {
                headers:{
                    'Content-type': 'application/json'
                }
            }
            const {data} = await axios.post('/api/users', {name: name, email: email, password: password},config)
            dispatch({type: USER_REGISTER_SUCCESS, payload: data})
            
            dispatch({type:USER_LOGIN_REQUEST})
            dispatch({type:USER_LOGIN_SUCCESS, payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:USER_REGISTER_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}

export const getUserDetails = (id) =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: USER_DETAILS_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    authorization: `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.get(`/api/users/${id}`,config)
            dispatch({type: USER_DETAILS_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:USER_DETAILS_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}


export const updateUserProfile = (user) =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: USER_UPDATE_PROFILE_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    authorization: `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.put(`/api/users/profile`,user,config)
            dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:USER_UPDATE_PROFILE_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}

export const getUserList = () =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: USER_LIST_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    authorization: `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.get(`/api/users`,config)
            dispatch({type: USER_LIST_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:USER_LIST_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}
export const removeUser = (id) =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: USER_DELETE_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    authorization: `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.delete(`/api/users/${id}`,config)
            dispatch({type: USER_DELETE_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:USER_DELETE_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}

export const updateUser = (user) =>{
    return async (dispatch, getState)=>{

        try {
            dispatch({type: USER_UPDATE_REQUEST})
            const {userLogin : { userData}} = getState()

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    authorization: `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.put(`/api/users/${user._id}`,user,config)
            dispatch({type: USER_UPDATE_SUCCESS})
            dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(JSON.stringify(error))
            dispatch({type:USER_UPDATE_FAIL, payload: error.response && error.response.data.message ?error.response.data.message: error.response.data ? error.response.data: error.message})
        }

    }
}