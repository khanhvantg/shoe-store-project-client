import axios from './axios'
import {
    SIZE_CREATE_FAIL,
    SIZE_CREATE_REQUEST,
    SIZE_CREATE_RESET,
    SIZE_CREATE_SUCCESS,
    SIZE_UPDATE_FAIL,
    SIZE_UPDATE_REQUEST,
    SIZE_UPDATE_RESET,
    SIZE_UPDATE_SUCCESS,
    SIZE_DETAILS_FAIL,
    SIZE_DETAILS_REQUEST,
    SIZE_DETAILS_SUCCESS,
    SIZE_LIST_FAIL,
    SIZE_LIST_REQUEST,
    SIZE_LIST_SUCCESS,
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

export const getAllSizes = ({id}) => async (dispatch) => {
    try {
        dispatch({ type: SIZE_LIST_REQUEST });

        const { data } = await axios.get(`/api/product/${id}/infors`, {headers: authHeader()})

        dispatch({ type: SIZE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SIZE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const createSizeByProductId = ({id,form}) => async (dispatch) => {
  try {
    dispatch({ type: SIZE_CREATE_REQUEST });
    const { data } = await axios.post(`/api/product/${id}/productInfor`, form, {headers: authHeader()});
    dispatch({ type: SIZE_CREATE_SUCCESS, payload: data });
    const {list} = dispatch(getAllSizes({id}));
    dispatch({ type: SIZE_LIST_SUCCESS, payload: list});
    toast("Create Size Successfull", {position: toast.POSITION.TOP_CENTER});
  } catch (error) {
    dispatch({
      type: SIZE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast(`${error.response.data.message}`, {position: toast.POSITION.TOP_CENTER});
  }
};

export const getSizeById = ({itemId}) => async (dispatch) => {
  try {
  dispatch({ type: SIZE_DETAILS_REQUEST });

  const { data } = await axios.get(`/api/productInfor/${itemId}`, {headers: authHeader()});

  dispatch({ type: SIZE_DETAILS_SUCCESS, payload: data });

  } catch (error) {
  dispatch({
      type: SIZE_DETAILS_FAIL,
      payload:
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
  });
  }
};

export const updateSize = ({form}) => async (dispatch, getState) => {
  try {
    dispatch({ type: SIZE_UPDATE_REQUEST });

    const { data } = await axios.put(`/api/productInfors/${form.idSize}`, form, {headers: authHeader()});
    dispatch({ type: SIZE_UPDATE_SUCCESS, payload: data });

    // const {list} = dispatch(getAllSizes({id}));
    //dispatch({ type: SIZE_UPDATE_SUCCESS, payload: list });
    toast("Update Size Successfull", {position: toast.POSITION.TOP_CENTER});
  } catch (error) {
    dispatch({
      type: SIZE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteSize = ({idSize}) => async (dispatch, getState) => {
  try {
    dispatch({ type: SIZE_UPDATE_REQUEST });

    const { data } = await axios.delete(`/api/productInfor/${idSize}`, {headers: authHeader()});
    dispatch({ type: SIZE_UPDATE_SUCCESS, payload: data });

    // const {list} = dispatch(getAllSizes({id}));
    //dispatch({ type: SIZE_UPDATE_SUCCESS, payload: list });
    toast("Delete Size Successfull", {position: toast.POSITION.TOP_CENTER});
  } catch (error) {
    dispatch({
      type: SIZE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};