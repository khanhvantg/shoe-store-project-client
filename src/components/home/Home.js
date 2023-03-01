import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts} from '../../redux/actions/ProductAction';
import { getAllcategories, getCategoryById, stopGetCategory } from '../../redux/actions/CategoryAction'
import { Link } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import { createLineItem } from '../../redux/actions/WishlistAction'
import { getProductBest } from "../../redux/actions/RevenueAction";
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

  return (
    <div className="home-container">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                {/* <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="assets/images/img/hero/hero-1.jpg" className="d-block w-100" alt="..."/>
                </div>
                {/* <div className="carousel-item">
                    <img src="assets/images/slideshow1-2.jpg" className="d-block w-100" alt="..."/>
                </div> */}
                <div className="carousel-item">
                    <img src="assets/images/img/hero/hero-2.jpg" className="d-block w-100" alt="..."/>
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
    </div>
  )
}
export default Home;