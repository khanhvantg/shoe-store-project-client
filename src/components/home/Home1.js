import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts} from '../../redux/actions/ProductAction';
import { getAllcategories, getCategoryById, stopGetCategory } from '../../redux/actions/CategoryAction'
import { Link } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import { createLineItem } from '../../redux/actions/WishlistAction'
import { getProductBest } from "../../redux/actions/RevenueAction";
const Home1 = () => {
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(1);
    const [productId,setProductId]=useState(null);
    const dispatch = useDispatch();
    const dispatchItem = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products} = productList;
    const dataList = products&&products.filter(item=>item.status==="1");
    const bestSeller = useSelector((state) => state.bestSeller);
    const { productBests } = bestSeller;
    //const { success, category, loading, error, products } = categoryDetail;
    var today = new Date();
    const month = {
        month: today.getMonth()+1,
        year: today.getFullYear()
    }
    const proBest = [];
    const [data,setData]=useState([2]);
    productBests&&productBests.sort((a,b)=>(Number(b.amountProduct)-Number(a.amountProduct)))
    for (let i in productBests) {
        for (let j in products) {
            if(Number(productBests[i].productId)===products[j].id&&products[j].status==="1"){
                proBest.push(products[j]);
                break;
            }
        }
    }
    const [check,setCheck] = useState(0);
    const handelBestSeller = () => {
        setCheck(0);
    }
    const handelNewArray = () => {
        setCheck(1);
    }
    console.log("b",productBests);
    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getProductBest({month}))
    }, []);

  return (
    <div className="home-container">
                    <div class="offcanvas-menu-overlay"></div>
            <div class="offcanvas-menu-wrapper">
            <div class="offcanvas__close">+</div>
            <ul class="offcanvas__widget">
            <li><span class="icon_search search-switch"></span></li>
            <li><a href="#"><span class="icon_heart_alt"></span>
            <div class="tip">2</div>
            </a></li>
            <li><a href="#"><span class="icon_bag_alt"></span>
            <div class="tip">2</div>
            </a></li>
            </ul>
            <div class="offcanvas__logo">
            <a href="#"><img src="assets/img/logo.png" alt="" /></a>
            </div>
            <div id="mobile-menu-wrap"></div>
            <div class="offcanvas__auth">
            <a href="#">Login</a>
            <a href="#">Register</a>
            </div>
            </div>
            
            
            <header class="header">
            <div class="container-fluid">
            <div class="row">
            <div class="col-xl-3 col-lg-2">
            <div class="header__logo">
            <a href="#"><img src="assets/img/logo.png" alt="" /></a>
            </div>
            </div>
            <div class="col-xl-6 col-lg-7">
            <nav class="header__menu">
            <ul>
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#">Women’s</a></li>
            <li><a href="#">Men’s</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Pages</a>
            <ul class="dropdown">
            <li><a href="#">Product Details</a></li>
            <li><a href="#">Shop Cart</a></li>
            <li><a href="#">Checkout</a></li>
            <li><a href="#">Blog Details</a></li>
            </ul>
            </li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
            </ul>
            </nav>
            </div>
            <div class="col-lg-3">
            <div class="header__right">
            <div class="header__right__auth">
            <a href="#">Login</a>
            <a href="#">Register</a>
            </div>
            <ul class="header__right__widget">
            <li><span class="icon_search search-switch"></span></li>
            <li><a href="#"><span class="icon_heart_alt"></span>
            <div class="tip">2</div>
            </a></li>
            <li><a href="#"><span class="icon_bag_alt"></span>
            <div class="tip">2</div>
            </a></li>
            </ul>
            </div>
            </div>
            </div>
            <div class="canvas__open">
            <i class="fa fa-bars"></i>
            </div>
            </div>
            </header>
    
    <section class="hero">
        <div class="hero__slider owl-carousel">
            <div class="hero__items set-bg" style={{backgroundImage: `url("/assets/images/img/hero/hero-1.jpg")`}}>
                <div class="container">
                    <div class="row">
                        <div class="col-xl-5 col-lg-7 col-md-8">
                            <div class="hero__text">
                                <h6>Summer Collection</h6>
                                <h2>Fall - Winter Collections 2030</h2>
                                <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering
                                commitment to exceptional quality.</p>
                                <a href="#" class="primary-btn">Shop now <span class="arrow_right"></span></a>
                                {/* <div class="hero__social">
                                    <a href="#"><i class="fa fa-facebook"></i></a>
                                    <a href="#"><i class="fa fa-twitter"></i></a>
                                    <a href="#"><i class="fa fa-pinterest"></i></a>
                                    <a href="#"><i class="fa fa-instagram"></i></a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hero__items set-bg" data-setbg="/assets/images/img/hero/hero-2.jpg">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-5 col-lg-7 col-md-8">
                            <div class="hero__text">
                                <h6>Summer Collection</h6>
                                <h2>Fall - Winter Collections 2030</h2>
                                <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering
                                commitment to exceptional quality.</p>
                                <a href="#" class="primary-btn">Shop now <span class="arrow_right"></span></a>
                                {/* <div class="hero__social">
                                    <a href="#"><i class="fa fa-facebook"></i></a>
                                    <a href="#"><i class="fa fa-twitter"></i></a>
                                    <a href="#"><i class="fa fa-pinterest"></i></a>
                                    <a href="#"><i class="fa fa-instagram"></i></a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

        <section className="ads section">
            <div className="container">
                <div className="row align-items-center">
                <div className="col-lg-6 offset-lg-6">
                    <div className="ads-content">
                    <span className="h5 deal">Hot Hot Hot</span>
                    <h2 className="mt-3 text-white">Trendy Shoe</h2>
                    <p className="text-md mt-3 text-white">Hurry up! Limited time offer. Grab ot now!</p>
                  
                        <div id="simple-timer" className="syotimer mb-5"></div>
                    <Link to="/shop" className="btn btn-main"><i className="ti-bag mr-2"></i>Shop Now </Link>
                    </div>
                </div>
                </div>
            </div>
        </section>
        <section className="section products-list">
          <div className="container">
                <div className="row">
                <div className="col-lg-4 col-sm-12 col-md-12">
                    <img src="assets/images/adsv.jpg" alt="Product big thumb"  className="img-fluid w-100" />
                </div>

                <div className="col-lg-4 col-sm-6 col-md-6">
                    <div className="widget-featured-entries mt-5 mt-lg-0">
                        <h4 className="mb-4 pb-3">Best selllers</h4>
                        { proBest&&proBest.map((product, index)=>(
                            <>
                            {index<4?(
                                <div className="media mb-3">
                            <Link className="featured-entry-thumb" to={`/product/${product.id}`}>
                                <img src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} alt="Product thumb" width="64" className="img-fluid mr-3" />
                            </Link>
                            <div className="media-body">
                                <h6 className="featured-entry-title mb-0"><Link to={`/product/${product.id}`}>{product.name}</Link></h6>
                                <p className="featured-entry-meta">$ {product.price}</p>
                            </div>
                        </div>
                            ): (<></>)}
                            </>
                        ))}
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-md-6">
                    <div className="widget-featured-entries mt-5 mt-lg-0">
                        <h4 className="mb-4 pb-3">New Arrivals</h4>
                        { dataList&&dataList.sort((a, b) => (b.id-a.id)).map((product, index)=>(
                            <>
                            {index<4?(
                                <div className="media mb-3">
                            <Link className="featured-entry-thumb" to={`/product/${product.id}`}>
                                <img src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} alt="Product thumb" width="64" className="img-fluid mr-3" />
                            </Link>
                            <div className="media-body">
                                <h6 className="featured-entry-title mb-0"><Link to={`/product/${product.id}`}>{product.name}</Link></h6>
                                <p className="featured-entry-meta">$ {product.price}</p>
                            </div>
                        </div>
                            ): (<></>)}
                            </>
                        ))}
                    </div>
                </div>
              </div>
            </div>
        </section>
        <section className="features border-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="feature-block">
                            <i className="tf-ion-android-bicycle"></i>
                            <div className="content">
                                <h5>Free Shipping</h5>
                                <p>On all order over $39.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="feature-block">
                            <i className="tf-wallet"></i>
                            <div className="content">
                                <h5>30 Days Return</h5>
                                <p>Money back Guarantee</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="feature-block">
                            <i className="tf-key"></i>
                            <div className="content">
                                <h5>Secure Checkout</h5>
                                <p>100% Protected by paypal</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="feature-block">
                            <i className="tf-clock"></i>
                            <div className="content">
                                <h5>24/7 Support</h5>
                                <p>All time customer support </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/* <!-- Product Section Begin --> */}
    <section class="product spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <ul class="filter__controls">
                        <li class={check===0?"active":""} data-filter="*" onClick={handelBestSeller}>Best Sellers</li>
                        <li class={check===1?"active":""} onClick={handelNewArray}>New Arrivals</li>
                        {/* <li data-filter=".hot-sales">Hot Sales</li> */}
                    </ul>
                </div>
            </div>
            <div class="row product__filter">
                {check===0?proBest&&proBest.map((product, index)=>(
                <>
                {index<4&&(
                <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" style={{backgroundImage:`url(${product.images.sort((a, b) => (a.id-b.id))[0]?.link})`}}>
                            <span class="label" style={{backgroundColor: "gray"}}>Best</span>
                            {/* <ul class="product__hover">
                                <li><a href="#"><img src="assets/images/img/icon/heart.png" alt=""/></a></li>
                                <li><a href="#"><img src="assets/images/img/icon/compare.png" alt=""/> <span>Compare</span></a></li>
                                <li><a href="#"><img src="assets/images/img/icon/search.png" alt=""/></a></li>
                            </ul> */}
                        </div>
                        <div class="product__item__text">
                            <h6>{product.name}</h6>
                            <Link to={`/product/${product.id}`} class="add-cart">View Detail</Link>
                            {/* <div class="rating">
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                            </div> */}
                            <h5>${product.price}</h5>
                            {/* <div class="product__color__select">
                                <label for="pc-1">
                                    <input type="radio" id="pc-1"/>
                                </label>
                                <label class="active black" for="pc-2">
                                    <input type="radio" id="pc-2"/>
                                </label>
                                <label class="grey" for="pc-3">
                                    <input type="radio" id="pc-3"/>
                                </label>
                            </div> */}
                        </div>
                    </div>
                </div>
                )}
                </>))
                :
                dataList&&dataList.sort((a, b) => (b.id-a.id)).map((product, index)=>(
                    <>
                    {index<4&&(
                <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                <div class="product__item img-wrap product-wrap">
                    <div class="product__item__pic set-bg" style={{backgroundImage: `url(${product.images.sort((a, b) => (a.id-b.id))[0]?.link})`}}>
                        <span style={{backgroundColor: "gray"}} class="label">New</span>
                        {/* <ul class="product__hover">
                            <li><a href="#"><img src="assets/images/img/icon/heart.png" alt=""/></a></li>
                            <li><a href="#"><img src="assets/images/img/icon/compare.png" alt=""/> <span>Compare</span></a></li>
                            <li><a href="#"><img src="assets/images/img/icon/search.png" alt=""/></a></li>
                        </ul> */}
                    </div>
                    <div class="product__item__text">
                        <h6>{product.name}</h6>
                        <Link to={`/product/${product.id}`} class="add-cart">View Detail</Link>
                        {/* <div class="rating">
                            <i class="fa fa-star-o"></i>
                            <i class="fa fa-star-o"></i>
                            <i class="fa fa-star-o"></i>
                            <i class="fa fa-star-o"></i>
                            <i class="fa fa-star-o"></i>
                        </div> */}
                        <h5>${product.price}</h5>
                        {/* <div class="product__color__select">
                            <label for="pc-1">
                                <input type="radio" id="pc-1"/>
                            </label>
                            <label class="active black" for="pc-2">
                                <input type="radio" id="pc-2"/>
                            </label>
                            <label class="grey" for="pc-3">
                                <input type="radio" id="pc-3"/>
                            </label>
                        </div> */}
                    </div>
                </div>
            </div>
            )}
            </>))
            }

            </div>
        </div>
    </section>
    
    </div>
  )
}
export default Home1;