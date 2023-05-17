import React, { useEffect, useState, useCallback } from "react";
import Layout from './Layout'
import CategoryMain from '../components/dashboard/category/CategoryMain'
const ManageCategoryScreen = () => {
    return (
        <div className="wrapper1">
            <Layout />
            <div className="e-panel cardcus" style={{ width: "100%", border: "" }}>
                <CategoryMain />
            </div>
        </div>
    )
}

export default ManageCategoryScreen
