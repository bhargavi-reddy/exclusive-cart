import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb-2'>
            <NavItem>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled={true}>Sign In</Nav.Link>)}
            </NavItem>
            <NavItem>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Shipping</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled={true}>Shipping</Nav.Link>)}
            </NavItem>
            <NavItem>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled={true}>Payment</Nav.Link>)}
            </NavItem>
            <NavItem>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Place Order</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled={true}>Place Order</Nav.Link>)}
            </NavItem>

        </Nav>
    )
}

export default CheckoutSteps
