import React, { useState, useCallback } from "react";
import Layout from './Layout'
import PayPalTransaction from "../components/dashboard/paypal/PayPalTransaction";
const ManagePayPalTransactionScreen = () => {
    return (
        <div className="wrapper1">
            <Layout />
            <PayPalTransaction />
        </div>
    )
}

export default ManagePayPalTransactionScreen;
