import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getWishListById } from './redux/actions/WishlistAction';

const PrivateRouteCheckOut = ({ children }) => {
    const dispatch = useDispatch();
    const lineItemList = useSelector((state) => state.lineItemList);
    const { lineItems } = lineItemList;
    useEffect(() => {
        dispatch(getWishListById())
    }, []);
    return lineItems.length > 0 ? children : <Navigate to="/cart" />;
}

export default PrivateRouteCheckOut
