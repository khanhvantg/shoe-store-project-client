import axios from './axios'

import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_STOP,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_FILTER_FAIL,
  PRODUCT_FILTER_REQUEST,
  PRODUCT_FILTER_SUCCESS,
  CATEGORY_DETAILS_FAIL,
} from "../constants/Constants";
import {toast} from 'react-toastify'
export const authHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.accessToken) {
    return { Authorization: 'Bearer ' + userInfo.accessToken };
  } else {
    return {};
  }
}

export const getAllProducts = () => async (dispatch) => {
  try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const { data } = await axios.get('/api/products', {headers: authHeader()})
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
      dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
      });
  }
};

export const getProductsByName = (name) => async (dispatch) => {
  try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(`/api/products/name?name=${name}`, {headers: authHeader()})
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
      dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
      });
  }
};

export const getProductPageable = ({formPage}) => async (dispatch) => {
  try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      // console.log(`/api/products/pageable?page=${fromPage.page}&size=${fromPage.size}`)
      const { data } = await axios.get(`/api/products/pageable?page=${formPage.page}&size=${formPage.size}`, {headers: authHeader()})
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.content });
  } catch (error) {
      dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
      });
  }
};

export const getProductFilter = ({filters}) => async (dispatch) => {
  try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.post('/api/products/filter', filters, {headers: authHeader()})
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
      dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
      });
  }
};

export const createProductByCategoryId = ({form}) => async (dispatch) => {
try {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const { data } = await axios.post(`/api/category/${form.category}/products`, form, {headers: authHeader()});
  dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  toast("Create Product Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
} catch (error) {
  dispatch({
    type: PRODUCT_CREATE_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
  toast(`${error.response.data.message}`, {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
}
};

export const getProductById = (id) => async (dispatch) => {
try {
dispatch({ type: PRODUCT_DETAILS_REQUEST });

const { data } = await axios.get(`/api/product/${id}`, {headers: authHeader()});

dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
} catch (error) {
dispatch({
    type: PRODUCT_DETAILS_FAIL,
    payload:
    error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
});
}
};
export const stopGetProduct = () => async (dispatch) => {
  //dispatch({ type: VOUCHER_DETAILS_REQUEST });
  dispatch({ type: PRODUCT_DETAILS_STOP});
};

export const updateProduct = ({form}) => async (dispatch, getState) => {
try {
  dispatch({ type: PRODUCT_UPDATE_REQUEST });

  const { data } = await axios.put(`/api/product/${form.productId}`, form, {headers: authHeader()});
  dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data});
  dispatch({type: PRODUCT_DETAILS_STOP});
  // dispatch({ type: PRODUCT_DETAILS_SUCCESS });
  toast("Update Product Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
} catch (error) {
  dispatch({
    type: PRODUCT_UPDATE_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
  toast(`${error.response.data.message}`, {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
}
};