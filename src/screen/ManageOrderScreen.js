import React, { useEffect, useState, useCallback } from "react";
import Layout from './Layout'
import OrderMain from '../components/dashboard/order/OrderMain'
const ManageOrderScreen = () => {
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
                <nav class="navbar navbar1-expand-lg navbar1-light bg-light">
                    <div class="container-fluid">
                        <button type="button" id="sidebarCollapse" class="btn btn-info" onClick={handle}>
                        {!active?<i class="tf-ion-ios-arrow-left"></i>:
                            <i class="tf-ion-ios-arrow-right"></i>}
                        </button>

                    </div>
                </nav>
                <OrderMain/>
            </div>
  )
}

export default ManageOrderScreen
