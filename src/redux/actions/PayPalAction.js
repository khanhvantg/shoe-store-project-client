
import axios from "./axiosPayPal";
import {
  PAYPAL_LIST_REQUEST,
  PAYPAL_LIST_SUCCESS,
  PAYPAL_LIST_FAIL,
  PAYPAL_DETAIL_REQUEST,
  PAYPAL_DETAIL_SUCCESS,
  PAYPAL_DETAIL_FAIL,
  PAYPAL_DETAIL_RESET,
  PAYPAL_UPDATE_REQUEST,
  PAYPAL_UPDATE_SUCCESS,
  PAYPAL_UPDATE_FAIL,
  PAYPAL_UPDATE_RESET
} from "../constants/Constants";
import {toast} from 'react-toastify';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

export const username = 'AXap4VJ7Ie8T2UPEEQYQLoYR4Qt5t2dBw1Ql6yV5tIUjpQCG5fAThNZMg9dfWjOgGhJ5AklyEVDBKZKN';
export const password = 'EGtCQ99qjFLUAaKNrPLHE9e7vD1bwyVuXVeNXcZtBLLM3X3LU-N8GlkMDCt179F-jv9UG3aosF_Ep71L';
export const encodedBase64Token = base64_encode(`${username}:${password}`);
export const authorization = `Basic ${encodedBase64Token}`;
export const authHeader = () => {
    return {  
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer A21AAJ3-lFCgtoqsPB-XcMSswE3oQaBRLf2Qx26gEJ0znAjFTKQ9waTntIJwgIkSFF0Hrvyir6xlj6HEvnQRQs-KImcqNOw8w'
        'Authorization': authorization,
    };
}

export const getListTransaction = (startDate,endDate) => async (dispatch) => {
    try {
        dispatch({ type: PAYPAL_LIST_REQUEST });
        const { data } = await axios.get(`/v1/reporting/transactions?start_date=${startDate}&end_date=${endDate}`, {headers: authHeader()})
        dispatch({ type: PAYPAL_LIST_SUCCESS, payload: data.transaction_details });
        // console.log(data.detail)
    } catch (error) {
        dispatch({
            type: PAYPAL_LIST_FAIL,
            payload: error.response.data.details[0].issue
        });
    }
};

export const getBalance = () => async (dispatch) => {
    try {
    dispatch({ type: PAYPAL_DETAIL_REQUEST });

    const { data } = await axios.get('/v1/reporting/balances', {headers: authHeader()});

    dispatch({ type: PAYPAL_DETAIL_SUCCESS, payload: data });

    } catch (error) {
    dispatch({
        type: PAYPAL_DETAIL_FAIL,
        payload:
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
    });
    }
};

//   export const updateAccountByAdmin = ({form}) => async (dispatch, getState) => {
//     try {
//       dispatch({ type: PAYPAL_UPDATE_REQUEST });
//       const { data } = await axios.put(`/api/accounts/${form.accountId}/mod`, form, {headers: authHeader()});
//       dispatch({ type: PAYPAL_UPDATE_SUCCESS, payload: data });
//       dispatch({ type: PAYPAL_DETAIL_SUCCESS, payload: data});
//       toast("Update Account Successfull", {position: toast.POSITION.TOP_CENTER});
//     } catch (error) {
//       dispatch({
//         type: PAYPAL_UPDATE_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };

//   export const updateAccountByUser = ({formChangePassword}) => async (dispatch, getState) => {
//     try {
//       // {currentPassword,newPassword}
//       const {
//         userLogin: { userInfo },
//       } = getState();
//       dispatch({ type: PAYPAL_UPDATE_REQUEST });
//       const { data } = await axios.put(`/api/accounts/${userInfo.id}`, formChangePassword , {headers: authHeader()});
//       dispatch({ type: PAYPAL_UPDATE_SUCCESS, payload: data });
//       dispatch({ type: PAYPAL_DETAIL_SUCCESS, payload: data});
//       toast("Update Account Successfull", {position: toast.POSITION.TOP_CENTER});

//     } catch (error) {
//       dispatch({
//         type: PAYPAL_UPDATE_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };
  