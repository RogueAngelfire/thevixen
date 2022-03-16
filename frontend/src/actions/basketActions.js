import axios from 'axios'
import {
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_SAVE_DELIVERY_ADDRESS,

  BASKET_SAVE_PAYMENT_METHOD,

} from '../constants/basketConstants'


export const addToBasket = (id, qty) => async (dispatch, getState) => {
  const {data} = await axios.get(`/api/products/${id}`)

  dispatch({
    type:BASKET_ADD_ITEM,
    payload: {
      product:data._id,
      name:data.name,
      image:data.image,
      price:data.price,
      stockCount:data.stockCount,
      qty
    }
  })

  localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems))
}


export const removeFromBasket = (id) => (dispatch, getState) => {
 dispatch({
   type:BASKET_REMOVE_ITEM,
   payload: id,
 })

 localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems))
}

export const saveDeliveryAddress = (data) => (dispatch) => {
  dispatch({
    type:BASKET_SAVE_DELIVERY_ADDRESS,
    payload: data,
  })
 
  localStorage.setItem('deliveryAddress', JSON.stringify(data))
 }

 export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type:BASKET_SAVE_PAYMENT_METHOD,
    payload: data,
  })
 
  localStorage.setItem('paymentMethod', JSON.stringify(data))
 }