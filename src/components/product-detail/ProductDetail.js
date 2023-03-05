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
    
    // const sizeList=[];
    // if(product){
    //     for (let i in product.productInfors) {
    //         const cate = { value: product.productInfors[i].size, label: product.productInfors[i].size + ' UK'};
    //         sizeList.push(cate);
    //     }
    // }

    useEffect(() => {
        if(successCreate || successUpdate){
            dispatch({type: COMMENT_UPDATE_RESET});
            dispatchCmt(getAllComments(id));
            setFormComment(prev => ({
                ...prev,
                content: ''
            }))
        }else{
            dispatch(getProductById(id));
            dispatchCmt(getAllComments(id));
        }
        if(userInfo){
            for (let i in userInfo.roles) {
                if(userInfo.roles[i]==="ROLE_ADMIN") {
                    setIsAdmin(true);
                    break;
                }
            }
        } else {
            setIsAdmin(false);
        }
    }, [dispatch, dispatchCmt, successCreate, successUpdate, userInfo, id])

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
    console.log(product.productInfors)
    return (
        <div className="single-product-container">
            <section className="page-header">
                <div className="overly"></div> 	
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                    <div className="content text-center">
                        <h1 className="mb-3">{product.name}</h1>
                        <p></p>
            
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb bg-transparent justify-content-center">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/Shop">Shoes</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
                        </ol>
                    </nav>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            
            <section className="single-product">
                <div className="container">
                {loading ? ( <Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : (
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-4">
                    <div className="single-product-slider gallery-wrap">
                        <div className="carousel slide" data-ride="carousel" id="single-product-slider">
                        <div className="carousel-inner">
                        {product.images&&product.images.sort((a,b)=>(a.id-b.id)).map((item,key)=>(

                                <div className={(item.id===idImg||index+key===0)?"carousel-item active":"carousel-item"}>
                                    {/* <img src={item.link} alt="" className="img-thumbnail img-fluid" style={{width: "100%"}}/> */}
                                    {key<4&&(<img src={item.link} alt="" className="img-thumbnail img-fluid" style={{width: "100%"}}/>)}
                                </div>
                            ))}
                            </div>
                        <div className="thumbs-wrap">
                        <ol className="carousel-indicators">
                            {product.images&&product.images.sort((a,b)=>(a.id-b.id)).map((item,key)=>(
                                <li data-target="#single-product-slider" data-slide-to={key} className={(item.id===idImg||index+key===0)?"active item-thumb":"item-thumb"}>
                                    {<img src={item.link} onClick={()=>handleimg(item.id)} alt="" className="img-fluid"/>}
                                </li> 
                            ))}
                            {/* { (product.images?.length===2) ?(
                                    <li><img src="/assets/images/phong.png" alt="" className="img-fluid"/></li>):
                                (product.images?.length===1) ? (
                                    <>
                                        <li><img src="/assets/images/phong.png" alt="" className="img-fluid"/></li>
                                        <li><img src="/assets/images/phong.png" alt="" className="img-fluid"/></li> 
                                    </>
                                ):(<></>)
                            } */}
                        </ol>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                    <div className="col-md-6">
                    <div className="single-product-details mt-5 mt-lg-0">
                        <h2>{product.name}</h2>
                        <div className="sku_wrapper mb-4">
                        SKU: <span className="text-muted">{product.id} </span>
                        </div>
                        <hr />
                        <h3 className="product-price">$ {product.price}<del></del></h3>
                        <hr />
                        
                        <div class="form-group">
                                <h5>Short description</h5>
                                <div class="card-body">
                                    <p className="product-description mr-1">
                                        {product.description}
                                    </p>
                                </div>
                                <h5 class="">Available sizes</h5>
                                    <div class="card-body"> 
                                        {product.productInfors&&product.productInfors.sort((a,b)=>a.value-b.value).map(item=>(
                                            <>
                                            {item.amount>0&&
                                            <label class="checkbox-btn mr-1">
                                                <input type="radio" className="hide" name="myfilter_radio" value={item.size} onClick={(e)=>setForm(prev => ({...prev,size: e.target.value}))} />
                                                <span class={form.size===item.size?"btn btn-light active":"btn btn-light"} >{item.size} UK</span>
                                            </label>
                                            }
                                            </>
                                        ))}
                                    </div>						
                                </div>
                                <h5 style={{marginTop: "-1rem"}}>Quantity</h5>
                        <div className="amount d-flex align-items-center card-body">
                        <input type="number" id="#" className="input-text qty text form-control w-25 mr-1" step="1" min="1" max="20" 
                            name="amount"
                            onChange={(e)=>setForm(prev => ({
                                ...prev,
                                amount: e.target.value
                            }))}
                            value={form.amount} 
                            
                            title="Qty" size="4" />
                            <button className="btn btn-primary fa-lg" onClick={()=>handleAddToCart()}>Add to cart</button>
                            </div>
                            {/* <div className="form">
                            <Select
                                name="size"
                                title="Size"
                                value={form.size}
                                options={sizeList}
                                onChangeFunc={onInputChange}
                                //{...errorInput.category}
                            />
                            </div> */}
                            
                        </div>
                    </div>
                    <div className="col-md-1"/>
                </div>)}
                <div className="row d-flex justify-content-center mt-100 mb-100">
                    <div className="col-lg-12">
                        <div className="card">

                            <div className="card-body text-center">
                            <h4 className="card-title">Comment</h4>
                                {!isEdit?<div className="d-flex flex-row add-comment-section mt-4 mb-4">
                                
                                    <img className="img-fluid img-responsive rounded-circle mr-2" src="" width="38"/>
                                    <input onChange={CommentChange} name='content' value={formComment.content} type="text" className="form-control mr-3" placeholder="Add comment"/>
                                    {formComment.content===''?<button 
                                        onClick = {handleComment}
                                        className="btn btn-primary" type="button" disabled>Comment</button>
                                        :
                                        <button 
                                        onClick = {handleComment}
                                        className="btn btn-primary" type="button">Comment</button>}
                                </div>
                                :<></>}
                                {comments&&comments.length>0&&<h4 className="card-title">Latest Comments</h4>}
                            </div>
                            {comments&&comments.sort((a,b)=>(b.id-a.id)).map((item,index)=>(
                                <div className="comment-widgets border-bottom">
                                    <div className="d-flex flex-row comment-row m-t-0">
                                        <div className="p-2"><img src="https://i.imgur.com/Ur43esv.jpg" alt="user" width="50" className="rounded-circle"/></div>
                                        {isEdit&&item.id==formComment.commentId?
                                        
                                        <div className="comment-text w-100">
                                            {loadingComment?<Loading/>:<>
                                            <h6 className="font-medium">{item.user.account.username}</h6> 
                                            <input style={{background:"white"}} onChange={CommentChange} name='content' value={formComment.content} type="text" className="form-control mr-3" placeholder="Add comment"/>
                                            <div className="comment-footer"> 
                                            {formComment.content===''?
                                            <button type="button" className="btn btn-cyan btn-sm" onClick={handleSaveEdit} disabled>Save</button>:
                                            <button type="button" className="btn btn-cyan btn-sm" onClick={handleSaveEdit}>Save</button>}
                                            <button type="button" className="btn btn-danger btn-sm" onClick={()=>setIsEdit(false)}>Cancel</button>
                                            
                                            </div>
                                            </>}
                                        </div>
                                        :
                                        <div className="comment-text w-100">
                                            <h6 className="font-medium">{item.user.account.username}</h6> <span className="m-b-15 d-block">{item.content}.</span>
                                            <div className="comment-footer"> 
                                                <span className="text-muted float-right">{item.createdDate}</span> 
                                                {userInfo&&item.user.id===userInfo.id ? <button type="button" className="btn btn-cyan btn-sm" onClick={()=>handleEdit(item)}>Edit</button>:<></>}
                                                {userInfo&&item.user.id===userInfo.id || isAdmin ? <button type="button" className="btn btn-danger btn-sm" onClick={()=>handleDelete(item.id)}>Delete</button>:<></>}
                                            </div>
                                        </div>
                                        }
                                </div>
                            </div>
                              
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
     </div>

    )}
export default ProductDetail;