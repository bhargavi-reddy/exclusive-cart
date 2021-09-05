const express = require('express')
const router = express.Router()
const {validateUser, isAdmin} = require('../middleware/authorizationMiddleware')
const { addOrder, getOrderById, updateOrderPayment, getMyOrders, getOrders,updateDeliverStatus } = require('../controller/orderController')

router.route('/').post(validateUser, addOrder).get(validateUser, isAdmin, getOrders)
router.get('/myorders', validateUser, getMyOrders)
router.route('/:id').get( validateUser, getOrderById)
router.put('/:id/pay', validateUser, updateOrderPayment)
router.put('/:id/deliver', validateUser,isAdmin,updateDeliverStatus)


module.exports = router