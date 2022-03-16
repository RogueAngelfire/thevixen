import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'

function ProductScreen() {
  const [qty, setQty] = useState(1)
  
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
    console.log(qty)
  }, [dispatch, id, qty])

  const addToBasketHandler = () =>{
    console.log('added to basket', id, 'id number', qty, 'quantity added')
    navigate(`/basket/${id}?qty=${qty}`)
  }

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading ?
        <Loader />
        : error
        ? <Message variant='danger'>{error}</Message>
        :(
          <Row>
        <Col md={6}>
          {product && <Image src={product.image} alt={product.name} fluid />}
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>

            <ListGroupItem>
              {product && <h3>{product.name}</h3>}
            </ListGroupItem>

            <ListGroupItem>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
            </ListGroupItem>

            <ListGroupItem>
              Price: £{product.price}
            </ListGroupItem>

            <ListGroupItem>
              Description: {product.description}
            </ListGroupItem>

          </ListGroup>
        </Col>


        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>£{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Availability:</Col>
                  <Col>
                    {product.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.stockCount > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col xs='auto' className='my-1'>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {
                            [...Array(product.stockCount).keys()].map((x) =>(
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))
                          }

                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToBasketHandler}
                  className='btn-block' 
                  disabled={product.stockCount === 0}
                  type='button' variant='warning'>
                  Add to Basket
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
        )

      }

    </div>
  )
}

export default ProductScreen
