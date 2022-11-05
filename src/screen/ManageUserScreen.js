import React from 'react'
import Layout from './Layout'
import UserMain from '../components/dashboard/user/UserMain'
const ManageUserScreen = () => {
  return (
    <div className="main_container">
        <div className="container">
            <div className="">
                <div className="col">
                    <Layout/>
                    <UserMain/>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default ManageUserScreen
