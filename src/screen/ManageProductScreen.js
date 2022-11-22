import React, { useEffect, useState, useCallback } from "react";
import Layout from './Layout'
import ProductMain from '../components/dashboard/product/ProductMain'
const ManageProductScreen = () => {
    const [active, setActive] =useState(false);
    const handle = useCallback(() => {
        if(!active) {
            setActive(true);
        }
        else setActive(false);
    }, [active]);
    return (
        <div class="wrapper1">
            <Layout active={active}/>
            <div id="content1">
                <nav class="navbar navbar1-expand-lg navbar1-light bg-light">
                    <div class="container-fluid">
                        <button type="button" id="sidebarCollapse" class="btn btn-info" onClick={handle}>
                            <i class="fas fa-align-left"></i>
                            {/* <span>Toggle Sidebar</span> */}
                        </button>

                    </div>
                </nav>
                <ProductMain/>
            {/* <div className="main_container">zz
                <div className="container">
                    <div className="">
                        <div className="col">
                            <Layout/>
                            <AccountMain/>
                        </div> 
                    </div> */}
            </div>
        </div>
    
    )
}

export default ManageProductScreen
