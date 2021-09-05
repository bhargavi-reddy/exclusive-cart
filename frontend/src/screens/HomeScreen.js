import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import{Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listOfProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword || '';
    const pageNumber = Number(match.params.pageNumber) || 1
    const dispatch = useDispatch()
    const productsList = useSelector(state => state.productsList) //select particular state of all the states mentioned in the store
    const { loading, error, products, page, pages } = productsList
    useEffect(() => {
        dispatch(listOfProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
    return (
        <>
            <Meta></Meta>
            {!keyword ? <ProductCarousel></ProductCarousel> : <Link to ='/'><Button className='btn btn-light'>Go Back</Button></Link>}
            <h1 style={{paddingTop: '2rem'}}>Latest Products</h1>
            {loading ? <Loader></Loader> : error ? <Message variant='danger' children={error}></Message> :
                (
                    <>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={3}>
                                    <Product product={product}></Product>
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword}></Paginate>
                    </>)}
        </>
    )
}

export default HomeScreen
