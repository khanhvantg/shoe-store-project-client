import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllProducts} from '../../../redux/actions/ProductAction'
// import { getAllcategories, getCategoryById, stopGetCategory } from '../../../redux/actions/CategoryAction'
// import { CATEGORY_DETAILS_STOP, CATEGORY_DETAILS_SUCCESS } from '../../../redux/constants/Constants'
import Status from '../../status/Status';
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';
import { getAllOrders } from '../../../redux/actions/OrderAction'
import OrderDetail from "./OrderDetail";
const OrderMain = () => {
    const {isShowing, toggle, id} = useModal();
    const dispatch = useDispatch();

    const orderList= useSelector((state) => state.orderList);
    const { loading, error, orders} = orderList;


    const orderDetail = useSelector((state) => state.orderDetail);
    const { order, lineItems} = orderDetail;

    useEffect(()=>{
        dispatch(getAllOrders());
    },[dispatch])

    if(!error){
        orders.sort((a,b)=>(a.id-b.id))
    }
    // const orderDetail = useSelector((state) => state.orderDetail);
    // const { order } = orderDetail;

  return (
    // <div className="row flex-lg-nowrap">
    //     <div className="col mb-3">
            <div className="e-panel card">
                <div className="card-body">
                    <div className="text-center card-title">
                        <h3 className="mr-2">Orders Manage</h3>
                    </div>
                    <div className="e-table">
                        <div className="table-responsive table-lg mt-3">
                        {loading ? (
                            <Loading />
                        ) : error ? (
                            <Message variant="alert-danger">{error}</Message>
                        ) : (
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Order Date</th>
                                        {/* <th>Amount Item</th> */}
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {orders&&orders.map((item, index)  => (
                                    <tr>
                                        <td className="align-middle">{item.id}</td>
                                        <td className="text-nowrap align-middle">{item.createdDate}</td>
                                        {/* <td className="text-nowrap align-middle">{item.amountItem}</td> */}
                                        <td className="text-nowrap align-middle">{item.totalPrice}</td>
                                        {item.status ==="0" ? (
                                            <td className="text-nowrap align-middle" style={{color:"red"}}>Cancelled</td>
                                        ):item.status ==="1" ?(
                                            <td className="align-middle"  style={{color:"gold"}}>Waiting Confirm</td>
                                        ):item.status ==="2" ?(
                                            <td className="align-middle" style={{color:"blue"}}>Shipping</td>
                                        ):(
                                            <td className="align-middle" style={{color:"green"}}>Shipped</td>
                                        )}
                                        <td className="text-center align-middle">
                                            <div className="btn-group align-top">
                                                {/* <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={""}> 
                                                    <i className="tf-ion-edit"></i>
                                                </button> */}
                                                <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={()=>{toggle(item.id)}}> 
                                                    <i className="tf-ion-eye"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            )}
                        </div>
                    </div>
                </div>
            {/* </div>
        </div> */}
        <OrderDetail
            isShowing={isShowing}
            hide={toggle}
            id={id}
            />
    </div>
    
  )
}

export default OrderMain
