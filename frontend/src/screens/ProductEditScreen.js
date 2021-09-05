import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import FormComponent from '../components/FormComponent'
import { productDetails, updateProduct } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_UPDATE_RESET } from '../constants/productsConstants'

const ProductEditScreen = ({ match, history }) => {

    const productId = match.params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()
    const productDetailsData = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetailsData

    const updatedProductData = useSelector(state => state.updatedProductData)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = updatedProductData


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push(`/admin/productlist`)
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(productDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setDescription(product.description)
                setCountInStock(product.countInStock)
                setBrand(product.brand)
                setCategory(product.category)
                setImage(product.image)

            }
        }
    }, [dispatch, productId, product, match, history, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(updateUser({ _id: userId, name: name, email: email, isAdmin: isAdmin }))
        dispatch(updateProduct({ _id: product._id, name: name, description: description, price: price, brand: brand, category: category, countInStock: countInStock, image: image }))

    }
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/upload', formData, config)
    
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
      }

    return (
        <>
            <LinkContainer to={`/admin/productlist`}>
                <Button className='btn btn-light'>Go Back</Button>
            </LinkContainer>
            <FormComponent>
                <h1 style={{ padding: ' 0em 0em 1em 0em' }}>Edit Product</h1>
                {loadingUpdate && <Loader></Loader>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <FormGroup controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder='Enter Name' value={name} onChange={(e) => (
                                setName(e.target.value)
                            )}></Form.Control>
                        </FormGroup>
                        <FormGroup controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="numbet" placeholder='Enter Price' value={price} onChange={(e) => (
                                setPrice(e.target.value)
                            )}></Form.Control>
                        </FormGroup>
                        <FormGroup controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder='Enter Description' value={description} onChange={(e) => (
                                setDescription(e.target.value)
                            )}></Form.Control>
                        </FormGroup>
                        <FormGroup controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" placeholder='Enter Image' value={image} onChange={(e) => (
                                setImage(e.target.value)
                            )}></Form.Control>
                            <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                            {uploading && <Loader></Loader>}
                        </FormGroup>
                        <FormGroup controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type="numbet" placeholder='Enter Count In Stock' value={countInStock} onChange={(e) => (
                                setCountInStock(e.target.value)
                            )}></Form.Control>
                        </FormGroup>
                        <FormGroup controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" placeholder='Enter Brand' value={brand} onChange={(e) => (
                                setBrand(e.target.value)
                            )}></Form.Control>
                        </FormGroup>
                        <FormGroup controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder='Enter category' value={category} onChange={(e) => (
                                setCategory(e.target.value)
                            )}></Form.Control>
                        </FormGroup>
                        <Button type='Submit' variant='primary'>Update</Button>
                    </Form>
                )}


            </FormComponent>
        </>

    )
}

export default ProductEditScreen
