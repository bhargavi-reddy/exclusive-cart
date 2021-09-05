import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, FormGroup, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import {getMyOrderList} from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const userDetailsSelector = useSelector(state => state.userDetails)
    const { loading, error, userDetailsData } = userDetailsSelector

    const userInfoSelector = useSelector(state => state.userLogin)
    const { userData } = userInfoSelector

    const updateProfileSelector = useSelector(state => state.userUpdateProfile)
    const { success } = updateProfileSelector

    const myOrderList = useSelector(state => state.myOrderList)
    const {  loading: loadingOrderList, orderList , error: errorList} = myOrderList

    useEffect(() => {
        if (!userData) {
            history.push('/login')
        } else {
            if (!userDetailsData.name) {
                dispatch(getUserDetails('profile'))
                dispatch(getMyOrderList())
            } else {
                setName(userDetailsData.name)
                setEmail(userDetailsData.email)
            }
        }
    }, [dispatch, userData, history,userDetailsData])


    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords doesnt match ')
        } else {
            dispatch(updateUserProfile({id: userDetailsData._id, name, email, password}))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Updated Profile Successfully</Message>}
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
                    <Button type='Submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                        {loadingOrderList ? <Loader></Loader> : errorList ? <Message variant='danger'>{error}</Message> :
                        (<Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.map(x => (
                                    <tr key={x._id}>
                                        <td>{x._id}</td>
                                        <td>{x.createdAt.substring(0, 10)}</td>
                                        <td>{x.totalPrice}</td>
                                        <td>{x.isPaid ? (x.paidAt.substring(0, 10) ): (<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                                        <td>{x.isDelivered ? (x.deliveredAt.substring(0, 10) ): (<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                                        <td>
                                            <LinkContainer to={`/order/${x._id}`}>
                                                <Button className='btn-sm' variant='light'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>)}
            </Col>
        </Row>
    )
}

export default ProfileScreen
