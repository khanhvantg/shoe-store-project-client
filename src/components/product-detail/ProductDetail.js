import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getProductById, getAllProducts} from '../../redux/actions/ProductAction'
import { getImageById } from '../../redux/actions/ImageAction'
import { addItemToCart } from '../../redux/actions/CartAction'
import { createLineItem } from '../../redux/actions/WishlistAction'
import {
    PRODUCT_UPDATE_RESET,
} from '../../redux/constants/Constants'
import axios from 'axios'
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '..//../redux/constants/Constants'
import { Link, useParams  } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import {toast} from 'react-toastify';
import Select from '../checkValidate/Select'
const ProductDetail = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { success, userInfo } = userLogin;

    const [form,setForm]=useState({
        amount: 1,
        size: '',
    })
    const dispatch = useDispatch();
    const dispatchItem = useDispatch();
    const productDetail = useSelector((state) => state.productDetail);
    const { loading, error, product} = productDetail;
    //const [amount,setAmount] = useState(1);
    //const [total,setTotal] = useState(0);
    const [submit,setSubmit] = useState(false);
    const {id} = useParams();

    const sizeList=[];
    if(product){
        for (let i in product.productInfors) {
            const cate = { value: product.productInfors[i].size, label: product.productInfors[i].size + ' UK'};
            sizeList.push(cate);
        }
    }
    console.log(sizeList)
    useEffect(() => {
        dispatch(getProductById(id))
    }, [dispatch])

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
    console.log(form)
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
    // const insertTag = () => {
    //     if (product.images.length === 2) return <li><img src="/assets/images/phong.png" alt="" class="img-fluid" s/></li>
    //     else if (product.images.length === 1) 
    //     return 
    //         <>
    //             <li><img src="/assets/images/phong.png" alt="" class="img-fluid" s/></li>
    //             <li><img src="/assets/images/phong.png" alt="" class="img-fluid" s/></li>
    //         </>
    // }
    //console.log(product.images?.length);
    
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
                        
                        <p class="product-description my-4 ">
                        {product.description}
                        </p>
            
                        {/* <form class="cart">
                        <div class="amount d-flex align-items-center">
                            <input type="number" id="#" class="input-text qty text form-control w-25 mr-3" step="1" min="1" max="9" 
                            onChange={(e) => setAmount(e.target.value)}
                            name="amount" value={amount} 
                            
                            title="Qty" size="4" />
                            <button class="btn btn-main btn-small" onClick={()=>handleAddToCart()}>Add to cart</button>
                        </div>
                        </form> */}
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
                        
                        {/* <div class="color-swatches mt-4 d-flex align-items-center">
                        <span class="font-weight-bold text-capitalize product-meta-title">color:</span>
                        <ul class="list-inline mb-0">
                            <li class="list-inline-item">
                            <a routerLink="/product-single" class="bg-info"></a>
                            </li>
                            <li class="list-inline-item">
                            <a routerLink="/product-single" class="bg-dark"></a>
                            </li>
                            <li class="list-inline-item">
                            <a routerLink="/product-single" class="bg-danger"></a>
                            </li>
                        </ul>
                        </div> */}
                        
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
                        
                        {/* <div class="product-size d-flex align-items-center mt-4">
                        <span class="font-weight-bold text-capitalize product-meta-title">Size:</span>
                        <select class="form-control">
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                        </select>
                        </div> */}
            
                        {/* <div class="products-meta mt-4">
                        <div class="product-category d-flex align-items-center">
                            <span class="font-weight-bold text-capitalize product-meta-title">Categories :</span>
                            <a href="#">Products , </a>
                            <a href="#">Soap</a>
                        </div>
            
                        <div class="product-share mt-5">
                            <ul class="list-inline">
                            <li class="list-inline-item">
                                <a href="#"><i class="tf-ion-social-facebook"></i></a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#"><i class="tf-ion-social-twitter"></i></a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#"><i class="tf-ion-social-linkedin"></i></a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#"><i class="tf-ion-social-pinterest"></i></a>
                            </li>
                            </ul>
                        </div>
                        </div>*/}
                    </div>
                    </div>
                </div>)}
            
                
                {/* <div class="row">
                    <div class="col-lg-12">
                    <nav class="product-info-tabs wc-tabs mt-5 mb-5">
                        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Description</a>
                        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Additional Information</a>
                        <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Reviews(2)</a>
                        </div>
                    </nav>
            
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
            
                        <h4>Product Features</h4>
            
                        <ul class="">
                        <li>Mapped with 3M™ Thinsulate™ Insulation [40G Body / Sleeves / Hood]</li>
                        <li>Embossed Taffeta Lining</li>
                        <li>DRYRIDE Durashell™ 2-Layer Oxford Fabric [10,000MM, 5,000G]</li>
                        </ul>
            
                        </div>
                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        
                        <ul class="list-unstyled info-desc">
                        <li class="d-flex">
                            <strong>Weight </strong>	
                            <span>400 g</span>
                        </li>
                        <li class="d-flex">
                            <strong>Dimensions </strong>
                            <span>10 x 10 x 15 cm</span>
                        </li>
                        <li class="d-flex">
                            <strong>Materials</strong>
                            <span >60% cotton, 40% polyester</span>
                        </li>
                        <li class="d-flex">
                            <strong>Color </strong>
                            <span>Blue, Gray, Green, Red, Yellow</span>
                        </li>
                        <li class="d-flex">
                            <strong>Size</strong>
                            <span>L, M, S, XL, XXL</span>
                        </li>
                        </ul>
                        </div>
                        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        <div class="row">
                        <div class="col-lg-7">
                            <div class="media review-block mb-4">
                            <img src="assets/images/avater-1.jpg" alt="reviewimg" class="img-fluid mr-4" />
                            <div class="media-body">
                                <div class="product-review">
                                <span><i class="tf-ion-android-star"></i></span>
                                <span><i class="tf-ion-android-star"></i></span>
                                <span><i class="tf-ion-android-star"></i></span>
                                <span><i class="tf-ion-android-star"></i></span>
                                <span><i class="tf-ion-android-star"></i></span>
                                </div>
                                <h6>Therichpost <span class="text-sm text-muted font-weight-normal ml-3">-June 23, 2019</span></h6>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum suscipit consequuntur in, perspiciatis laudantium ipsa fugit. Iure esse saepe error dolore quod.</p>
                            </div>	
                            </div>
            
                            <div class="media review-block">
                            <img src="assets/images/avater-2.jpg" alt="reviewimg" class="img-fluid mr-4" />
                            <div class="media-body">
                                <div class="product-review">
                                <span><i class="tf-ion-android-star"></i></span>
                                <span><i class="tf-ion-android-star"></i></span>
                                <span><i class="tf-ion-android-star"></i></span>
                                <span><i class="tf-ion-android-star"></i></span>
                                <span><i class="tf-ion-android-star-outline"></i></span>
                                </div>
                                <h6>Therichpost <span class="text-sm text-muted font-weight-normal ml-3">-June 23, 2019</span></h6>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum suscipit consequuntur in, perspiciatis laudantium ipsa fugit. Iure esse saepe error dolore quod.</p>
                            </div>	
                            </div>
                        </div>
            
            
                        <div class="col-lg-5">
                            <div class="review-comment mt-5 mt-lg-0">
                            <h4 class="mb-3">Add a Review</h4>
            
                            <form action="#">
                                <div class="starrr"></div>
                                <div class="form-group">
                                <input type="text" class="form-control" placeholder="Your Name" />
                                </div>
                                <div class="form-group">
                                <input type="email" class="form-control" placeholder="Your Email" />
                                </div>
                                <div class="form-group">
                                <textarea name="comment" id="comment" class="form-control" cols="30" rows="4" placeholder="Your Review"></textarea>
                                </div>
            
                                <a routerLink="/product-single" class="btn btn-main btn-small">Submit Review</a>
                            </form>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                 */}
                </div>
            </section>
            
            
            {/* <section class="products related-products section">
                <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                    <div class="title text-center">
                        <h2>You may like this</h2>
                        <p>The best Online sales to shop these weekend</p>
                    </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-6" >
                            <div class="product">
                        <div class="product-wrap">
                        <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-first" src="assets/images/322.jpg" alt="product-img" /></a>
                        <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-second" src="assets/images/444.jpg" alt="product-img" /></a>
                        </div>
            
                        <span class="onsale">Sale</span>
                        <div class="product-hover-overlay">
                        <a href="#"><i class="tf-ion-android-cart"></i></a>
                        <a href="#"><i class="tf-ion-ios-heart"></i></a>
                            </div>
            
                        <div class="product-info">
                        <h2 class="product-title h5 mb-0"><a routerLink="/product-single">Kirby Shirt</a></h2>
                        <span class="price">
                            $329.10
                        </span>
                        </div>
                    </div>
                    </div>
            
                    <div class="col-lg-3 col-6" >
                            <div class="product">
                        <div class="product-wrap">
                        <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-first" src="assets/images/111.jpg" alt="product-img" /></a>
                        <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-second" src="assets/images/222.jpg" alt="product-img" /></a>
                        </div>
            
                        <span class="onsale">Sale</span>
                        <div class="product-hover-overlay">
                        <a href="#"><i class="tf-ion-android-cart"></i></a>
                        <a href="#"><i class="tf-ion-ios-heart"></i></a>
                            </div>
            
                        <div class="product-info">
                        <h2 class="product-title h5 mb-0"><a routerLink="/product-single">Kirby Shirt</a></h2>
                        <span class="price">
                            $329.10
                        </span>
                        </div>
                    </div>
                    </div>
            
            
                    <div class="col-lg-3 col-6" >
                            <div class="product">
                        <div class="product-wrap">
                        <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-first" src="assets/images/111.jpg" alt="product-img" /></a>
                        <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-second" src="assets/images/322.jpg" alt="product-img" /></a>
                        </div>
            
                        <span class="onsale">Sale</span>
                        <div class="product-hover-overlay">
                        <a href="#"><i class="tf-ion-android-cart"></i></a>
                        <a href="#"><i class="tf-ion-ios-heart"></i></a>
                            </div>
            
                        <div class="product-info">
                        <h2 class="product-title h5 mb-0"><a routerLink="/product-single">Kirby Shirt</a></h2>
                        <span class="price">
                            $329.10
                        </span>
                        </div>
                    </div>
                    </div>
            
                    <div class="col-lg-3 col-6">
                            <div class="product">
                        <div class="product-wrap">
                        <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-first" src="assets/images/444.jpg" alt="product-img" /></a>
                        <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-second" src="assets/images/222.jpg" alt="product-img" /></a>
                        </div>
            
                        <span class="onsale">Sale</span>
                        <div class="product-hover-overlay">
                        <a href="#"><i class="tf-ion-android-cart"></i></a>
                        <a href="#"><i class="tf-ion-ios-heart"></i></a>
                            </div>
            
                        <div class="product-info">
                        <h2 class="product-title h5 mb-0"><a routerLink="/product-single">Kirby Shirt</a></h2>
                        <span class="price">
                            $329.10
                        </span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        */}
        </div>

    )}
export default ProductDetail;