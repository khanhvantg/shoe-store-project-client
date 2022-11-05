import React, { useEffect, useState } from "react";
import Layout from './Layout'
import CategoryMain from '../components/dashboard/category/CategoryMain'
const ManageCategoryScreen = () => {

    return (
        <div className="main_container">
            <div className="container">
                <div className="">
                    <div className="col">
                        <Layout/>
                        <CategoryMain/>
                    </div> 
                </div>
            </div>
        </div>
    
    )
}

export default ManageCategoryScreen
