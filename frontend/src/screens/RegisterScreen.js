import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, FormGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormComponent from '../components/FormComponent'
import { userRegister } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const userRegisterSelector = useSelector(state => state.userRegister)
    const { loading, error, userData } = userRegisterSelector

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userData)
            history.push(redirect)
    },[redirect, userData, history])


    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords doesnt match ')
        }else{
            dispatch(userRegister(name, email, password))
        }
    }

    return (
        <FormComponent>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
            <FormGroup controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder='Enter Name' value={name} onChange={(e) => (
                        setName(e.target.value)
                    )}></Form.Control>
                </FormGroup>
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
                <FormGroup controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => (
                        setConfirmPassword(e.target.value)
                    )}></Form.Control>
                </FormGroup>
                <Button type='Submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></Col>
            </Row>
        </FormComponent>
    )
}

export default RegisterScreen
