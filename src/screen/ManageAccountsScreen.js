import React from "react";
import Layout from './Layout'
import AccountMain from '../components/dashboard/account/AccountMain'
const ManageAccountsScreen = () => {

    return (
        <div className="main_container">
            <div className="container">
                <div className="">
                    <div className="col">
                        <Layout/>
                        <AccountMain/>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default ManageAccountsScreen
