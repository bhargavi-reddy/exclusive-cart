import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, ListGroupItem, Button, Row, Col, Image, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const orderCreate = useSelector(state => state.orderCreate)
    const { orderDetails, success, error } = orderCreate
    const dispatch = useDispatch()
    const { shippingAddress, cartItems, paymentMethod } = cart
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    cart.itemsPrice = addDecimals(Number(cartItems.reduce((acc, curr) => acc + (curr.qty * curr.price), 0)))
    cart.shippingPrice = addDecimals(Number(cart.itemsPrice > 100 ? 50 : 0))
    cart.taxPrice = addDecimals(Number(cart.itemsPrice > 100 ? (0.15 * cart.itemsPrice) : 0))
    cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))

    useEffect(() => {
        if (success)
            history.push(`/order/${orderDetails._id}`)
    }, [history, success, orderDetails])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            paymentMethod: paymentMethod
        }))
    }
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                            <p><strong>Address: </strong>
                                {shippingAddress.address}, {shippingAddress.city},{shippingAddress.postalCode},{shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p><strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Order Items</h4>
                            {cartItems.length === 0 ? (<Message >Your cart is empty</Message>)
                                : (
                                    <ListGroup variant='flush'>
                                        {cartItems.map((item, index) => (
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
                                    <Col>$ {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping Price: </Col>
                                    <Col>$ {cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax Price: </Col>
                                    <Col>$ {cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total Price: </Col>
                                    <Col>$ {cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button type='button' className='btn-block' onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default PlaceOrderScreen
