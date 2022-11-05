import axios from "./axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/Constants";
import { toast } from "react-toastify";


export const login = ({formValues}) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });    
    const { data } = await axios.post("/api/auth/signin", formValues);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    toast("Login Successfull", {position: toast.POSITION.TOP_CENTER});
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

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  const { data } = await axios.post("/api/auth/signout");
  toast(data.message, {position: toast.POSITION.TOP_CENTER});
};

export const register = (username, password, role) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/auth/signup", { username, password, role });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    toast("Signup Successfull", {position: toast.POSITION.TOP_CENTER});
    dispatch(login(username,password))
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
