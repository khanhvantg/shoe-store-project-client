import axios from './axios'
import {
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_RESET,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_RESET,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_DETAILS_STOP
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

export const getAllcategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST });

        const { data } = await axios.get('/api/category', {headers: authHeader()})

        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const creatCategory = ({form}) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST });
    const { data } = await axios.post("/api/category", form, {headers: authHeader()});
    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
    toast("Create Category Successfull", {position: toast.POSITION.TOP_CENTER});
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const stopGetCategory = () => async (dispatch) => {
  //dispatch({ type: CATEGORY_DETAILS_REQUEST });
  dispatch({ type: CATEGORY_DETAILS_STOP});
};

export const getCategoryById = (id) => async (dispatch) => {
  try {
  dispatch({ type: CATEGORY_DETAILS_REQUEST });

  const { data } = await axios.get(`/api/category/${id}`, {headers: authHeader()});

  dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data, payloadd: data.products });
  } catch (error) {
  dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload:
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
  });
  }
};

export const updateCategory = ({form}) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_UPDATE_REQUEST });
    const { data } = await axios.put(`/api/category/${form.categoryId}`, form, {headers: authHeader()});
    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
    dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data});
    toast("Update Category Successfull", {position: toast.POSITION.TOP_CENTER});
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};