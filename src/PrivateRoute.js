import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

function PrivateRoute({ children }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return userInfo ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
