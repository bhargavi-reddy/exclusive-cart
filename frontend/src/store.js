import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer, productDetailsReducer,productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, listOfTopProductsReducer } from './reducers/productsReducer'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, deleteUserReducer, updateUserReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, updatePaymentReducer, myOrderListReducer, orderListReducer, updateDeliveryStatusReducer } from './reducers/orderReducers'

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {
        userData: userInfoFromStorage
    }
}
const middleware = [thunk]
const reducer = combineReducers(
    {
        productsList: productsReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer,
        userList: userListReducer,
        orderCreate: orderCreateReducer,
        orderDetailsReducer: orderDetailsReducer,
        orderPayment: updatePaymentReducer,
        myOrderList: myOrderListReducer,
        deleteUser: deleteUserReducer,
        updatedUserData: updateUserReducer,
        deleteProductData: productDeleteReducer,
        createProductData : productCreateReducer,
        updatedProductData : productUpdateReducer,
        allOrdersList: orderListReducer,
        orderDeliveryStatus: updateDeliveryStatusReducer,
        productReviewCreate: productReviewCreateReducer,
        listOfTopProducts : listOfTopProductsReducer


    })
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store