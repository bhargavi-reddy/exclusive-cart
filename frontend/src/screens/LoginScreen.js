import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, FormGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormComponent from '../components/FormComponent'
import { userLogin } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const userInfoSelector = useSelector(state => state.userLogin)
    const { loading, error, userData } = userInfoSelector
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(()=>{
        if(userData && Object.keys(userData).length !== 0)
            history.push(redirect)
    },[redirect, userData, history])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password))
    }
    return (
        <FormComponent>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder='Enter email' value={email} onChange={(e) => (
                        setEmail(e.target.value)
                    )}></Form.Control>
                </FormGroup>
                <FormGroup controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder='Enter Password' value={password} onChange={(e) => (
                        setPassword(e.target.value)
                    )}></Form.Control>
                </FormGroup>
                <Button type='Submit' variant='primary'>Log in</Button>
            </Form>
            <Row className='py-3'>
                <Col>New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
            </Row>
        </FormComponent>
    )
}

export default LoginScreen
