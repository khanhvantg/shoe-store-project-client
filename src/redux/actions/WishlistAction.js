import axios from './axios'

import {
  LINE_ITEM_CREATE_FAIL,
  LINE_ITEM_CREATE_REQUEST,
  LINE_ITEM_CREATE_RESET,
  LINE_ITEM_CREATE_SUCCESS,
  LINE_ITEM_UPDATE_FAIL,
  LINE_ITEM_UPDATE_REQUEST,
  LINE_ITEM_UPDATE_RESET,
  LINE_ITEM_UPDATE_SUCCESS,
  LINE_ITEM_DETAILS_FAIL,
  LINE_ITEM_DETAILS_REQUEST,
  LINE_ITEM_DETAILS_SUCCESS,
  LINE_ITEM_LIST_FAIL,
  LINE_ITEM_LIST_REQUEST,
  LINE_ITEM_LIST_SUCCESS,
  LINE_ITEM_DELETE_REQUEST,
  LINE_ITEM_DELETE_SUCCESS,
  LINE_ITEM_REMOVE_REQUEST,
  LINE_ITEM_REMOVE_SUCCESS,
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

// export const getAllProducts = () => async (dispatch) => {
//   try {
//       dispatch({ type: LINE_ITEM_LIST_REQUEST });

//       const { data } = await axios.get('/api/products', {headers: authHeader()})
//       dispatch({ type: LINE_ITEM_LIST_SUCCESS, payload: data });
//       console.log(data)
//   } catch (error) {
//       dispatch({
//           type: LINE_ITEM_LIST_FAIL,
//           payload: error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message,
//       });
//   }
// };

export const createLineItem = ({form, productId}) => async (dispatch, getState) => {
try {
  dispatch({ type: LINE_ITEM_CREATE_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  const { data } = await axios.post(`/api/wishList/${userInfo.id}/lineItems/${productId}`, form, {headers: authHeader()});
  dispatch({ type: LINE_ITEM_CREATE_SUCCESS, payload: data });
  dispatch(getWishListById());
  toast("Add To Cart Successfull", {position: toast.POSITION.TOP_CENTER});
  console.log("a",data);
} catch (error) {
  dispatch({
    type: LINE_ITEM_CREATE_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
  toast(`${error.response.data.message}`, {position: toast.POSITION.TOP_CENTER});
}
};

export const getWishListById = () => async (dispatch,getState) => {
try {
  dispatch({ type: LINE_ITEM_LIST_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  const { data } = await axios.get(`/api/wishList/${userInfo.id}`, {headers: authHeader()});
  console.log("data",data)
  dispatch({ type: LINE_ITEM_LIST_SUCCESS, payload: data });
} catch (error) {
dispatch({
    type: LINE_ITEM_LIST_FAIL,
    payload:
    error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
});
}
};

export const removeLineItem = (id) => async (dispatch, getState) => {
try {
  dispatch({ type: LINE_ITEM_REMOVE_REQUEST });

  const { data } = await axios.delete(`/api/lineItem/${id}`, {headers: authHeader()});

  dispatch({ type: LINE_ITEM_REMOVE_SUCCESS, payload: data });
  dispatch(getWishListById());
  toast("Remove Item Successfull", {position: toast.POSITION.TOP_CENTER});
} catch (error) {
  dispatch({
    type: LINE_ITEM_UPDATE_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
}
};

export const clearWishList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LINE_ITEM_DELETE_REQUEST });
  
    const { data } = await axios.delete(`/api/lineItem/`, {headers: authHeader()});
  
    dispatch({ type: LINE_ITEM_DELETE_SUCCESS, payload: data });
    dispatch(getWishListById());
    toast("Clear WishList Successfull", {position: toast.POSITION.TOP_CENTER});
  } catch (error) {
    dispatch({
      type: LINE_ITEM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
  };
export const updateLineItem = ({itemInfo, info}) => async (dispatch, getState) => {
try {
  dispatch({ type: LINE_ITEM_UPDATE_REQUEST });
  if(info){
    itemInfo = info
  }
  const { data } = await axios.put(`/api/lineItem/${itemInfo.itemId}`, itemInfo, {headers: authHeader()});

  dispatch({ type: LINE_ITEM_UPDATE_SUCCESS, payload: data });
  dispatch({ type: LINE_ITEM_DETAILS_SUCCESS, payload: data});
  toast(`Update Amount ${itemInfo.name} Successfull`, {position: toast.POSITION.TOP_CENTER});
} catch (error) {
  dispatch({
    type: LINE_ITEM_UPDATE_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
  toast(`${error.response.data.message}`, {position: toast.POSITION.TOP_CENTER});
}
};