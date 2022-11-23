
import axios from "./axios";
import {
  ACCOUNT_LIST_REQUEST,
  ACCOUNT_LIST_SUCCESS,
  ACCOUNT_LIST_FAIL,
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_DETAIL_SUCCESS,
  ACCOUNT_DETAIL_FAIL,
  ACCOUNT_DETAIL_RESET,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_UPDATE_RESET
} from "../constants/Constants";
import {toast} from 'react-toastify';

export const authHeader = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.accessToken) {
      return { Authorization: 'Bearer ' + userInfo.accessToken };
    } else {
      return {};
    }
  }

export const getAllAccounts = () => async (dispatch) => {
    try {
        dispatch({ type: ACCOUNT_LIST_REQUEST });
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const { data } = await axios.get('/api/accounts', {headers: authHeader()})

        dispatch({ type: ACCOUNT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ACCOUNT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const getAccountById = (id) => async (dispatch) => {
    try {
    dispatch({ type: ACCOUNT_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/accounts/${id}`, {headers: authHeader()});

    dispatch({ type: ACCOUNT_DETAIL_SUCCESS, payload: data });

    } catch (error) {
    dispatch({
        type: ACCOUNT_DETAIL_FAIL,
        payload:
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
    });
    }
};

  export const updateAccountByAdmin = ({form}) => async (dispatch, getState) => {
    try {
      dispatch({ type: ACCOUNT_UPDATE_REQUEST });
      const { data } = await axios.put(`/api/accounts/${form.accountId}/mod`, form, {headers: authHeader()});
      dispatch({ type: ACCOUNT_UPDATE_SUCCESS, payload: data });
      dispatch({ type: ACCOUNT_DETAIL_SUCCESS, payload: data});
      toast("Update Account Successfull", {position: toast.POSITION.TOP_CENTER});
    } catch (error) {
      dispatch({
        type: ACCOUNT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const updateAccountByUser = ({formChangePassword}) => async (dispatch, getState) => {
    try {
      // {currentPassword,newPassword}
      const {
        userLogin: { userInfo },
      } = getState();
      dispatch({ type: ACCOUNT_UPDATE_REQUEST });
      const { data } = await axios.put(`/api/accounts/${userInfo.id}`, formChangePassword , {headers: authHeader()});
      dispatch({ type: ACCOUNT_UPDATE_SUCCESS, payload: data });
      dispatch({ type: ACCOUNT_DETAIL_SUCCESS, payload: data});
      toast("Update Account Successfull", {position: toast.POSITION.TOP_CENTER});

    } catch (error) {
      dispatch({
        type: ACCOUNT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  