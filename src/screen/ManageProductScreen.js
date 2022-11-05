import React, { useEffect, useState } from "react";
import Layout from './Layout'
import ProductMain from '../components/dashboard/product/ProductMain'
const ManageProductScreen = () => {

    return (
        
        <div className="main_container">           
            <div className="container">
                    <div className="col">
                        <Layout/>
                        <ProductMain/>
                    </div> 
            </div>
        </div>
    
    )
}

export default ManageProductScreen
