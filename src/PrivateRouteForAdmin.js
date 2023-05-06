import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

function PrivateRouteForAdmin({ children }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (userInfo.roles[0]==="ROLE_ADMIN" || userInfo.roles[0]==="ROLE_MODERATOR" || userInfo.roles[1]==="ROLE_ADMIN" || userInfo.roles[1]==="ROLE_MODERATOR") ? children : <Navigate to="/" />;
}

export default PrivateRouteForAdmin;
