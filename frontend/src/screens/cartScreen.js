import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id
    const qty = location.search ? location.search.split('=')[1] : 1
    const dispatch = useDispatch()
    const cartSelector = useSelector(state => state.cart)
    const { cartItems } = cartSelector

    const removeItemHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        history.push(`/login?redirect=shipping`)
    }
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => {
                                            dispatch(addToCart(item.product, Number(e.target.value)))
                                        }}>
                                            {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button  type='button'  variant='light'onClick={() => removeItemHandler(item.product)}><i className='fas fa-trash'></i></Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroupItem>
                            <h4>Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items</h4>
                        </ListGroupItem>
                        <ListGroupItem>
                            ${cartItems.reduce((acc, curr) => acc + Number(curr.qty * curr.price), 0).toFixed(2)}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
