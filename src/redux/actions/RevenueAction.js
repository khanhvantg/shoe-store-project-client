
import axios from "./axios";
import {
    REVENUE_LISTBYDATE_REQUEST,
    REVENUE_LISTBYDATE_SUCCESS,
    REVENUE_LISTBYDATE_FAIL,
    REVENUE_LISTBYMONTH_REQUEST,
    REVENUE_LISTBYMONTH_SUCCESS,
    REVENUE_LISTBYMONTH_FAIL,
    REVENUE_ALISTBYMONTH_REQUEST,
    REVENUE_ALISTBYMONTH_SUCCESS,
    REVENUE_ALISTBYMONTH_FAIL,
    PRODUCTBEST_LIST_REQUEST,
    PRODUCTBEST_LIST_SUCCESS,
    PRODUCTBEST_LIST_FAIL,
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

export const getRevenueByDate = ({date}) => async (dispatch) => {
    try {
        dispatch({ type: REVENUE_LISTBYDATE_REQUEST });
        const { data } = await axios.post('/api/revenue/date', date, {headers: authHeader()})
        dispatch({ type: REVENUE_LISTBYDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REVENUE_LISTBYDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const getRevenueByMonth = ({month}) => async (dispatch) => {
    try {
        dispatch({ type: REVENUE_LISTBYMONTH_REQUEST });
        const { data } = await axios.post('/api/revenue/month', month, {headers: authHeader()})
        dispatch({ type: REVENUE_LISTBYMONTH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REVENUE_LISTBYMONTH_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const getARevenueByMonth = ({month}) => async (dispatch) => {
    try {
        dispatch({ type: REVENUE_ALISTBYMONTH_REQUEST });
        const { data } = await axios.post('/api/revenuePerMonth', month, {headers: authHeader()})
        dispatch({ type: REVENUE_ALISTBYMONTH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REVENUE_ALISTBYMONTH_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const getProductBest = ({month}) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTBEST_LIST_REQUEST });
        const { data } = await axios.post('/api/bestSeller', month, {headers: authHeader()})
        dispatch({ type: PRODUCTBEST_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCTBEST_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};