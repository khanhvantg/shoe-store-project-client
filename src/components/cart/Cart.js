import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishListById,removeLineItem,updateLineItem } from '../../redux/actions/WishlistAction'
import {
    LINE_ITEM_UPDATE_RESET,
    ORDER_CREATE_RESET
} from '../../redux/constants/Constants'
import { createOrder } from '../../redux/actions/OrderAction'
import Input from '../checkValidate/Input'
import { Link } from "react-router-dom";
import { getUserDetails } from '../../redux/actions/UserAction'
import './Cart.scss'
import {toast} from 'react-toastify';
import Checkbox from '../checkValidate/Checkbox';
import Loading from "../loadingError/Loading";
import LoadingCustom from "../loadingError/LoadingCustom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Message from "../loadingError/Message";
const Cart = () => {
    const [pos, setPos]=useState();
    const [timer,setTimer]=useState(null);
    const [form, setForm] = useState({
        email: '',
        address: '',
        phoneNumber: '',
        name: '',
        status: null,      //status = 0 : cancle, 1 : wait confirm, 2: shipping, 3: completed 
        createdDate: '',
        createdBy: '',
        totalPrice: null
    });
    const [amounts, setAmounts] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const dispatch = useDispatch();

    const lineItemList = useSelector((state) => state.lineItemList);
    const { loading, error, lineItems, user} = lineItemList;

    const lineItemUpdate = useSelector((state) => state.lineItemUpdate);
    const { success: succsesUpdate, error: errorUpdate, loading: loadingUpdate } = lineItemUpdate;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { success: succsesCreate } = orderCreate;

    var today = new Date();
    var amountItem=0;
    const totalPrice = lineItems.reduce(function (result, item) {
        amountItem++;
        return result + Number(item.total);
      },0);

    const [itemInfo,setItemInfo] = useState({
        size:'',
        itemId: '',
        amount: 0,
        name: ''
    }); 
    useEffect(() =>{
        if(succsesUpdate){
            dispatch({type: LINE_ITEM_UPDATE_RESET});
            dispatch(getWishListById());
        } else {
            setAmounts(lineItems);
            setForm({
                email: user.email,
                address: user.address,
                phoneNumber: user.phone,
                name: user.name,
                status: 1,      //status = 0 : cancle, 1 : wait confirm, 2: shipping, 3: completed 
                createdDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear(),
                createdBy: userInfo.username,
                totalPrice: totalPrice
            })
        }
        if(errorUpdate){
            setAmounts(lineItems);
        }
    },[succsesCreate, succsesUpdate, lineItems, user, errorUpdate])

    const updateItem = (index,e) => { 
        const info = {
            size:'',
            itemId:'',
            amount:'',
            name:'',
        }
        if(e.target.value < 0 ){
            toast(e.target.value + " Is InValid", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
            const newArray = amounts.map((item, i) => {
                if (index === i) {
                    return { ...item, [e.target.name]: valueCurrent };
                } else {
                    return item;
                }});
                setAmounts(newArray); 
        } else {
        const newArray = amounts.map((item, i) => {
            if (index === i && e.target.value >= 0) {
                info.size=item.size;
                info.itemId=item.id;
                info.amount=e.target.value;
                info.name=item.product.name;
                return { ...item, [e.target.name]: e.target.value };
            } else {
                return item;
            }});
        setItemInfo(info);
        setAmounts(newArray); 
        }
    };

    const plusHandle = (index,e) => {
        setPos(index); 
        const info = {
            size:'',
            itemId:'',
            amount: '',
            name:'',
        }
        const newArray = amounts.map((item, i) => {
            let v = Number(e.target.value)+1;
            if (index === i) {
                info.size=item.size;
                info.itemId=item.id;
                info.name=item.product.name;
                info.amount=v;
                return { ...item, [e.target.name]: v };
            } else {
                return item;
            }});
        setAmounts(newArray); 
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            dispatch(updateLineItem({info}))
        }, 1000);
        setTimer(newTimer)
    };

    const minusHandle = (index,e) => { 
        const info = {
            size: '',
            itemId:'',
            amount:'',
            name:'',
        }
        if(e.target.value < 1 ){
            toast("Amount Is InValid", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
        } else {
        const newArray = amounts.map((item, i) => {
            let v = Number(e.target.value)-1;
            if (index === i && e.target.value >= 0) {
                info.size=item.size;
                info.itemId=item.id;
                info.name=item.product.name;
                info.amount=v;
                return { ...item, [e.target.name]: v };
            } else {
                return item;
            }});
        setAmounts(newArray); 
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            if(info.amount==0){
                const id = info.itemId;
                dispatch(removeLineItem(id));
            }else dispatch(updateLineItem({info}))
        }, 1000);
        setTimer(newTimer) 
        } 
    };

    const [valueCurrent, setValueCurrent]=useState();

    const focusHandler = (event) => {
        setValueCurrent(event.target.value);
    }

    const blurHandler = (event) => {
        if(event.target.value>0&&event.target.value!==valueCurrent){
            dispatch(updateLineItem({itemInfo}))
        } else if (event.target.value==0){
            const id = itemInfo.itemId;
            dispatch(removeLineItem(id));
        }
    }

    const handleRemoveItem = (id) => {
        dispatch(removeLineItem(id));
    }
         
    const ListItem = () => {
        return (
            <tr>
                <td className="product-thumbnail text-center" data-title="Image"><Skeleton/></td>
                <td className="product-name text-center" data-title="Product"><Skeleton/></td>
                <td className="product-price text-center" data-title="Price"><Skeleton/></td>
                <td className="product-name text-center" data-title="Amount"><Skeleton/></td>
                <td className="product-name text-center" data-title="Size"><Skeleton/></td>
                <td className="product-subtotal text-center" data-title="Total"><Skeleton/></td>
                <td className="product-remove text-center" data-title="Remove"><Skeleton/></td>
            </tr>
        ); 
    }
  return (
        <div className="checkout-container">
            <section className="page-header">
            <div className="overly"></div> 	
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                <div className="content text-center">
                    <h1 className="mb-3">Cart</h1>
        
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item"><Link reloadDocument={true}  to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Cart</li>
                    </ol>
                </nav>
                </div>
                </div>
            </div>
            </div>
        </section>
            
            <section className="cart shopping page-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="product-list">
                        <div className="cart-form">
                            <table className="table shop_table shop_table_responsive cart" cellspacing="0">
                                <thead>
                                    <tr>
                                        {/* <th className="product-thumbnail text-center"> </th> */}
                                        <th className="product-thumbnail text-center">Image</th>
                                        <th className="product-name text-center">Product</th>
                                        <th className="product-price text-center">Price</th>
                                        <th className="product-name text-center">Amount</th>
                                        <th className="product-name text-center">Size</th>
                                        <th className="product-subtotal text-center">Total</th>
                                        <th className="product-remove text-center">Remove</th>
                                    </tr>
                                </thead>
                                {loading?
                                    <tbody>
                                        <ListItem/>
                                        <ListItem/>
                                        <ListItem/>
                                    </tbody>:
                                    error?(
                                        <tfoot align="center">
                                            <tr>
                                            <th colspan="7">
                                            <Message variant="alert-danger">{error}</Message>
                                            </th>
                                            </tr>
                                        </tfoot>
                                    ):
                                    <>
                                <tbody>
                                    {amounts&&amounts.map((item,index)=>(
                                    <tr className="cart_item">
                                        {/* <td className="product-thumbnail text-center" data-title="">
                                            <span>{item.status}</span>
                                            <input
                                                name="status"
                                                // value={item.status}
                                                checked={(item.status===0)?"checked":""}
                                                onChange={(e)=>updateItem(index,e)}
                                                type="checkbox"
                                                />
                                        </td> */}
                                        <td className="product-thumbnail text-center" data-title="Image">
                                            <Link reloadDocument={true}  to={`/product/${item.product.id}`}><img src={item.product.images.sort((a,b)=>(a.id-b.id))[0].link} className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" /></Link>
                                        </td>
                                        <td className="product-name text-center" data-title="Product">
                                            <Link reloadDocument={true}  to={`/product/${item.product.id}`}>{item.product.name}</Link>
                                        </td>
                                        <td className="product-price text-center" data-title="Price">
                                            <span className="amount">${item.product.price}</span>
                                        </td>
                                        <td className="product-name text-center" data-title="Amount">
                                            <div className="btn-group">
                                                <button 
                                                    name="amount"
                                                    value={item.amount}
                                                    onClick={(e)=>minusHandle(index,e)}
                                                    className="cart-qty-minus" type="button">-</button>
                                                <input 
                                                    type="number"
                                                    name="amount"
                                                    value={item.amount}
                                                    onBlur={blurHandler}
                                                    onFocus={focusHandler}
                                                    onChange={(e)=>updateItem(index,e)}
                                                    className="input-group-field"/>
                                                <button 
                                                    name="amount"
                                                    value={item.amount}
                                                    onClick={(e)=>plusHandle(index,e)}
                                                    className="cart-qty-plus" type="button">+</button>
                                            </div>
                                    </td>
                                    <td className="product-price text-center" data-title="Size">
                                            <span className="amount">{item.size} UK</span>
                                        </td>
                                    <td className="product-subtotal text-center" data-title="Total">
                                        <span className="amount">
                                            ${item.total}
                                        </span>
                                    </td>
                                    <td className="product-remove text-center" data-title="Remove">
                                        <i className="tf-ion-android-delete" style={{cursor: "pointer", height: "20px"}} onClick={()=>handleRemoveItem(item.id)} ></i>
{/* 
                                        <a onClick={()=>handleRemoveItem(item.id)} className="remove" aria-label="Remove this item" data-product_id="30" data-product_sku="">×</a> */}
                                    </td>
                                </tr>
                                
                                    ))}
                                {/* <tr>
                                    <td colspan="6" className="actions">
                                        <div className="coupon">
                                            <input type="text" name="coupon_code" className="input-text form-control" id="coupon_code" value="" placeholder="Coupon code" /> 
                                            <button type="button" className="btn btn-black btn-small" name="apply_coupon" value="Apply coupon">Apply coupon</button>
                                            <span className="float-right mt-3 mt-lg-0">
                                            <button type="button" className="btn btn-dark btn-small" name="update_cart" value="Update cart" disabled="">Update cart</button>
                                            </span>
                                        </div>
                                        <input type="hidden" id="woocommerce-cart-nonce" name="woocommerce-cart-nonce" value="27da9ce3e8" />
                                        <input type="hidden" name="_wp_http_referer" value="/cart/" />
                                        </td>
                                </tr> */}
                                </tbody>
                                <tfoot align="right">
                                    <tr>
                                    {lineItems&&lineItems.length>0&&
                                        <th colspan="7">
                                        <Link reloadDocument={true}  to="/checkout" className="button-1">Check Out</Link>
                                        </th>
                                        }
                                    </tr>
                                </tfoot>
                                
                                </>}
                            </table>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </section>
            {(loading!==true&&lineItems&&lineItems.length<=0)&&
                <div className="text-center" style={{marginTop: "-79px"}}>
                    <h1>There are no lineitems yet</h1>
                    
                    <Link reloadDocument={true}  to="/shop?page=1" className="button-1">
                        Shop Now
                    </Link>
                </div>
            }
        </div>
    )
}

export default Cart