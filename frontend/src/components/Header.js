import React from 'react'
import {Route} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { userLogout } from '../actions/userActions'
import SearchComponent from './SearchComponent';

const Header = ({ history }) => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userLogin)
    const {  userData } = userInfo
    const logOutHandler = () => {
        dispatch(userLogout())
        // history.push('/login')
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({history}) =>  <SearchComponent history={history}></SearchComponent>}></Route>
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link ><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            {userData && Object.keys(userData).length !== 0 ? (
                                <NavDropdown title={userData.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/login'>
                                        <NavDropdown.Item onClick={logOutHandler} >Logout</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>)

                                : (<LinkContainer to="/login">
                                    <Nav.Link ><i className="fas fa-user"></i> Sign In</Nav.Link>
                                </LinkContainer>)}
                            {userData && userData.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item >Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item >Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>)}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
