import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToBasket, removeFromBasket } from '../actions/basketActions'

const BasketScreen = () => {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation();
  const productId = params.id

  const qty = location.search ? Number(location.search.split("=")[1]): 1

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const basket = useSelector(state => state.basket)
  const { basketItems } = basket

  useEffect(() =>{
    if (productId) {
      dispatch(addToBasket(productId, qty))
    }
  }, [dispatch, productId, qty])


  const removeFromBasketHandler = (id) => {
    dispatch(removeFromBasket(id))
  }

  const checkoutHandler = () => {
    console.log('checkout Handler Function')
    navigate('/login?redirect=delivery')
    if(userInfo) {
      navigate('/delivery')
    }else{
      navigate('/login')
    }
  }

  return (
      <Row>
          <Col md={8}>
            <h1>Shopping Basket</h1>
            {basketItems.length === 0 ? (
              <Message variant='info'>
                Your basket is empty <Link to='/'>Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant='flush'>
                  {basketItems.map(item => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>

                        <Col md={2}>
                          £{item.price}
                        </Col>

                        <Col md={3}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) => dispatch(addToBasket(item.product, Number(e.target.value)))}
                          >
                            {
                              [...Array(item.stockCount).keys()].map((x) =>(
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))
                          }

                          </Form.Control>
                        </Col>

                        <Col md={1}>
                          <Button
                            type='button'
                            variant='light'
                            onClick={() => removeFromBasketHandler(item.product)}
                          >
                            <i className='fas fa-trash'></i>


                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant='warning'>
                <ListGroup.Item>
                  <h2>Subtotal ({basketItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                  £{basketItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>
              </ListGroup>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  variant='warning'
                  disabled={basketItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </Card>
          </Col>
      </Row>
  )
}

export default BasketScreen
