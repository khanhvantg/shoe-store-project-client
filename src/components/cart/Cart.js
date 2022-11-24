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
const Cart = () => {
    const [pos, setPos]=useState();
    const [timer,setTimer]=useState(null);
    const [form, setForm] = useState({
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
        if (succsesCreate) {
            dispatch({type: ORDER_CREATE_RESET});
            dispatch(getWishListById());
        } else if(succsesUpdate){
            dispatch({type: LINE_ITEM_UPDATE_RESET});
            dispatch(getWishListById());
        } else {
            setAmounts(lineItems);
            setForm({
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
            toast(e.target.value + " Is InValid", {position: toast.POSITION.TOP_CENTER});
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
            toast("Amount Is InValid", {position: toast.POSITION.TOP_CENTER});
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
            console.log(info.amount)
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
        console.log(valueCurrent)
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

    const onInputValidate = (value, name) => {
        setErrorInput(prev => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }));
        }
         
    const [errorInput, setErrorInput] = useState({
        name: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        address: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        phoneNumber: {
            isReq: true,
            reqType: 'PHONE',
            errorMsg: '',
            onValidateFunc: onInputValidate
        }
    });
         
    const onInputChange = useCallback((value, name) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);
        
    const validateForm = () => {
        let isInvalid = false;
        Object.keys(errorInput).forEach(x => {
            const errObj = errorInput[x];
            if (errObj.errorMsg) {
                isInvalid = true;
            } else if (errObj.isReq && !form[x]) {
                isInvalid = true;
                onInputValidate(true, x);
            }
        });
        return !isInvalid;
    }
        
    const handleOrder = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(createOrder({form}));
        }
    }
  return (
        <div className="checkout-container">
            <section class="page-header">
            <div class="overly"></div> 	
            <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                <div class="content text-center">
                    <h1 class="mb-3">Cart</h1>
                    Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which
        
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-transparent justify-content-center">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Cart</li>
                    </ol>
                </nav>
                </div>
                </div>
            </div>
            </div>
        </section>
            <section class="cart shopping page-wrapper">
            <div class="container">
                <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="product-list">
                        <div class="cart-form">
                            <table class="table shop_table shop_table_responsive cart" cellspacing="0">
                                <thead>
                                    <tr>
                                        {/* <th class="product-thumbnail text-center"> </th> */}
                                        <th class="product-thumbnail text-center"> </th>
                                        <th class="product-name text-center">Product</th>
                                        <th class="product-price text-center">Price</th>
                                        <th class="product-name text-center">Amount</th>
                                        <th class="product-name text-center">Size</th>
                                        <th class="product-subtotal text-center">Total</th>
                                        <th class="product-remove text-center"> </th>
                                    </tr>
                                </thead>
        
                                <tbody>
                                    {amounts&&amounts.map((item,index)=>(
                                    <tr class="cart_item">
                                        {/* <td class="product-thumbnail text-center" data-title="">
                                            <span>{item.status}</span>
                                            <input
                                                name="status"
                                                // value={item.status}
                                                checked={(item.status===0)?"checked":""}
                                                onChange={(e)=>updateItem(index,e)}
                                                type="checkbox"
                                                />
                                        </td> */}
                                        <td class="product-thumbnail text-center" data-title="Image">
                                            <Link to={`/product/${item.product.id}`}><img src={item.product.images.sort((a,b)=>(a.id-b.id))[0].link} class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" /></Link>
                                        </td>
                                        <td class="product-name text-center" data-title="Product">
                                            <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                                        </td>
                                        <td class="product-price text-center" data-title="Price">
                                            <span class="amount">${item.product.price}</span>
                                        </td>
                                        <td class="product-name text-center" data-title="Amount">
                                            <div class="btn-group">
                                                <button 
                                                    name="amount"
                                                    value={item.amount}
                                                    onClick={(e)=>minusHandle(index,e)}
                                                    class="cart-qty-minus" type="button">-</button>
                                                <input 
                                                    type="number"
                                                    name="amount"
                                                    value={item.amount}
                                                    onBlur={blurHandler}
                                                    onFocus={focusHandler}
                                                    onChange={(e)=>updateItem(index,e)}
                                                    class="input-group-field"/>
                                                <button 
                                                    name="amount"
                                                    value={item.amount}
                                                    onClick={(e)=>plusHandle(index,e)}
                                                    class="cart-qty-plus" type="button">+</button>
                                            </div>
                                    </td>
                                    <td class="product-price text-center" data-title="Size">
                                            <span class="amount">{item.size} UK</span>
                                        </td>
                                    <td class="product-subtotal text-center" data-title="Total">
                                        <span class="amount">
                                            ${item.total}
                                        </span>
                                    </td>
                                    <td class="product-remove text-center" data-title="Remove">
                                        <a onClick={()=>handleRemoveItem(item.id)} class="remove" aria-label="Remove this item" data-product_id="30" data-product_sku="">×</a>
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
                        </div>
                    </div>
                </div>
                </div>
                {
                    loadingUpdate ? <Loading /> :
                <div class="row justify-content-end">
                <div class="col-lg-4">
                    <div class="cart-info card p-4 mt-4">
                        <h4 class="mb-4">Cart totals</h4>
                        <ul class="list-unstyled mb-4">
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Subtotal</h5>
                            <span>{totalPrice}</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Shipping</h5>
                            <span>Free</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2">
                            <h5>Total</h5>
                            <span>{totalPrice}</span>
                            </li>
                        </ul>
                    </div>
                    </div>
                    <div class="col-lg-8">
                    {lineItems&&lineItems.length!==0?
                    <div class="cart-info card p-4 mt-4">
                        <h4 class="text-center mb-4">Delivery Information</h4>
                        <div className="form">
                            <div className="row">
                                <div className="col">
                                    <div className="col">
                                        <div className="form-group">
                                            <Input
                                                name="name"
                                                title="Name"
                                                value={form.name}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.name}
                                                />
                                            <Input
                                                name="address"
                                                title="Address"
                                                value={form.address}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.address}
                                            />
                                            <Input
                                                name="phoneNumber"
                                                title="Phone Number"
                                                value={form.phoneNumber}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.phoneNumber}
                                            />
                                            {/* <label>Name</label>
                                                <input 
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="form-control" type="text" name="name" placeholder/>
                            
                                <label>Phone</label>
                                <input 
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="form-control" type="text" name="phoneNumber" placeholder/>            
                            
                                <label>Address</label>
                                    <input 
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="form-control" type="text" name="addrees" placeholder/> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <div className="col text-center px-xl-3">
                            <button 
                            onClick={handleOrder}
                            class="btn btn-primary btn-block">Order</button>
                        </div>
                    </div>
                     :
                    <></>                
                    } 
                    </div>
                </div>}
                </div>
            </section>
        </div>
    )
}

export default Cart