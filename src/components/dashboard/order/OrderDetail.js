import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrdersByUserId, getOrderById, getAllOrders, updateOrder } from '../../../redux/actions/OrderAction'
import {
    ORDER_UPDATE_RESET,
} from '../../../redux/constants/Constants'
import CofirmBox from "../../cofirmBox/CofirmBox";
import useModal from "../useModal";
const OrderDetail = ({isShowing, hide, id}) => {
    const {isShowing:isShowConfirmBox, toggle:toggleConfirmBox} = useModal();
    const dispatch = useDispatch();
    const dispatchUpdate = useDispatch();
    const orderDetail = useSelector((state) => state.orderDetail);
    const {order, lineItems} = orderDetail;
    console.log(order.status)
    const [status, setStatus]=useState(order.status);
    const [submit,setSubmit]=useState(false)
    const orderUpdate = useSelector((state) => state.orderUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = orderUpdate;

    //var amountItem=0;
    const amountItem = lineItems.reduce(function (result, item) {
        return result + Number(item.amount);
      },0);
    useEffect(() => {
        if (successUpdate) {
            dispatch({type: ORDER_UPDATE_RESET});
            dispatch(getAllOrders());
            setStatus(order.status)
        }else{
            if(isShowing&&order.id!==id){
                dispatch(getOrderById(id));
            }
            if(submit&&status!=order.status){
                dispatchUpdate(updateOrder({orderInfo}));
                setSubmit(false);
            }
        }
    }, [order, dispatch, id, isShowing, submit]);
    const orderInfo = {
        orderId: id,
        status
    }
    const handleCancel = () => {
        orderInfo.status=0;
        //setStatus(0);
        dispatchUpdate(updateOrder({orderInfo}));
    }
    const handleConfirm = () => {
        setStatus(2);
        setSubmit(true);
    }
    const handleShip = () => {
        setStatus(3);
        setSubmit(true);
    }
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
                    {/* {loading ? (
                        <Loading />
                        ) : error ? (
                            <Message variant="alert-danger">{error}</Message>
                        ) : ( */}
                        <section class="cart shopping">
            <div class="container">
                <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="cart-info card p-4 mt-4">
                    <li class="d-flex justify-content-between pb-2 mb-3">
                        <h4 class="mb-4">Information Order</h4>
                        {order.status ==="0" ? (
                            <h3 className="text-nowrap align-middle" style={{color:"red"}}>Cancelled</h3>
                        ):order.status ==="1" ?(
                            <h3 className="align-middle"  style={{color:"gold"}}>Waiting Confirm</h3>
                        ):order.status ==="2" ?(
                            <h3 className="align-middle" style={{color:"blue"}}>Shipping</h3>
                        ):(
                            <h3 className="align-middle" style={{color:"green"}}>Shipped</h3>
                        )}
                    </li>
                        <ul class="list-unstyled mb-4">
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Orderer</h5>
                            <span>{order.createdBy}</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Receiver</h5>
                            <span>{order.name}</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Phone</h5>
                            <span>{order.phoneNumber}</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Adress</h5>
                            <span>{order.address}</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Total Item</h5>
                            <span>{amountItem}</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2">
                            <h5>Total Price</h5>
                            <span>$ {order.totalPrice}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="product-list">
                        <form class="cart-form">
                            <table class="table shop_table shop_table_responsive cart" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th class="product-thumbnail"> </th>
                                        <th class="product-name">Product</th>
                                        <th class="product-price">Price</th>
                                        <th class="product-quantity">Amount</th>
                                        <th class="product-subtotal">Total</th>
                                    </tr>
                                </thead>
        
                                <tbody>
                            
                                    {lineItems&&lineItems.map(item=>(
                                        <tr class="cart_item">
                                    <td class="product-thumbnail" data-title="Thumbnail">
                                        <a href="/product-single"><img src={item.product.images.sort((a,b)=>(a.id-b.id))[0].link} class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" /></a>
                                    </td>
                                    <td class="product-name" data-title="Product">
                                        <a href="#">{item.product.name}</a>
                                    </td>
                                    <td class="product-price" data-title="Price">
                                        <span class="amount">{item.product.price}</span>
                                    </td>
                                    <td class="product-quantity" data-title="Quantity">
                                        {item.amount}
                                    </td>
                                    <td class="product-subtotal" data-title="Total">
                                        <span class="amount">
                                            $ {item.total}
                                        </span>
                                    </td>
                                </tr>
                                
                                    ))}
                                {/* <tr>
                                    <td colspan="6" class="actions">
                                        <div class="coupon">
                                            <input type="text" name="coupon_code" class="input-text form-control" id="coupon_code" value="" placeholder="Coupon code" /> 
                                            <button type="button" class="btn btn-black btn-small" name="apply_coupon" value="Apply coupon">Apply coupon</button>
                                            <span class="float-right mt-3 mt-lg-0">
                                            <button type="button" class="btn btn-dark btn-small" name="update_cart" value="Update cart" disabled="">Update cart</button>
                                            </span>
                                        </div>
                                        <input type="hidden" id="woocommerce-cart-nonce" name="woocommerce-cart-nonce" value="27da9ce3e8" />
                                        <input type="hidden" name="_wp_http_referer" value="/cart/" />
                                        </td>
                                </tr> */}
                                </tbody>
                            </table>
                        </form>
                        <div className="d-flex text-white justify-content-center">
                            {/* <div className="btn-group px-xl-3">
                                    <button 
                                    onClick={handleCancel}
                                    type="button" class="btn btn-danger" >Cancel</button>
                                <button 
                                    onClick={handleConfirm}
                                    type="button" class="btn btn-success">Confirm</button>
                                    </div> */}
                            {order.status==="1"?(
                                <div className="btn-group px-xl-3">
                                    <button 
                                    onClick={()=>toggleConfirmBox()}
                                    type="button" class="btn btn-danger">Cancel</button>
                                <button 
                                    onClick={handleConfirm}
                                    type="button" class="btn btn-success">Confirm And Ship</button>
                                    </div>
                                ): order.status==="2" ? (
                                    <div className="btn-group"> 
                                <button 
                                    onClick={handleShip}
                                    type="button" class="btn btn-success" >Complete</button>
                                    </div>
                            ):(<></>)}
                            
                        </div>
                    </div>
                </div>
                </div>
                </div>
                </section>
                        
                        {/* )} */}
                    </div>
                </div>
            </div>
        </div>
        <CofirmBox 
            isShowing={isShowConfirmBox}
            noHandle={toggleConfirmBox}
            yesHanle={handleCancel}
        />
    </div>
</>

  )
}

export default OrderDetail
