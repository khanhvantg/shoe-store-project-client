import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductsByName} from '../../redux/actions/ProductAction';
import { getAllcategories, getCategoryById, stopGetCategory } from '../../redux/actions/CategoryAction'
import { Link } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import { createLineItem, getWishListById } from '../../redux/actions/WishlistAction'
import { getProductBest, getRevenueByMonth } from "../../redux/actions/RevenueAction";
import LoadingCustom from "../loadingError/LoadingCustom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Voucher from "./Voucher";
import { getAllVouchers } from "../../redux/actions/VoucherAction";
const Home = () => {
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(1);
    const [productId,setProductId]=useState(null);
    const [searchText, setSearchText]=useState("")
    const dispatch = useDispatch();
    const dispatchItem = useDispatch();
    
    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;
    const categoryL = categories&&categories.filter(item=>item.status==="1");
    const productList = useSelector((state) => state.productList);
    const { loading, error, products} = productList;
    const dataList = products&&products.filter(item=>item.status==="1");
    const revenueOfMonth = useSelector((state) => state.revenueOfMonth);
    const { revenueList } = revenueOfMonth;
    const voucherList = useSelector((state) => state.voucherList);
    const {loading: loadingVoucher, vouchers} = voucherList;
    const vList = vouchers&&vouchers.filter(item=>item.status==="1");
    //const { success, category, loading, error, products } = categoryDetail;
    var today = new Date();
    const month = {
        month: today.getMonth(),
        year: today.getFullYear()
    }
    const proBest = [];
    revenueList&&revenueList.sort((a,b)=>(Number(b.amountProduct)-Number(a.amountProduct)))
    for (let i in revenueList) {
        for (let j in products) {
            if(Number(revenueList[i].productId)===products[j].id&&products[j].status==="1"){
                proBest.push(products[j]);
                break;
            }
        }
    }
    const [check,setCheck] = useState(0);
    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getRevenueByMonth({month}))
        dispatch(getAllVouchers())
        dispatch(getAllcategories())
    }, []);

    const handelBestSeller = () => {
        setCheck(0);
    }
    const handelNewArray = () => {
        setCheck(1);
    }
    // useEffect(() => {
    //     dispatch(getAllProducts());
    //     dispatch(getRevenueByMonth({month}))
    // }, []);
    const [data,setData]=useState([])
    const [loadings, setLoadings]=useState(false)
    const [timer,setTimer]=useState(null);
    const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") {
            setData([]);
        } else {
            setLoadings(true)
            clearTimeout(timer);
                const newTimer = setTimeout(() => {
                    const filteredData = dataList.filter(item => {
                        return Object.keys(item).some(key =>
                            ["name"].includes(key)&&item[key].toString().toLowerCase().includes(lowercasedValue)
                        );
                    })
                    setData(filteredData)
                    setLoadings(false)
                }, 800)
            setTimer(newTimer)
        }
    }
    const ListItem = () => {
        return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                    <div className="product__item">
                        <div className="img-wrap product-wrap"> 
                        <Skeleton className="w-100 mb-2 border img-load1"></Skeleton>
                    </div>
                    
                        <div className="product__item__text">
                            <h5><Skeleton></Skeleton></h5>
                            <h5><Skeleton></Skeleton></h5>
                        </div>
                    </div>
                </div>
                    
        );
      }
      const ListSearch = () => {
        return (
            <div className="media" style={{marginBottom: "0px",}}>
                <div className="media-body">
                    <h5><Skeleton/></h5>
                    <h7><Skeleton/></h7>
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
        {/* <section className="section"> */}
                <div style={{backgroundColor: "gray", marginTop: "0px"}}>
                <div className="dropdown cart-nav dropdown-slide1" style={{width: "50%", margin: "auto"}}>
                        <form className="pb-3" style={{padding: "20px 0px 50px 0px"}}>
                            <h3 className="text-center" style={{color: "white", fontFamily: "nunito,roboto,proxima-nova,proxima nova,sans-serif"}}>SEARCH</h3>
                            <div className="input-group">
                                <input style={{background:"white"}}
                                    type="text" className="form-control" placeholder="Text to search"
                                    value={searchText}
                                    onChange={(e) => {setSearchText(e.target.value);filterData(e.target.value)}}
                                />
                                {/* <span className = "text-center"
                                    style={{position: "absolute",
                                            fontSize:20,
                                            right: 10,
                                            top: 14,
                                            cursor: "pointer"}}
                                    > */}
                                {/* <span style={{backgroundColor: "white"}}>
                                    <i className="tf-ion-ios-search"></i>
                                </span> */}
                                
                            </div>
                            {(searchText!=="")&&
                            <div className="dropdown-menu cart-dropdown">
                            {loadings?<Loading></Loading>:
                                data.length===0?<Message variant="alert-danger">Not found product</Message> :
                            data.sort((a,b)=>(a.id-b.id)).map(product=>(
                                <Link reloadDocument={true}  to={`/product/${product.id}`}>
                                    <div className="media" style={{paddingBottom: "5px"}}>
                                        <img className="media-object img- mr-3" src={product.images.sort((a,b)=>(a.id-b.id))[0]?.link} alt="image" />
                                        <div className="media-body">
                                            <h5>{product.name}</h5>
                                            <h7>${product.price}</h7>
                                        </div>
                                    </div>
                                    </Link>
                                ))
                               } 
                            </div>    
}
                        </form>
                </div>
                {/* <div className="row"> */}
                                <div className="" style={{margin: "auto"}}>
                                    <ul className="filter__controls1" style={{padding: "0px",}}>
                                        {categoryL&&categoryL.sort((a,b)=>(a.id-b.id)).map((item,index)=>(
                                        <li className="btn" style={{fontFamily: "math"}} className="btn">
                                            <Link reloadDocument={true}  to={{ pathname: `shop?category=${item.name}&page=1`}}>{item.name}</Link>
                                        </li>))}
                                    </ul>
                                </div>
                                {/* <ListItem/><ListItem/><ListItem/><ListItem/> */}
                            </div>
                {/* </div> */}
                {/* <div className="row align-items-center">
                <div className="col-lg-6 offset-lg-6">
                    <div className="ads-content">
                    <span className="h5 deal">Hot Hot Hot</span>
                    <h2 className="mt-3 text-white">Trendy Shoe</h2>
                    <p className="text-md mt-3 text-white">Hurry up! Limited time offer. Grab ot now!</p>
                  
                        <div id="simple-timer" className="syotimer mb-5"></div>
                    <Link reloadDocument={true}  to="/shop?page=1" className="btn btn-main"><i className="ti-bag mr-2"></i>Shop Now </Link>
                    </div>
                </div>
                </div> */}
        
        {/* </section> */}

        <section className="product spad">
        <div className="container">
            
            <h3 className="text-center" style={{ color: "black", fontFamily: "nunito,roboto,proxima-nova,proxima nova,sans-serif"}}>
                Voucher
            </h3>
            <Voucher 
                vouchers={vList}
                loading={loadingVoucher}    
            />
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <ul className="filter__controls mt-4">
                        <li className={check===0?" btn active":" btn"} onClick={handelBestSeller}>Best Sellers</li>
                        <li className={check===1?" btn active":" btn"} onClick={handelNewArray}>New Arrivals</li>
                        {/* <li data-filter=".hot-sales">Hot Sales</li> */}
                    </ul>
                </div>
                {/* <ListItem/><ListItem/><ListItem/><ListItem/> */}
            </div>
            
            {loading?
            <div className="row product__filter" >
                <ListItem/><ListItem/><ListItem/><ListItem/>
                </div>:
            <div className="row product__filter">   
                {check===0?proBest&&proBest.map((product, index)=>(
                <>
                {index<4&&(
                <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                    <div className="product__item">
                        {/* <div className="product__item__pic set-bg" style={{backgroundImage:`url(${product.images.sort((a, b) => (a.id-b.id))[0]?.link})`}}>
                            <span className="label" style={{backgroundColor: "gray"}}>Best</span>
                        </div> */}
                        <span className="onsale">Best</span>
                        <div className="img-wrap product-wrap"> 
                        <Link reloadDocument={true}  to={{ pathname: `/product/${product.id}`}}>
                            <img className="box-shadow w-100 mb-2 border" src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} />
                        </Link>
                    </div>
                    
                        <div className="product__item__text">
                            <h6>{product.name}</h6>
                            <Link reloadDocument={true}  to={`/product/${product.id}`} className="add-cart">View Detail</Link>
                      
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
                <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                    <div className="product__item">
                    <div className="img-wrap product-wrap"> 
                        <Link reloadDocument={true}  to={{ pathname: `/product/${product.id}`}}>
                            <img className="box-shadow w-100 mb-2 border" src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} />
                        </Link>
                    </div> 
                    <span className="onsale">New</span>
                    <div className="product__item__text">
                            <h6>{product.name}</h6>
                            <Link reloadDocument={true}  to={`/product/${product.id}`} className="add-cart">View Detail</Link>
                      
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
                            <Link reloadDocument={true}  className="featured-entry-thumb" to={`/product/${product.id}`}>
                                <img src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} alt="Product thumb" width="64" className="img-fluid mr-3" />
                            </Link>
                            <div className="media-body">
                                <h6 className="featured-entry-title mb-0"><Link reloadDocument={true}  to={`/product/${product.id}`}>{product.name}</Link></h6>
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
                            <Link reloadDocument={true}  className="featured-entry-thumb" to={`/product/${product.id}`}>
                                <img src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} alt="Product thumb" width="64" className="img-fluid mr-3" />
                            </Link>
                            <div className="media-body">
                                <h6 className="featured-entry-title mb-0"><Link reloadDocument={true}  to={`/product/${product.id}`}>{product.name}</Link></h6>
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