import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/basketActions'

function PaymentScreen() {

  const basket = useSelector(state => state.basket)
  const { deliveryAddress } = basket

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  if(!deliveryAddress.address) {
    navigate('/delivery')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
  <FormContainer>
    <CheckoutSteps step1 step2 step3 />

    <Form onSubmit={submitHandler}>

      <Form.Group>
        <Form.Label as='legend'>Select Method</Form.Label>
        <Col>
          <Form.Check
            type='radio'
            label='PayPal or Credit Card'
            id='paypal'
            name='paymentMethod'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
          </Form.Check>
        </Col>
      </Form.Group>

      <Button typ='submit' variant='warning'>
        Continue
      </Button>

    </Form>
  </FormContainer>
  )
}

export default PaymentScreen;
