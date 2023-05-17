import React, { useEffect, useState, useCallback } from "react";
import Layout from './Layout'
import OrderMain from '../components/dashboard/order/OrderMain'
const ManageOrderScreen = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="wrapper1">
      <Layout />
      <OrderMain />
    </div>
  )
}

export default ManageOrderScreen
