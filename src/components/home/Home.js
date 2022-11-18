import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts} from '../../redux/actions/ProductAction';
import { getAllcategories, getCategoryById, stopGetCategory } from '../../redux/actions/CategoryAction'
import { Link } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import { createLineItem } from '../../redux/actions/WishlistAction'
const Home = () => {
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(1);
    const [productId,setProductId]=useState(null);
    const dispatch = useDispatch();
    const dispatchItem = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products} = productList;
    
    //const { success, category, loading, error, products } = categoryDetail;
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

  return (
    <div class="home-container">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="assets/images/slideshow1-2.jpg" class="d-block w-100" alt="..."/>
                </div>
                <div class="carousel-item">
                    <img src="assets/images/slideshow1-2.jpg" class="d-block w-100" alt="..."/>
                </div>
                <div class="carousel-item">
                    <img src="assets/images/slider_3.jpg" class="d-block w-100" alt="..."/>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <section class="ads section">
            <div class="container">
                <div class="row align-items-center">
                <div class="col-lg-6 offset-lg-6">
                    <div class="ads-content">
                    <span class="h5 deal">Deal of the day 50% Off</span>
                    <h2 class="mt-3 text-white">Trendy Suit</h2>
                    <p class="text-md mt-3 text-white">Hurry up! Limited time offer.Grab ot now!</p>
                  
                        <div id="simple-timer" class="syotimer mb-5"></div>
                    <a href="#" class="btn btn-main"><i class="ti-bag mr-2"></i>Shop Now </a>
                    </div>
                </div>
                </div>
            </div>
        </section>
        <section class="section products-list">
          <div class="container">
                <div class="row">
                <div class="col-lg-4 col-sm-12 col-md-12">
                    <img src="assets/images/adsv.jpg" alt="Product big thumb"  class="img-fluid w-100" />
                </div>

                <div class="col-lg-4 col-sm-6 col-md-6">
                    <div class="widget-featured-entries mt-5 mt-lg-0">
                        <h4 class="mb-4 pb-3">Best selllers</h4>
                        { products&&products.sort((a, b) => (a.id-b.id)).map((product, index)=>(
                            <>
                            {index<4?(
                                <div class="media mb-3">
                            <Link class="featured-entry-thumb" to={`/product/${product.id}`}>
                                <img src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} alt="Product thumb" width="64" class="img-fluid mr-3" />
                            </Link>
                            <div class="media-body">
                                <h6 class="featured-entry-title mb-0"><Link to={`/product/${product.id}`}>{product.name}</Link></h6>
                                <p class="featured-entry-meta">${product.price}</p>
                            </div>
                        </div>
                            ): (<></>)}
                            </>
                        ))}
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6 col-md-6">
                    <div class="widget-featured-entries mt-5 mt-lg-0">
                        <h4 class="mb-4 pb-3">New Arrivals</h4>
                        { products&&products.sort((a, b) => (a.id-b.id)).map((product, index)=>(
                            <>
                            {index<4?(
                                <div class="media mb-3">
                            <Link class="featured-entry-thumb" to={`/product/${product.id}`}>
                                <img src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} alt="Product thumb" width="64" class="img-fluid mr-3" />
                            </Link>
                            <div class="media-body">
                                <h6 class="featured-entry-title mb-0"><Link to={`/product/${product.id}`}>{product.name}</Link></h6>
                                <p class="featured-entry-meta">${product.price}</p>
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
        <section class="features border-top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-sm-6 col-md-6">
                        <div class="feature-block">
                            <i class="tf-ion-android-bicycle"></i>
                            <div class="content">
                                <h5>Free Shipping</h5>
                                <p>On all order over $39.00</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-md-6">
                        <div class="feature-block">
                            <i class="tf-wallet"></i>
                            <div class="content">
                                <h5>30 Days Return</h5>
                                <p>Money back Guarantee</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-md-6">
                        <div class="feature-block">
                            <i class="tf-key"></i>
                            <div class="content">
                                <h5>Secure Checkout</h5>
                                <p>100% Protected by paypal</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-md-6">
                        <div class="feature-block">
                            <i class="tf-clock"></i>
                            <div class="content">
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