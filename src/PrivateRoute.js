import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // console.log(children)
    return userInfo ? children : < Navigate to="/login" />;
    // return userInfo ? children : < Navigate to="/login" />;
    // if (children.type.name==="SignUp" || children.type.name==="ForgetPassword")
    //     return userInfo ? < Navigate to="/" /> : children;
}

export default PrivateRoute;