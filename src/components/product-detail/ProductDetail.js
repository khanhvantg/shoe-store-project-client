import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getProductById, getAllProducts} from '../../redux/actions/ProductAction'
import { getImageById } from '../../redux/actions/ImageAction'
import { addItemToCart } from '../../redux/actions/CartAction'
import { createLineItem } from '../../redux/actions/WishlistAction'
import { createCommentByProductId, deleteComment, getAllComments, getCommentById, updateComment } from '../../redux/actions/CommentAction'
import {
    COMMENT_UPDATE_RESET,
} from '../../redux/constants/Constants'
import axios from 'axios'
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '..//../redux/constants/Constants'
import { Link, useParams  } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import {toast} from 'react-toastify';
import Select from '../checkValidate/Select'
import './Comment.css'
const ProductDetail = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const userLogin = useSelector((state) => state.userLogin);
    const { success, userInfo } = userLogin;

    const [form,setForm]=useState({
        amount: 1,
        size: '',
    })
    const dispatch = useDispatch();
    const dispatchCmt = useDispatch();
    const dispatchItem = useDispatch();
    const productDetail = useSelector((state) => state.productDetail);
    const { loading, error, product} = productDetail;

    const commentList = useSelector((state) => state.commentList);
    const { loading: loadingCmt, error: errorComment, comments} = commentList;

    const commentDetail = useSelector((state) => state.commentDetail);
    const { loading: loadingComment, comment } = commentDetail;

    const commentCreate = useSelector((state) => state.commentCreate);
    const { success : successCreate} = commentCreate;
    
    const commentUpdate = useSelector((state) => state.commentUpdate);
    const { success : successUpdate} = commentUpdate;
    //const [amount,setAmount] = useState(1);
    //const [total,setTotal] = useState(0);
    const [submit,setSubmit] = useState(false);
    const {id} = useParams();

    const [formComment, setFormComment] = useState ({
        productId: id,
        content: '',
        commentId: null,
    })
    
    const sizeList=[];
    if(product){
        for (let i in product.productInfors) {
            const cate = { value: product.productInfors[i].size, label: product.productInfors[i].size + ' UK'};
            sizeList.push(cate);
        }
    }

    useEffect(() => {
        if(successCreate || successUpdate){
            dispatch({type: COMMENT_UPDATE_RESET});
            dispatchCmt(getAllComments(id));
            setFormComment(prev => ({
                ...prev,
                content: ''
            }))
        }else{
            dispatchCmt(getAllComments({id}));
            dispatch(getProductById(id));
            
            // if(comment){
            //     setFormComment(prev => ({
            //         ...prev,
            //         content: comment.content
            //     }));
            // }
        }
        if(userInfo&&userInfo){
            for (let i in userInfo.roles) {
                if(userInfo.roles[i]==="ROLE_ADMIN" || userInfo.roles[i]==="ROLE_MODERATOR") {
                    setIsAdmin(true);
                    break;
                }
            }
        } else {
            setIsAdmin(false);
        }
    }, [dispatch, dispatchCmt, successCreate, successUpdate, userInfo])

    console.log(comments)
    const [idImg,setIdImg]=useState("");
    const [index,setIndex]=useState(0);
    const handleimg = (ID) => {
        dispatch(getImageById(ID));
        setIdImg(ID);
        setIndex(1);
    }
    // const itemInfo={
    //     amount
    // }
    const onAmountChange = (value, name) => {
        setForm(prev => ({
            ...prev,
            amount: value
        }));
    };
    const onInputChange = useCallback((value, name) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleAddToCart = () => {
        if(userInfo&&userInfo) {
            if (form.amount>0&&Number.isInteger(Number(form.amount))){
                dispatchItem(createLineItem({form,productId:id}))
            } else {
                toast("Amount Is InValid", {position: toast.POSITION.TOP_CENTER});
                setForm(prev => ({
                    ...prev,
                    amount: 1
                }));
            }
        } else  toast("Please Login To Buy Shoes", {position: toast.POSITION.TOP_CENTER});
        
        //dispatch(addItemToCart(product,amount));
       // console.log("id=",id,"amount=",amount)
    }
    const CommentChange = (e) => {
        setFormComment(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const handleComment = () => {
        if(userInfo)
            dispatch(createCommentByProductId({formComment}));
        else toast("Please Login To Comment", {position: toast.POSITION.TOP_CENTER});
    }

    const handleEdit = (item) => {
        setIsEdit(true)
        //dispatch(getCommentById(id));
        setFormComment(prev => ({
            ...prev,
            commentId: item.id,
            content: item.content
        }));
    }
    const handleSaveEdit = () => {
        setIsEdit(false)
        dispatch(updateComment({formComment}))
    }
    const handleDelete = (id) => {
        dispatch(deleteComment(id));
    }
    return (
        <div className="single-product-container">
            <section class="page-header">
                <div class="overly"></div> 	
                <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                    <div class="content text-center">
                        <h1 class="mb-3">Product Single</h1>
                        <p>Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which</p>
            
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb bg-transparent justify-content-center">
                        <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Product Single</li>
                        </ol>
                    </nav>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            
            <section class="single-product">
                <div class="container">
                {loading ? ( <Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : (
                <div class="row">
                    <div class="col-md-5">
                    <div class="single-product-slider">
                        <div class="carousel slide" data-ride="carousel" id="single-product-slider">
                        <div class="carousel-inner">
                        {product.images&&product.images.sort((a,b)=>(a.id-b.id)).map((item,key)=>(

                                <div className={(item.id===idImg||index+key===0)?"carousel-item active":"carousel-item"}>
                                    {key<3?(<img src={item.link} alt="" class="img-fluid" />):(<></>)}
                                    
                                </div>
                            ))}
                            </div>
                        <ol class="carousel-indicators">
                            {product.images&&product.images.sort((a,b)=>(a.id-b.id)).map((item,key)=>(
                                <li data-target="#single-product-slider" data-slide-to={key} className={(item.id===idImg||index+key===0)?"active":""}>
                                    {key<3?(<img src={item.link} onClick={()=>handleimg(item.id)} alt="" class="img-fluid"/>):(<></>)}
                                </li>
                            ))}
                            { (product.images?.length===2) ?(
                                    <li><img src="/assets/images/phong.png" alt="" class="img-fluid"/></li>):
                                (product.images?.length===1) ? (
                                    <>
                                        <li><img src="/assets/images/phong.png" alt="" class="img-fluid"/></li>
                                        <li><img src="/assets/images/phong.png" alt="" class="img-fluid"/></li> 
                                    </>
                                ):(<></>)
                            }
                        </ol>
                        </div>
                    </div>
                    </div>
                    
                    <div class="col-md-7">
                    <div class="single-product-details mt-5 mt-lg-0">
                        <h2>{product.name}</h2>
                        <div class="sku_wrapper mb-4">
                        SKU: <span class="text-muted">{product.id} </span>
                        </div>
            
                        <hr />
                        
                        <h3 class="product-price">$ {product.price}<del></del></h3>
                        
                        <p class="product-description my-4">
                        {product.description}
                        </p>
                        <div class="amount d-flex align-items-center">
                        <input type="number" id="#" class="input-text qty text form-control w-25 mr-3" step="1" min="1" max="9" 
                            name="amount"
                            onChange={(e)=>setForm(prev => ({
                                ...prev,
                                amount: e.target.value
                            }))}
                            value={form.amount} 
                            
                            title="Qty" size="4" />
                            <button class="btn btn-primary btn-block fa-lg gradient-custom-2 col-8" onClick={()=>handleAddToCart()}>Add to cart</button>
                            </div>
                            <div className="form">
                            <Select
                                name="size"
                                title="Size"
                                value={form.size}
                                options={sizeList}
                                onChangeFunc={onInputChange}
                                //{...errorInput.category}
                            />
                            </div>
                        </div>
                    </div>
                </div>)}
                <div class="row d-flex justify-content-center mt-100 mb-100">
                    <div class="col-lg-12">
                        <div class="card">

                            <div class="card-body text-center">
                            <h4 class="card-title">Comment</h4>
                                {!isEdit?<div class="d-flex flex-row add-comment-section mt-4 mb-4">
                                
                                    <img class="img-fluid img-responsive rounded-circle mr-2" src="https://i.imgur.com/qdiP4DB.jpg" width="38"/>
                                    <input onChange={CommentChange} name='content' value={formComment.content} type="text" class="form-control mr-3" placeholder="Add comment"/>
                                    {formComment.content===''?<button 
                                        onClick = {handleComment}
                                        class="btn btn-primary" type="button" disabled>Comment</button>
                                        :
                                        <button 
                                        onClick = {handleComment}
                                        class="btn btn-primary" type="button">Comment</button>}
                                </div>
                                :<></>}
                                <h4 class="card-title">Latest Comments</h4> 
                            </div>
                            { loadingCmt ? ( <Loading />) : errorComment ? (<Message variant="alert-danger">{error}</Message>) : (
                            <>
                            {comments&&comments.map((item,index)=>(
                                <div class="comment-widgets border-bottom">
                                    <div class="d-flex flex-row comment-row m-t-0">
                                        <div class="p-2"><img src="https://i.imgur.com/Ur43esv.jpg" alt="user" width="50" class="rounded-circle"/></div>
                                        {isEdit&&item.id==formComment.commentId?
                                        
                                        <div class="comment-text w-100">
                                            {loadingComment?<Loading/>:<>
                                            <h6 class="font-medium">{item.user.account.username}</h6> 
                                            <input style={{background:"white"}} onChange={CommentChange} name='content' value={formComment.content} type="text" class="form-control mr-3" placeholder="Add comment"/>
                                            <div class="comment-footer"> 
                                            {formComment.content===''?
                                            <button type="button" class="btn btn-cyan btn-sm" onClick={handleSaveEdit} disabled>Save</button>:
                                            <button type="button" class="btn btn-cyan btn-sm" onClick={handleSaveEdit}>Save</button>}
                                            <button type="button" class="btn btn-danger btn-sm" onClick={()=>setIsEdit(false)}>Cancel</button>
                                            
                                            </div>
                                            </>}
                                        </div>
                                        :
                                        <div class="comment-text w-100">
                                            <h6 class="font-medium">{item.user.account.username}</h6> <span class="m-b-15 d-block">{item.content}.</span>
                                            <div class="comment-footer"> 
                                                <span class="text-muted float-right">{item.createdDate}</span> 
                                                {userInfo&&item.user.id===userInfo.id ? <button type="button" class="btn btn-cyan btn-sm" onClick={()=>handleEdit(item)}>Edit</button>:<></>}
                                                {userInfo&&item.user.id===userInfo.id || isAdmin ? <button type="button" class="btn btn-danger btn-sm" onClick={()=>handleDelete(item.id)}>Delete</button>:<></>}
                                            </div>
                                        </div>
                                        }
                                </div>
                            </div>
                              
                            ))}
                            </>)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
     </div>

    )}
export default ProductDetail;