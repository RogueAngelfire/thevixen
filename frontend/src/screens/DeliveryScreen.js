import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveDeliveryAddress } from '../actions/basketActions'

function DeliveryScreen() {

  const basket = useSelector(state => state.basket)
  const { deliveryAddress } = basket

  const dispatch = useDispatch()

  const navigate = useNavigate()
  //const location = useLocation()

  const [address, setAddress] = useState(deliveryAddress.address)
  const [town, setTown] = useState(deliveryAddress.town)
  const [city, setCity] = useState(deliveryAddress.city)
  const [county, setCounty] = useState(deliveryAddress.county)
  const [postcode, setPostcode] = useState(deliveryAddress.postcode)
  const [country, setCountry] = useState(deliveryAddress.country)

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Submitted')
    dispatch(saveDeliveryAddress({ address, town, city, county, postcode, country }))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Delivery</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Address Line 1'
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
          >

          </Form.Control>
        </Form.Group>

        <Form.Group controlId='address'>
          <Form.Label>Town</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Town or Village'
            value={town ? town : ''}
            onChange={(e) => setTown(e.target.value)}
          >

          </Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='City'
            value={city ? city : ''}
            onChange={(e) => setCity(e.target.value)}
          >

          </Form.Control>
        </Form.Group>

        <Form.Group controlId='county'>
          <Form.Label>County</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='County'
            value={county ? county : ''}
            onChange={(e) => setCounty(e.target.value)}
          >

          </Form.Control>
        </Form.Group>

        <Form.Group controlId='postcode'>
          <Form.Label>Postcode</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Postcode'
            value={postcode ? postcode : ''}
            onChange={(e) => setPostcode(e.target.value)}
          >

          </Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Country'
            value={country ? country : ''}
            onChange={(e) => setCountry(e.target.value)}
          >

          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='warning'>
          Continue
        </Button>

      </Form>
    </FormContainer>
  )
}

export default DeliveryScreen;

