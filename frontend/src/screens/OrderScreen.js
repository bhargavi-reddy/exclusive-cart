import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, ListGroupItem, Row, Col, Image, Card, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, updateOrderPayment, updateDeliveryStatus } from '../actions/orderActions'
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET, ORDER_CREATE_RESET} from '../constants/orderConstants'

const OrderScreen = ({ match,history }) => {
    const orderDetailsReducer = useSelector(state => state.orderDetailsReducer)
    const { order, loading, error } = orderDetailsReducer

    const orderPayment = useSelector(state => state.orderPayment)
    const { loading: loadingPay, success: successPay } = orderPayment

    const orderDeliveryStatus = useSelector(state => state.orderDeliveryStatus)
    const { loading: loadingDeliver, success: successDeliver, error: errorDeliver } = orderDeliveryStatus

    const userLogin = useSelector(state => state.userLogin)
    const { userData } = userLogin


    const dispatch = useDispatch()
    const [sdkStatus, setSdkStatus] = useState(false)

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(Number(order.orderItems.reduce((acc, curr) => acc + (curr.qty * curr.price), 0)))
    }


    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkStatus(true)
            }
            document.body.appendChild(script)
        }
        if(!userData){
            history.push('/login')
        }
        if (Object.keys(order).length === 0 || successPay || successDeliver || match.params.id !== order._id) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch({type: ORDER_CREATE_RESET})
            dispatch(getOrderDetails(match.params.id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkStatus(true)
            }
        }
    }, [match, order, successPay, dispatch, successDeliver, history,userData])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(updateOrderPayment(match.params.id, paymentResult))
    }

    const deliverHandler = (order) =>{
        dispatch(updateDeliveryStatus(order))
        // history.push('/admin/orderlist')
    }

    return loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
        <>
            <Row>
                <h1 style={{ padding: '1em 0em' }}>Order: {order._id}</h1>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                            <p><strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                            </p>
                            <p>{order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}</p>

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p><strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            <p>{order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Order Items</h4>
                            {order.orderItems.length === 0 ? (<Message >Your order is empty</Message>)
                                : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} X $ {item.price}  = $ {item.price * item.qty}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h4>Order Summary</h4>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items Price: </Col>
                                    <Col>$ {order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping Price: </Col>
                                    <Col>$ {order.shipppingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax Price: </Col>
                                    <Col>$ {order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total Price: </Col>
                                    <Col>$ {order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            {!order.isPaid && (
                                <ListGroupItem>
                                    {loadingPay && <Loader></Loader>}
                                    {!sdkStatus ? <Loader></Loader> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                                    )}
                                </ListGroupItem>
                            )}

                            {userData && userData.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroupItem>
                                    <Button className='btn btn-block' onClick={() =>{
                                        deliverHandler(order)
                                    }}>Mark As Delivered</Button>
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default OrderScreen
