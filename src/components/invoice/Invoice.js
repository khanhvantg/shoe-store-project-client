
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrdersByUserId, getOrderById, getAllOrders, getOrderByOrderCode } from '../../redux/actions/OrderAction'
import { Link, useParams  } from "react-router-dom";
import Loading from "../loadingError/Loading";
import "./invoice.css"
const Invoice = () => {
    const dispatch = useDispatch();

    const orderDetail = useSelector((state) => state.orderDetail);
    const { loading, order, lineItems} = orderDetail;
    const {id} = useParams();
    useEffect(() => {
            dispatch(getOrderById(id));
    }, [dispatch, id]);

    const Print = () =>{      
        let printContents = document.getElementById('printInvoice').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents; 
      }
  return (
<div style={{padding: "30px 0px"}}>
{loading ? (
                        <Loading />
                        ) : (
                <>
                <div id="printInvoice">
                        <section className="cart shopping">
                            <div className="invoice-box">
                                <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <div className="cart-info card" style={{padding: "0px 1.5rem 1.5rem 1.5rem"}}>
                                    <li className="d-flex justify-content-between pt-2">
                                        <h4 class="mb-4">
                                            Invoice <br/>
                                            OrderID#: <span> {order.id}</span>
                                        </h4>
                                        <h1 class="align-middle">E-SHOP</h1>
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
                        
                    </div>
                    <div className="col text-center px-xl-3">
                    <button 
                    onClick={Print}
                    className="button-1 text-center" style={{width: "300px"}}
                >Print</button>
                </div>
                   </>
            )}</div> 


  )
}

export default Invoice
