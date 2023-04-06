import React from 'react'
import VoucherMain from '../components/dashboard/voucher/VoucherMain'
import Layout from './Layout'

const ManageVoucherScreen = () => {
  return (
    <div className="wrapper1">
            <Layout/>
            <div className="e-panel cardcus"  style={{width:"100%"}}>
                <VoucherMain/>
            </div>
        </div>
    )
}

export default ManageVoucherScreen
