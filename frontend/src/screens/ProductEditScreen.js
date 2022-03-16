import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails } from '../actions/productActions'


function ProductEditScreen() {
  const params = useParams()
  const productId = params.id

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [allergens, setAllergens] = useState('')
  const [category, setCategory] = useState('')
  const [stockCount, setStockCount] = useState(0)
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails
  // navigate(`/admin/product/${productId}/edit}`)
  console.log(product.name)
  console.log(productId)

  useEffect(() => {
    console.log('outside if')
    if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setAllergens(product.allergens)
      setCategory(product.category)
      setStockCount(product.stockCount)
      setDescription(product.description)
    }
    
  }, [dispatch, product, productId, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    //Update product
  }
    return (
      <div>
        <Link to='/admin/productlist'>
          Go Back
        </Link>

        <FormContainer>
        <h1>Edit Product</h1>

        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> 
        : (
          <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              >

              </Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >

              </Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Add Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              >

              </Form.Control>
            </Form.Group>

            <Form.Group controlId='allergens'>
              <Form.Label>Allergens</Form.Label>
              <Form.Control
                type='test'
                placeholder='Enter Allergens'
                value={allergens}
                onChange={(e) => setAllergens(e.target.value)}
              >

              </Form.Control>
            </Form.Group>

            <Form.Group controlId='stockCount'>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Availabilty'
                value={stockCount}
                onChange={(e) => setStockCount(e.target.value)}
              >

              </Form.Control>
            </Form.Group>


            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >

              </Form.Control>
            </Form.Group>


            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              >

              </Form.Control>
            </Form.Group>


        

        <Button type='submit' variant='warning'>
          Update
        </Button>

        </Form>

        )}
                
      </FormContainer>
      </div>
      
    )
  }

export default ProductEditScreen
