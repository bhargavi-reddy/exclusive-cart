import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, ListGroup, Image, ListGroupItem, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { productDetails, createProductReview } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productsConstants'
import Meta from '../components/Meta'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()

    const detailsSelector = useSelector(state => state.productDetails)
    const { loading, error, product } = detailsSelector

    const userLogin = useSelector(state => state.userLogin)
    const { userData } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingReview, error: errorReview, success: successReview } = productReviewCreate

    useEffect(() => {
        if(successReview){
            alert('Review submitted')
            setComment('')
            setRating(0)
        }
        dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        dispatch(productDetails(match.params.id))

    }, [dispatch, match,successReview])
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {rating, comment}))
    }
    return (
        <>
            <Link to='/' className='btn btn-light'>Go Back
            </Link>
            {loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                <Meta title={product.name}></Meta>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid ></Image>
                        </Col>
                        <Col md={3} >
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: ${product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>$ {product.price}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    {product.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty} onChange={(e) => (
                                                        setQty(Number(e.target.value))
                                                    )}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}
                                    <ListGroupItem>
                                        <Row>
                                            <Button className='btn-block' disabled={product.countInStock === 0} onClick={addToCartHandler}>Add to Cart</Button>
                                        </Row>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h3>Reviews</h3>
                            <ListGroup>

                                {product.reviews.length === 0 ? <Message variant='primary'>No reviews</Message> : (
                                    product.reviews.map(r => {
                                       return <ListGroupItem key={r._id}>
                                            <strong>{r.name}</strong>
                                            <Rating value={r.rating}></Rating>
                                            <p>{r.createdAt.substr(0, 10)}</p>
                                            <p>{r.comment}</p>
                                        </ListGroupItem>
                                    })
                                )}
                                <ListGroupItem>
                                    <h5>Write a review</h5>
                                {errorReview && <Message variant='danger'>{errorReview}</Message>}
                                    {Object.keys(userData).length !== 0 ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as = 'select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                    <option value=''>Select..</option>
                                                    <option value='1'>1-Poor</option>
                                                    <option value='2'>2-Fair</option>
                                                    <option value='3'>3-Good</option>
                                                    <option value='4'>4-Very Good</option>
                                                    <option value='5'>5-Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea' rows={2} value = {comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Button type='submit' className='btn btn-primary'>Submit</Button>
                                        </Form>
                                    ) : <Message>Please <Link to={`/login`}>sign in</Link> to write a review</Message>}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )
            }
        </>
    )
}

export default ProductScreen
