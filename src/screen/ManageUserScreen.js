import React, { useEffect, useState, useCallback } from "react";
import Layout from './Layout'
import UserMain from '../components/dashboard/user/UserMain'
const ManageUserScreen = () => {

  return (
    <div className="wrapper1">
        <Layout/>
        <UserMain/>
    </div>
  )
}

export default ManageUserScreen
