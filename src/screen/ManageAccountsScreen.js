import React, { useState, useCallback } from "react";
import Layout from './Layout'
import AccountMain from '../components/dashboard/account/AccountMain'
const ManageAccountsScreen = () => {
    return (
        <div className="wrapper1">
            <Layout/>
            <AccountMain/>
        </div>
    )
}

export default ManageAccountsScreen
