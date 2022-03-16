import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

function OrderScreen({ match }) {
  const { orderId } = useParams()
  const dispatch = useDispatch()

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, error, loading } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const navigate = useNavigate()


  if(!loading && !error) {
    order.itemsPrice = order.basketItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  }


  const addPayPalScript = () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.paypal.com/sdk/js?client-id=AgvilrV0xR6.Gq-IvTq0MBAX6bdoApOqWa9NoxqMcmkabpRuwEKMmbnQ'
    script.async = true
    script.onload = () =>{
      setSdkReady(true)
    }
    document.body.appendchild(script)
  }

  useEffect(() => {
    if(!order || successPay || order._id !== Number(orderId)){
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    }else if(!order.isPaid) {
      if(!window.paypal){
        addPayPalScript()
      }else {
        setSdkReady(true)
      }
    }  
  }, [dispatch, order, orderId, successPay])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
  <div>
    <h1>Order: {order._id}</h1>
    <Row>
      <Col md={8}>
        <ListGroup variant='warning'>

          <ListGroup.Item>
            <h2>Delivery</h2>
            <p><strong>Name: </strong> {order.user.name}</p>
            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
            <p>
              <strong>Deliver to: </strong>
              {order.deliveryAddress.address}, {order.deliveryAddress.town}
              {' '}
              {order.deliveryAddress.city}, {order.deliveryAddress.county}
              {' '}
              {order.deliveryAddress.postcode}, {order.deliveryAddress.country}
            </p>

            {order.isDelivered ? (
              <Message variant='success'>Delivered on {order.deliveredAt}</Message>
            ) : (
              <Message variant='warning'>Not Delivered</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>

            {order.isPaid ? (
              <Message variant='success'>Paid on {order.paidAt}</Message>
            ) : (
              <Message variant='warning'>Not Paid</Message>
            )}

          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.basketItems.length === 0 ? <Message variant='info'>
              Order is Empty
            </Message> : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
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
                <Col>£{order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Delivery:</Col>
                <Col>£{order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>VAT:</Col>
                <Col>£{order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>£{order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>


            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader/>}

                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}


          </ListGroup>
        </Card>
      </Col>
    </Row>
  </div>
  )
}

export default OrderScreen;

