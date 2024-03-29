import axios from "./axios";
import {
  RESET_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/Constants";
import { toast } from "react-toastify";


export const login = ({form}) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });    
    const { data } = await axios.post("/api/auth/signin", form);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    toast("Login Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const stopLogin = () => async (dispatch) => {
  dispatch({ type: RESET_LOGIN});
};

export const logout = () => async (dispatch,navigate) => {
  dispatch({ type: USER_LOGOUT });
  const { data } = await axios.post("/api/auth/signout");
  toast(data.message, {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
  localStorage.removeItem("userInfo");
};

export const register = ({form}) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/auth/signup", form)
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    toast("Signup Successfull", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
