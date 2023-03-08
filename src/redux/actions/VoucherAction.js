import axios from './axios'
import {
    VOUCHER_CREATE_FAIL,
    VOUCHER_CREATE_REQUEST,
    VOUCHER_CREATE_RESET,
    VOUCHER_CREATE_SUCCESS,
    VOUCHER_UPDATE_FAIL,
    VOUCHER_UPDATE_REQUEST,
    VOUCHER_UPDATE_RESET,
    VOUCHER_UPDATE_SUCCESS,
    VOUCHER_DETAILS_FAIL,
    VOUCHER_DETAILS_REQUEST,
    VOUCHER_DETAILS_SUCCESS,
    VOUCHER_LIST_FAIL,
    VOUCHER_LIST_REQUEST,
    VOUCHER_LIST_SUCCESS,
    VOUCHER_DETAILS_STOP
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

export const getAllVouchers = () => async (dispatch) => {
    try {
        dispatch({ type: VOUCHER_LIST_REQUEST });

        const { data } = await axios.get('/api/vouchers', {headers: authHeader()})

        dispatch({ type: VOUCHER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: VOUCHER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const searchVoucher = ({info}) => async (dispatch) => {
    try {
        dispatch({ type: VOUCHER_LIST_REQUEST });
  
        const { data } = await axios.post('/api/vouchers/search', info, {headers: authHeader()})
        dispatch({ type: VOUCHER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: VOUCHER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
  };

export const creatVoucher = ({form}) => async (dispatch) => {
  try {
    dispatch({ type: VOUCHER_CREATE_REQUEST });
    const formRq = {
        name: form.name,
        value: form.value/100,
        quantity: form.quantity,
        status: form.status
    }
    const { data } = await axios.post("/api/voucher", formRq, {headers: authHeader()});
    dispatch({ type: VOUCHER_CREATE_SUCCESS, payload: data });
    toast("Create Voucher Successfull", {position: toast.POSITION.TOP_CENTER});
  } catch (error) {
    dispatch({
      type: VOUCHER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const stopGetVoucher = () => async (dispatch) => {
  //dispatch({ type: VOUCHER_DETAILS_REQUEST });
  dispatch({ type: VOUCHER_DETAILS_STOP});
};

export const getVoucherById = (id) => async (dispatch) => {
  try {
  dispatch({ type: VOUCHER_DETAILS_REQUEST });

  const { data } = await axios.get(`/api/vouchers/${id}`, {headers: authHeader()});

  dispatch({ type: VOUCHER_DETAILS_SUCCESS, payload: data, payloadd: data.products });
  } catch (error) {
  dispatch({
      type: VOUCHER_DETAILS_FAIL,
      payload:
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
  });
  }
};

export const updateVoucher = ({form}) => async (dispatch, getState) => {
  try {
    dispatch({ type: VOUCHER_UPDATE_REQUEST });
    const formRq = {
        name: form.name,
        value: form.value/100,
        quantity: form.quantity,
        status: form.status
    }
    const { data } = await axios.put(`/api/voucher/${form.voucherId}`, formRq, {headers: authHeader()});
    dispatch({ type: VOUCHER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: VOUCHER_DETAILS_SUCCESS, payload: data});
    toast("Update Voucher Successfull", {position: toast.POSITION.TOP_CENTER});
  } catch (error) {
    dispatch({
      type: VOUCHER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteVoucher = ({idVoucher}) => async (dispatch, getState) => {
    try {
      dispatch({ type: VOUCHER_UPDATE_REQUEST });
  
      const { data } = await axios.delete(`/api/voucher/${idVoucher}`, {headers: authHeader()});
      dispatch({ type: VOUCHER_UPDATE_SUCCESS, payload: data });
  
      // const {list} = dispatch(getAllSizes({id}));
      //dispatch({ type: SIZE_UPDATE_SUCCESS, payload: list });
      toast("Delete Voucher Successfull", {position: toast.POSITION.TOP_CENTER});
    } catch (error) {
      dispatch({
        type: VOUCHER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };