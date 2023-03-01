import React, { useEffect, useState, useCallback } from "react";
import Layout from './Layout'
import ProductMain from '../components/dashboard/product/ProductMain'
const ManageProductScreen = () => {
    return (
        <div className="wrapper1">
            <Layout/>
            <ProductMain/>
        </div>
    
    )
}

export default ManageProductScreen
