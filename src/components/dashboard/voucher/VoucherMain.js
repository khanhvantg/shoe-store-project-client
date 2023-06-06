import React, { useEffect, useState } from "react";
import VoucherCreate from './VoucherCreate';
import VoucherUpdate from './VoucherUpdate';
import { useDispatch, useSelector } from "react-redux";
import { getAllcategories } from '../../../redux/actions/CategoryAction'
import { deleteVoucher, getAllVouchers } from '../../../redux/actions/VoucherAction'
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';
import useModalCreate from '../useModalCreate';
import CofirmBox from "../../cofirmBox/CofirmBox";
import { VOUCHER_UPDATE_RESET } from "../../../redux/constants/Constants";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const VoucherMain = () => {
    const dispatch = useDispatch();
    const {isShowingCreate, toggleCreate} = useModalCreate();
    const {isShowing, toggle, id} = useModal();
    const voucherList = useSelector((state) => state.voucherList);
    const { loading, error, vouchers} = voucherList;
    const voucherUpdate = useSelector((state) => state.voucherUpdate);
    const { success: succsesUpdate} = voucherUpdate;
    const {isShowing: isShowConfirmBox, toggle:toggleConfirmBox, id: idVoucher} = useModal();
    //categories.sort((a,b)=>(a.id-b.id));
    
    useEffect(() => {
        // if(succsesUpdate){
        //     dispatch({type: VOUCHER_UPDATE_RESET});
        //     dispatch(getAllVouchers());
        // } else {
            
        // }
        dispatch(getAllVouchers());
    }, [dispatch]);

    const deleteHandler = () => {
        dispatch(deleteVoucher({idVoucher}));
    }
    const ListItem = () => {
        return (
            <tr>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
            </tr>
        ); 
    }
    return (
                <div className="card-body">
                    <div className="text-center card-title">
                        <h3 className="mr-2">Voucher Manage</h3>
                    </div>
                    <button className="button-2" style={{marginBottom: "5px"}} type="button" onClick={toggleCreate}>New Voucher</button>
                    <div className="e-table">
                        <div className="table-responsive table-lg mt-3">
                            <table className="table table-bordered table-hover">
                                <thead align="center">
                                    <tr>
                                        {/* <th>Id</th> */}
                                        <th>Name</th>
                                        <th>Value</th>
                                        {/* <th>Quantity</th> */}
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                        <tbody align="center">
                                            <ListItem/>
                                            <ListItem/>
                                            <ListItem/>
                                            <ListItem/>
                                            <ListItem/>
                                        </tbody>
                                    ) : error ? (
                                        <tfoot align="center">
                                            <tr>
                                            <th colspan="5">
                                            <Message variant="alert-danger">{error}</Message>
                                            </th>
                                            </tr>
                                        </tfoot>
                                    ) : (
                                <tbody align="center">
                                { vouchers && vouchers.sort((a,b)=>(b.id-a.id)).map((item, index) => (
                                    <tr onClick={()=>{toggle(item.id)}}>
                                        {/* <td className="align-middle">{category.id}</td> */}
                                        <td className="text-nowrap align-middle">{item.name}</td>
                                        <td className="text-nowrap align-middle">{Math.round(item.value*100)}%</td>
                                        {/* <td className="text-nowrap align-middle">{item.quantity}</td> */}
                                        {/* <td className="text-nowrap align-middle">
                                            {category.status ==="1" ? <Status check="checked" /> : <Status check=""/>}
                                        </td> */}
                                        {item.status ==="0" ? (
                                            <td className="text-nowrap align-middle" style={{color:"red"}}>Inactive</td>
                                        ):(
                                            <td className="align-middle" style={{color:"green"}}>Active</td>
                                        )}
                                        <td className="text-center align-middle">
                                            <div className="btn-group align-top">
                                                <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={()=>{toggle(item.id)}}> 
                                                    <i className="tf-ion-edit"></i>
                                                </button>
                                                <button 
                                                    onClick={(e)=>{toggleConfirmBox(item.id);e.stopPropagation();}}
                                                    className="btn btn-sm btn-outline-secondary badge" type="button"> 
                                                <i className="tf-ion-android-delete"></i>
                                            </button>
                                            </div>
                                            
                                        </td>
                                    </tr>
                                ))}
                                </tbody>)}
                            </table>
                        </div>
                    </div>
                    <VoucherCreate
                        isShowing={isShowingCreate}
                        hide={toggleCreate}/>
                    <VoucherUpdate
                        isShowing={isShowing}
                        hide={toggle}
                        id={id}/>  
                    <CofirmBox 
                        isShowing={isShowConfirmBox}
                        noHandle={toggleConfirmBox}
                        yesHanle={deleteHandler}
                    // id={idOrder}
                    />         
                </div>
    )
}

export default VoucherMain
