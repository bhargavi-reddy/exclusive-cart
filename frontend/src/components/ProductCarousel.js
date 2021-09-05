import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOfTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
    const dispatch = useDispatch()
    const topListProducts = useSelector(state => state.listOfTopProducts)
    const { topProducts, loading, error } = topListProducts

    useEffect(() => {
        dispatch(listOfTopProducts())
    }, [dispatch])
    return loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-dark'>
            {topProducts.map(x => (
                <Carousel.Item key={x._id}>
                    <Link to={`/products/${x._id}`}>
                        <Image src={x.image} alt={x.name} fluid></Image>
                        <Carousel.Caption className='carousel-caption'>
                            <h4>{x.name} (${x.price})</h4>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
