import axios from './axios'

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_CHECK_FAIL,
  ORDER_CHECK_REQUEST,
  ORDER_CHECK_RESET,
  ORDER_CHECK_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_RESET,
  ORDER_UPDATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  ORDER_LISTBYUSER_FAIL,
  ORDER_LISTBYUSER_REQUEST,
  ORDER_LISTBYUSER_SUCCESS,
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

export const getAllOrders = () => async (dispatch) => {
  try {
      dispatch({ type: ORDER_LIST_REQUEST });
      const { data } = await axios.get('/api/orders', {headers: authHeader()})
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
      dispatch({
          type: ORDER_LIST_FAIL,
          payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
      });
  }
};

export const createOrder = ({form}) => async (dispatch,getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const { data } = await axios.post(`/api/orders/${userInfo.id}`, form, {headers: authHeader()});
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      toast("Create Order Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      toast(`${error.response.data.message}`, {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
    }
    };

    export const checkAmount = () => async (dispatch,getState) => {
      try {
        dispatch({ type: ORDER_CHECK_REQUEST });
        const {
          userLogin: { userInfo },
        } = getState();
        const { data } = await axios.post(`/api/checkAmount/orders/${userInfo.id}`, {}, {headers: authHeader()});
        dispatch({ type: ORDER_CHECK_SUCCESS, payload: data });
        // toast("Create Order Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
      } catch (error) {
        dispatch({
          type: ORDER_CHECK_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
        toast(`${error.response.data.message}`, {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
      }
      };   

export const getOrdersByUserId = () => async (dispatch,getState) => {
try {
  dispatch({ type: ORDER_LISTBYUSER_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  const { data } = await axios.get(`/api/orders/${userInfo.id}`, {headers: authHeader()});
  dispatch({ type: ORDER_LISTBYUSER_SUCCESS, payload: data });
} catch (error) {
  dispatch({
    type: ORDER_LISTBYUSER_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
}
};

export const getOrderById = (id) => async (dispatch) => {
try {
dispatch({ type: ORDER_DETAILS_REQUEST });

const { data } = await axios.get(`/api/order/${id}`, {headers: authHeader()});

dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
} catch (error) {
dispatch({
    type: ORDER_DETAILS_FAIL,
    payload:
    error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
});
}
};

export const getOrderByOrderCode = (orderCode) => async (dispatch) => {
  try {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  
  const { data } = await axios.get(`/api/order-detail/${orderCode}`, {headers: authHeader()});
  
  dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
  dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
  });
  }
  };

export const updateOrder = ({orderInfo}) => async (dispatch, getState) => {
try {
  dispatch({ type: ORDER_UPDATE_REQUEST });

  const { data } = await axios.put(`/api/orders/${orderInfo.orderId}`, orderInfo, {headers: authHeader()});

  dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data });
  dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data});
  if(data.status==="0"&&data.paymentStatus!=='2'){
    toast("Cancel Order Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
  }else if(data.status==="2"){
    toast("Cofirm Order Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
  }else if(data.paymentStatus!=='2') {
    toast("Delivery Order Complete", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
  }
} catch (error) {
  dispatch({
    type: ORDER_UPDATE_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
}
};