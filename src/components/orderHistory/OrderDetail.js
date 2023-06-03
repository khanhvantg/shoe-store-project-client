
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrdersByUserId, getOrderById, getAllOrders } from '../../redux/actions/OrderAction'
import { Link } from "react-router-dom";
import Loading from "../loadingError/Loading";
const OrderDetail = ({isShowing, hide, id}) => {
    const dispatch = useDispatch();

    const orderDetail = useSelector((state) => state.orderDetail);
    const { loading, order, lineItems} = orderDetail;

    useEffect(() => {
        if(isShowing&&order.id!==id){
            dispatch(getOrderById(id));
        }
    }, [dispatch, order, id, isShowing]);
  if(!isShowing) return null;
  return (
    <>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} txtrole="dialog">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Order Detail</h5>
                    <button type="button" className="close" data-dismiss="modal" onClick={hide}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="py-1">
                    {loading ? (
                        <Loading />
                        ) : (
                            <section className="cart shopping">
                            <div className="">
                                <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <div className="cart-info card" style={{padding: "0px 1.5rem 1.5rem 1.5rem"}}>
                                    <li className="d-flex justify-content-between pt-2">
                                        <h4 class="mb-4">
                                            OrderID#: <span> {order.id}</span>
                                        </h4>
                                        {/* <h1 class="align-middle">E-SHOP</h1> */}
                                    </li>
                                        <ul className="list-unstyled mb-4">
                                            <h4>Info</h4>
                                            <li className="d-flex justify-content-between pt-2">
                                            <h5>Orderer</h5>
                                            <span>{order.createdBy}</span>
                                            </li>
                                            <li className="d-flex justify-content-between pt-2">
                                            <h5>Receiver</h5>
                                            <span>{order.name}</span>
                                            </li>
                                            <li className="d-flex justify-content-between pt-2">
                                            <h5>Phone</h5>
                                            <span>{order.phoneNumber}</span>
                                            </li>
                                            <li className="d-flex justify-content-between pt-2">
                                            <h5>Address</h5>
                                            <span>{order.address}</span>
                                            </li>
                                            <br/>
                                            <li className="d-flex justify-content-between pt-2">
                                            <h4>Price</h4>
                                            {(order.paymentStatus==="0"||order.paymentStatus===null)&&order.paymentType==="1"&&order.status!=="0" ? (
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00",borderRadius:"5px", color: "white" , padding: "4px"}}>Paid</span>
                                            </td>
                                        ):(order.paymentStatus==="1"||order.paymentStatus===null)&&order.paymentType==="1"&&order.status==="0" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"gold",borderRadius:"5px", color: "white" , padding: "4px"}}>Refunding</span>
                                            </td>
                                        ):order.paymentStatus==="2"&&order.paymentType==="1" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"blue",borderRadius:"5px", color: "white" , padding: "4px"}}>Refunded</span>
                                            </td>
                                        ):order.status!=="0"&&order.status!=="3" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"gold",borderRadius:"5px", color: "white" , padding: "4px"}}>Paying</span>
                                            </td>
                                        ):order.status ==="3" ? (
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00",borderRadius:"5px", color: "white" , padding: "4px"}}>Paid</span>
                                            </td>
                                        ):(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"", color: "" , padding: "4px"}}>None</span>
                                            </td>
                                        )}
                                            </li>
                                            <li className="d-flex justify-content-between pt-2"> 
                                            <h5>SubTotal</h5>
                                            <span>${order.totalPrice}</span>
                                            </li>
                                            <li className="d-flex justify-content-between pt-2">
                                            <h5>FeeShip</h5>
                                            <span>${order.feeShip===null?0:order.feeShip}</span>
                                            </li>
                                            <li className="d-flex justify-content-between pt-2">
                                            <h5>Discount</h5>
                                            <span>{order.voucher===null?0:Math.round(order.voucher*100)}%</span>
                                            </li>
                                            <li className="d-flex justify-content-between pt-2">
                                            <h5>VAT</h5>
                                            <span>{order.orderPrice!==null?10:0}%</span>
                                            </li>
                                            <li className="d-flex justify-content-between pt-2">
                                            <h5>Total Price</h5>
                                            <span>${order.orderPrice!==null?order.orderPrice:order.totalPrice}</span>
                                            </li>
                                        </ul>
                                    
                                    </div>
                                    <div className="product-list">
                                        <form className="cart-form">
                                            <table className="table shop_table shop_table_responsive cart" cellspacing="0">
                                                <thead align="center">
                                                    <tr>
                                                        <th className="product-thumbnail">Image</th>
                                                        <th className="product-name">Product</th>
                                                        <th className="product-price">Price</th>
                                                        <th className="product-quantity">Amount</th>
                                                        <th className="product-quantity">Size</th>
                                                        <th className="product-subtotal">Total</th>
                                                    </tr>
                                                </thead>
                        
                                                <tbody align="center">
                                            
                                                    {lineItems&&lineItems.map(order=>(
                                                        <tr className="cart_order">
                                                    <td className="product-thumbnail" data-title="Image">
                                                        <Link reloadDocument={true}  to={`/product/${order.product.id}`}><img src={order.product.images.sort((a,b)=>(a.id-b.id))[0].link} className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" /></Link>
                                                    </td>
                                                    <td className="product-name" data-title="Product">
                                                        <span className="amount">{order.product.name}</span>
                                                    </td>
                                                    <td className="product-price" data-title="Price">
                                                        {order.productPrice===null?
                                                            <span className="amount">${Math.round((Number(order.total)/Number(order.amount))*100)/100}</span>
                                                            :
                                                            <span className="amount">${order.productPrice}</span>
                                                        }
                                                    </td>
                                                    <td className="product-quantity" data-title="Quantity">
                                                        {order.amount}
                                                    </td>
                                                    <td className="product-quantity" data-title="Size">
                                                        {order.size} UK
                                                    </td>
                                                    <td className="product-subtotal" data-title="Total">
                                                        <span className="amount">
                                                            ${order.total}
                                                        </span>
                                                    </td>
                                                </tr>
                                                
                                                    ))}
                                                </tbody>
                                            </table>
                                            
                                        </form>

                                    </div>
                            
                                </div>
                                </div>
                                </div>
                        </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
</>

  )
}

export default OrderDetail
