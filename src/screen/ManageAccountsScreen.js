import React, { useState, useCallback } from "react";
import Layout from './Layout'
import AccountMain from '../components/dashboard/account/AccountMain'
const ManageAccountsScreen = () => {
    const [active, setActive] =useState(false);
    const handle = useCallback(() => {
        if(!active) {
            setActive(true);
        }
        else setActive(false);
    }, [active]);
    return (
        <div className="wrapper1">
            <Layout active={active}/>
            <nav className="navbar navbar1-expand-lg navbar1-light bg-light">
                <div className="container-fluid">
                    <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={handle}>
                        {!active?<i className="tf-ion-ios-arrow-left"></i>:
                            <i className="tf-ion-ios-arrow-right"></i>}
                    </button>

                </div>
                </nav>
            <AccountMain/>
        </div>
    )
}

export default ManageAccountsScreen
