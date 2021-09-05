import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, Button, Col } from 'react-bootstrap'
import FormComponent from '../components/FormComponent'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

 const PaymentScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    if (Object.keys(shippingAddress).length === 0) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('payPal')
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (

        <FormComponent>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <h1 style={{ padding: '1em 0px' }}>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='PayPal or Credit card' id='payPal' value='payPal' checked
                            onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                    <Col>
                        <Form.Check type='radio' label='UPI' id='phonePe' value='phonePe' checked ={false}
                            onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </FormGroup>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormComponent>
    )
}

export default PaymentScreen
