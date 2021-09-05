import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { getUserList, removeUser } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const { loading, users, error } = userList


    const userLogin = useSelector(state => state.userLogin)
    const { userData } = userLogin

    const deleteUser = useSelector(state => state.deleteUser)
    const { success: successDelete } = deleteUser

    useEffect(() => {
        if(userData && userData.isAdmin)
            dispatch(getUserList())
        else
            history.push('/login')
    }, [dispatch, successDelete, userData, history])

    const deleteUserHandler = (id) => {
        if(window.confirm('Are you sure to delete a user')){
            dispatch(removeUser(id))
        }
    }

    return (
        loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
            <>
                <h1>Users</h1>
                <Table striped bordered responsive hover className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}></i>) :
                                    (<i className='fas fa-times' style={{ color: 'red' }}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteUserHandler(user._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        )
    )
}

export default UserListScreen
