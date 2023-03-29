import axios from './axios'
import {
    COMMENT_CREATE_FAIL,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_RESET,
    COMMENT_CREATE_SUCCESS,
    COMMENT_UPDATE_FAIL,
    COMMENT_UPDATE_REQUEST,
    COMMENT_UPDATE_RESET,
    COMMENT_UPDATE_SUCCESS,
    COMMENT_DETAILS_FAIL,
    COMMENT_DETAILS_REQUEST,
    COMMENT_DETAILS_SUCCESS,
    COMMENT_LIST_FAIL,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_SUCCESS,
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

export const getAllComments = (id) => async (dispatch) => {
    try {
        dispatch({ type: COMMENT_LIST_REQUEST });

        const { data } = await axios.get(`/api/product/${id}/comments`, {headers: authHeader()})

        dispatch({ type: COMMENT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COMMENT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const createCommentByProductId = ({formComment}) => async (dispatch, getState) => {
  try {
    const {
        userLogin: { userInfo },
      } = getState();
    dispatch({ type: COMMENT_CREATE_REQUEST });
    const { data } = await axios.post(`/api/product/${formComment.productId}/user/${userInfo.id}/comments`, formComment, {headers: authHeader()});
    dispatch({ type: COMMENT_CREATE_SUCCESS, payload: data });
    // const {list} = dispatch(getAllComments({id}));
    // dispatch({ type: COMMENT_LIST_SUCCESS, payload: list});
    toast("Create Comment Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
  } catch (error) {
    dispatch({
      type: COMMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    //toast(`${error.response.data.message}`, {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
  }
};

export const getCommentById = (id) => async (dispatch) => {
  try {
  dispatch({ type: COMMENT_DETAILS_REQUEST });

  const { data } = await axios.get(`/api/comments/${id}`, {headers: authHeader()});

  dispatch({ type: COMMENT_DETAILS_SUCCESS, payload: data });

  } catch (error) {
  dispatch({
      type: COMMENT_DETAILS_FAIL,
      payload:
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
  });
  }
};

export const updateComment = ({formComment}) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMMENT_UPDATE_REQUEST });

    const { data } = await axios.put(`/api/comment/${formComment.commentId}`, formComment, {headers: authHeader()});
    dispatch({ type: COMMENT_UPDATE_SUCCESS, payload: data });

    // const {list} = dispatch(getAllComments({id}));
    //dispatch({ type: COMMENT_UPDATE_SUCCESS, payload: list });
    toast("Update Comment Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
  } catch (error) {
    dispatch({
      type: COMMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteComment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMMENT_UPDATE_REQUEST });

    const { data } = await axios.delete(`/api/comment/${id}`, {headers: authHeader()});
    dispatch({ type: COMMENT_UPDATE_SUCCESS, payload: data });

    // const {list} = dispatch(getAllComments({id}));
    //dispatch({ type: COMMENT_UPDATE_SUCCESS, payload: list });
    toast("Delete Comment Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
  } catch (error) {
    dispatch({
      type: COMMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};