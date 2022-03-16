import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen() {

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, error, success } = orderCreate

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const basket = useSelector(state => state.basket)

  basket.itemsPrice = basket.basketItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  basket.deliveryPrice = (basket.itemsPrice > 100 ? 0 : 10).toFixed(2)
  basket.taxPrice = Number((0) * basket.itemsPrice).toFixed
  
  //The code below returned NaN but that could be because pages not linking correctly at the minute with new react-router-dom 6
  basket.totalPrice = (Number(basket.itemsPrice) + Number(basket.deliveryPrice) + Number(basket.taxPrice)).toFixed(2)


  if(!basket.paymentMethod) {
    navigate('/payment')
  }

  useEffect(() => {
    if(success){
      navigate(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [success, navigate])

  const placeOrder = () => {
    dispatch(createOrder({
      orderItems:basket.basketItems,
      deliveryAddress:basket.deliveryAddress,
      paymentMethod:basket.paymentMethod,
      itemsPrice:basket.itemsPrice,
      deliveryPrice:basket.deliveryPrice,
      taxPrice: basket.taxPrice,
      totalPrice: basket.totalPrice,
    }))
  }

  return (
  <div>
    <CheckoutSteps step1 step2 step3 step4 />
    <Row>
      <Col md={8}>
        <ListGroup variant='warning'>

          <ListGroup.Item>
            <h2>Delivery</h2>
            <p>
              <strong>Deliver to: </strong>
              {basket.deliveryAddress.address}, {basket.deliveryAddress.town}
              {' '}
              {basket.deliveryAddress.city}, {basket.deliveryAddress.county}
              {' '}
              {basket.deliveryAddress.postcode}, {basket.deliveryAddress.country}
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {basket.paymentMethod}
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {basket.basketItems.length === 0 ? <Message variant='info'>
              Your Cake Basket is Empty
            </Message> : (
              <ListGroup variant='flush'>
                {basket.basketItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded/>
                      </Col>

                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>

                      <Col md={4}>
                        {item.qty} x £{item.price} = £{(item.qty * item.price).toFixed(2) }
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>

        </ListGroup>
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                <Col>£{basket.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Delivery:</Col>
                <Col>£{basket.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>VAT:</Col>
                <Col>£{basket.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>£{basket.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              {error &&  <Message variant='danger'>{error}</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                variant='warning'
                disabled={basket.basketItems === 0}
                onClick={placeOrder}
              >
                  Place Order
              </Button>
            </ListGroup.Item>

          </ListGroup>
        </Card>
      </Col>
    </Row>
  </div>
  )
}

export default PlaceOrderScreen;

