import React from 'react'
import Layout from './Layout'
import OrderMain from '../components/dashboard/order/OrderMain'
const ManageOrderScreen = () => {
  return (
    <div className="main_container">           
        <div className="container">
                <div className="col">
                    <Layout/>
                    <OrderMain/>
                </div> 
        </div>
    </div>
  )
}

export default ManageOrderScreen
