import axios from './axios'

import {
//   DATANUMBER_CREATE_FAIL,
//   DATANUMBER_CREATE_REQUEST,
//   DATANUMBER_CREATE_RESET,
//   DATANUMBER_CREATE_SUCCESS,
  DATANUMBER_UPDATE_FAIL,
  DATANUMBER_UPDATE_REQUEST,
  DATANUMBER_UPDATE_RESET,
  DATANUMBER_UPDATE_SUCCESS,
  DATANUMBER_DETAILS_FAIL,
  DATANUMBER_DETAILS_REQUEST,
  DATANUMBER_DETAILS_SUCCESS,
  DATANUMBER_DETAILS_STOP,
//   DATANUMBER_LIST_FAIL,
//   DATANUMBER_LIST_REQUEST,
//   DATANUMBER_LIST_SUCCESS,
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

// export const getAllDataNumber = () => async (dispatch) => {
//   try {
//       dispatch({ type: DATANUMBER_LIST_REQUEST });

//       const { data } = await axios.get('/api/dataNumber', {headers: authHeader()})
//       dispatch({ type: DATANUMBER_LIST_SUCCESS, payload: data });
//   } catch (error) {
//       dispatch({
//           type: DATANUMBER_LIST_FAIL,
//           payload: error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message,
//       });
//   }
// };

// export const createDataNumber = ({form}) => async (dispatch) => {
// try {
//   dispatch({ type: DATANUMBER_CREATE_REQUEST });
//   const { data } = await axios.post(`/api/dataNumber`, form, {headers: authHeader()});
//   dispatch({ type: DATANUMBER_CREATE_SUCCESS, payload: data });
//   toast("Create DataNumber Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
// } catch (error) {
//   dispatch({
//     type: DATANUMBER_CREATE_FAIL,
//     payload:
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message,
//   });
//   toast(`${error.response.data.message}`, {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
// }
// };

export const getDataNumberByName = (id) => async (dispatch) => {
try {
dispatch({ type: DATANUMBER_DETAILS_REQUEST });

const { data } = await axios.get(`/api/dataNumber/vat`, {headers: authHeader()});

dispatch({ type: DATANUMBER_DETAILS_SUCCESS, payload: data });
} catch (error) {
dispatch({
    type: DATANUMBER_DETAILS_FAIL,
    payload:
    error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
});
}
};
export const stopGetDataNumber = () => async (dispatch) => {
  //dispatch({ type: VOUCHER_DETAILS_REQUEST });
  dispatch({ type: DATANUMBER_DETAILS_STOP});
};

export const updateDataNumber = ({form}) => async (dispatch, getState) => {
try {
  dispatch({ type: DATANUMBER_UPDATE_REQUEST });

  const { data } = await axios.put(`/api/dataNumber/vat`, form, {headers: authHeader()});
  dispatch({ type: DATANUMBER_UPDATE_SUCCESS, payload: data});
  dispatch({type: DATANUMBER_DETAILS_STOP});
  // dispatch({ type: DATANUMBER_DETAILS_SUCCESS });
  toast("Update Vat Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
} catch (error) {
  dispatch({
    type: DATANUMBER_UPDATE_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
  toast(`${error.response.data.message}`, {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
}
};