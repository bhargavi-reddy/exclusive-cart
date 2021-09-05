const asyncHandler = require('express-async-handler')
const Order = require('../model/orderModel')

const addOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, totalPrice, shippingPrice, taxPrice, itemsPrice, paymentMethod } = req.body
    if (orderItems && orderItems.length === 0) {
        req.statusCode(400)
        throw new Error('No items found')
    } else {
        const newOrder = new Order({
            orderItems,
            shippingAddress,
            totalPrice,
            shippingPrice,
            taxPrice,
            itemsPrice,
            paymentMethod,
            user: req.user._id

        })
        const createdOrder = await newOrder.save()
        res.status(201).json(createdOrder)
    }
})

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error(`No order found..`)
    }
})

const updateOrderPayment = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save();
        if (updatedOrder)
            res.json(updatedOrder)
        else {
            res.status(404)
            throw new Error(`payment updating failed`)
        }
    } else {
        res.status(404)
        throw new Error(`No order found..`)
    }
})


const updateDeliverStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        if (updatedOrder)
            res.json(updatedOrder)
        else {
            res.status(404)
            throw new Error(` updating delivery status failed`)
        }
    } else {
        res.status(404)
        throw new Error(`No order found..`)
    }
})

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    if (orders) {
        res.json(orders)
    } else {
        res.status(404)
        throw new Error(`No order found..`)
    }
})

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    if (orders) {
        res.json(orders)
    } else {
        res.status(404)
        throw new Error(`No order found..`)
    }
})


module.exports = { addOrder, getOrderById, updateOrderPayment, getMyOrders, getOrders, updateDeliverStatus }