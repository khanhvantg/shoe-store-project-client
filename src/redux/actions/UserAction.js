import axios from './axios'
import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
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
  export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });

        const { data } = await axios.get('/api/users', {headers: authHeader()})

        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
// USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/users/${id}`, {headers : authHeader()});
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  // UPDATE PROFILE BY ADMIN
  export const updateUserProfileByAdmin = ({form}) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
      const { data } = await axios.put(`/api/users/${form.userId}/mod`, form, {headers : authHeader()});
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
      toast("Update Profile Successfull", {position: toast.POSITION.TOP_CENTER});
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:    error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // UPDATE PROFILE BY USER
  export const updateUserProfileByUser = ({form}) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
      const { data } = await axios.put(`/api/users/${userInfo.id}`, form, {headers : authHeader()});
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    //   localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(getUserDetails(userInfo.id));
    toast("Update Profile Successfull", {position: toast.POSITION.TOP_CENTER});
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:    error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };