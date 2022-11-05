import axios from './axios'
import {
    IMAGE_CREATE_FAIL,
    IMAGE_CREATE_REQUEST,
    IMAGE_CREATE_RESET,
    IMAGE_CREATE_SUCCESS,
    IMAGE_UPDATE_FAIL,
    IMAGE_UPDATE_REQUEST,
    IMAGE_UPDATE_RESET,
    IMAGE_UPDATE_SUCCESS,
    IMAGE_DETAILS_FAIL,
    IMAGE_DETAILS_REQUEST,
    IMAGE_DETAILS_SUCCESS,
    IMAGE_LIST_FAIL,
    IMAGE_LIST_REQUEST,
    IMAGE_LIST_SUCCESS,
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

export const getAllImages = ({id}) => async (dispatch) => {
    try {
        dispatch({ type: IMAGE_LIST_REQUEST });

        const { data } = await axios.get(`/api/product/${id}/images`, {headers: authHeader()})

        dispatch({ type: IMAGE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: IMAGE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const createImageByProductId = ({id,image}) => async (dispatch) => {
  try {
    dispatch({ type: IMAGE_CREATE_REQUEST });
    console.log(id);
    console.log(image);
    const { data } = await axios.post(`/api/product/${id}/images`, image, {headers: authHeader()});
    dispatch({ type: IMAGE_CREATE_SUCCESS, payload: data });
    const {list} = dispatch(getAllImages({id}));
    dispatch({ type: IMAGE_LIST_SUCCESS, payload: list});
    toast("Create Image Successfull", {position: toast.POSITION.TOP_CENTER});
  } catch (error) {
    dispatch({
      type: IMAGE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getImageById = (id) => async (dispatch) => {
  try {
  dispatch({ type: IMAGE_DETAILS_REQUEST });

  const { data } = await axios.get(`/api/image/${id}`, {headers: authHeader()});

  dispatch({ type: IMAGE_DETAILS_SUCCESS, payload: data });

  } catch (error) {
  dispatch({
      type: IMAGE_DETAILS_FAIL,
      payload:
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
  });
  }
};

export const updateImage = ({id,imageId,image}) => async (dispatch, getState) => {
  try {
    dispatch({ type: IMAGE_UPDATE_REQUEST });

    const { data } = await axios.put(`/api/images/${imageId}`, image, {headers: authHeader()});
    dispatch({ type: IMAGE_CREATE_SUCCESS, payload: data });

    const {list} = dispatch(getAllImages({id}));
    dispatch({ type: IMAGE_UPDATE_SUCCESS, payload: list });
    toast("Update Image Successfull", {position: toast.POSITION.TOP_CENTER});
  } catch (error) {
    dispatch({
      type: IMAGE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};