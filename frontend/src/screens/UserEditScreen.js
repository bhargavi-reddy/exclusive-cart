import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import FormComponent from '../components/FormComponent'
import { getUserDetails, updateUser } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, userDetailsData } = userDetails

    const updatedUserData = useSelector(state => state.updatedUserData)
    const { loading: updatedLoading, error: updatedError, success: updatedSuccess } = updatedUserData


    useEffect(() => {
        if (updatedSuccess) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!userDetailsData.name || userDetailsData._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(userDetailsData.name)
                setEmail(userDetailsData.email)
                setIsAdmin(userDetailsData.isAdmin)
            }
        }


    }, [dispatch, userId, userDetailsData, match, updatedSuccess, history])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name: name, email: email, isAdmin: isAdmin }))

    }

    return (
        <>
            <LinkContainer to={`/admin/userlist`}>
                <Button className='btn btn-light'>Go Back</Button>
            </LinkContainer>
            <FormComponent>
                <h1>Edit User</h1>
                {updatedLoading ? <Loader></Loader> : updatedError ? <Message variant='danger'>{updatedError}</Message> :
                    (loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
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
                            <FormGroup controlId='isadmin'>
                                <Form.Check type="checkbox" label='isAdmin' checked={isAdmin} onChange={(e) => (
                                    setIsAdmin(e.target.checked)
                                )}></Form.Check>
                            </FormGroup>
                            <Button type='Submit' variant='primary'>Update</Button>
                        </Form>
                    ))}


            </FormComponent>
        </>

    )
}

export default UserEditScreen
