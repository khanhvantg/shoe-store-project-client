import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts} from '../../redux/actions/ProductAction';
import { getAllcategories, getCategoryById, stopGetCategory } from '../../redux/actions/CategoryAction'
import { Link } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import { createLineItem } from '../../redux/actions/WishlistAction'
import { getProductBest } from "../../redux/actions/RevenueAction";
import LoadingCustom from "../loadingError/LoadingCustom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Home = () => {
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
    productBests&&productBests.sort((a,b)=>(Number(b.amountProduct)-Number(a.amountProduct)))
    for (let i in productBests) {
        for (let j in products) {
            if(Number(productBests[i].productId)===products[j].id&&products[j].status==="1"){
                proBest.push(products[j]);
                break;
            }
        }
    }
    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getProductBest({month}))
    }, []);

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
    const ListItem = () => {
        return (
            <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                    <div class="product__item">
                        <div class="img-wrap product-wrap"> 
                        <Skeleton className="w-100 mb-2 border img-load1"></Skeleton>
                    </div>
                    
                        <div class="product__item__text">
                            <h5><Skeleton></Skeleton></h5>
                            <h5><Skeleton></Skeleton></h5>
                        </div>
                    </div>
                </div>
                    
        );
      }
  return (
    <div className="home-container">
        {/* {loading&&<LoadingCustom content="Loading"/>} */}
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                {/* <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="assets/images/slider-new-1.png" className="d-block w-100" alt="..."/>
                </div>
                {/* <div className="carousel-item">
                    <img src="assets/images/slideshow1-2.jpg" className="d-block w-100" alt="..."/>
                </div> */}
                <div className="carousel-item">
                    <img src="assets/images/slider-new-2.png" className="d-block w-100" alt="..."/>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
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

        <section class="product spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <ul class="filter__controls mt-4">
                        <li class={check===0?" btn active":" btn"} onClick={handelBestSeller}>Best Sellers</li>
                        <li class={check===1?" btn active":" btn"} onClick={handelNewArray}>New Arrivals</li>
                        {/* <li data-filter=".hot-sales">Hot Sales</li> */}
                    </ul>
                </div>
                {/* <ListItem/><ListItem/><ListItem/><ListItem/> */}
            </div>
            
            {loading?
            <div className="row product__filter" >
                <ListItem/><ListItem/><ListItem/><ListItem/>
                </div>:
            <div class="row product__filter">   
                {check===0?proBest&&proBest.map((product, index)=>(
                <>
                {index<4&&(
                <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                    <div class="product__item">
                        {/* <div class="product__item__pic set-bg" style={{backgroundImage:`url(${product.images.sort((a, b) => (a.id-b.id))[0]?.link})`}}>
                            <span class="label" style={{backgroundColor: "gray"}}>Best</span>
                        </div> */}
                        <span class="onsale">Best</span>
                        <div class="img-wrap product-wrap"> 
                        <Link to={{ pathname: `/product/${product.id}`}}>
                            <img className="box-shadow w-100 mb-2 border" src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} />
                        </Link>
                    </div>
                    
                        <div class="product__item__text">
                            <h6>{product.name}</h6>
                            <Link to={`/product/${product.id}`} class="add-cart">View Detail</Link>
                      
                            <h5>${product.price}</h5>
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
                    <div class="product__item">
                    <div class="img-wrap product-wrap"> 
                        <Link to={{ pathname: `/product/${product.id}`}}>
                            <img className="box-shadow w-100 mb-2 border" src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} />
                        </Link>
                    </div> 
                    <span class="onsale">New</span>
                    <div class="product__item__text">
                            <h6>{product.name}</h6>
                            <Link to={`/product/${product.id}`} class="add-cart">View Detail</Link>
                      
                            <h5>${product.price}</h5>
                        </div>
                        </div>
            </div>
            )}
            </>))
            }
            </div>
}
        </div>
    </section>
    

        {/* <section className="section products-list">
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
        */}
        <section className="features border-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="feature-block">
                            <i className="tf-ion-android-bicycle"></i>
                            <div className="content">
                                <h5>Free Shipping</h5>
                                <p>On all order over $1000</p>
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
    </div>
  )
}
export default Home;