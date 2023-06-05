import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductFilter, getProductPageable } from '../../redux/actions/ProductAction';
import { getAllcategories, getCategoryById, stopGetCategory } from '../../redux/actions/CategoryAction'
import { Link, useSearchParams } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import { createLineItem } from '../../redux/actions/WishlistAction'
import { toast } from 'react-toastify';

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Paginations from "../pagination/Paginations";
const Shop = () => {
    const [form, setForm] = useState({
        amount: 1,
        size: '',
    })
    const [formPage, setFormPage] = useState({
        page: 0,
        size: 4,
    })
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(1);
    const [productId, setProductId] = useState(null);
    const dispatch = useDispatch();
    const dispatchItem = useDispatch();
    const dispatchFilter = useDispatch();
    const dispatchCategory = useDispatch();
    const [check1, setCheck1] = useState(0);

    const userLogin = useSelector((state) => state.userLogin);
    const { success, userInfo } = userLogin;

    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;
    const [idCategory, setIdCategory] = useState('0');
    // const categoryDetail = useSelector((state) => state.categoryDetail);
    // const { success, category } = categoryDetail;
    // useEffect(() => {
    //     dispatchCategory(getAllcategories());
    // }, [dispatchCategory]);

    const handleC = (e) => {
        setIdCategory(e.target.value);
    }
    //-new
    const [filters, setFilters] = useState({
        price: null,
        size: null
    })
    const [searchText, setSearchText] = useState("");
    const productList = useSelector((state) => state.productList);
    const categoryDetail = useSelector((state) => state.categoryDetail);
    const { loading, error, products } = idCategory === "0" ? productList : categoryDetail;
    const dataList = products && products.filter(item => item.status === "1");
    const [data, setData] = useState([])
    const [priceFilter, setPriceFilter] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(searchParams.get('page'));
    let NUM_OF_RECORDS = dataList.length;
    let LIMIT = 5;
    useEffect(() => {
        if (check1 === 0) {
            // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            dispatchCategory(getAllcategories());
            setCheck1(1);
        }
        if (idCategory === "0") {
            // clearTimeout(timer);
            // const newTimer = setTimeout(() => {
            // dispatchFilter(getProductFilter({filters}))
            // }, 1000);
            // setTimer(newTimer) 
            // if (filters.price===null&&filters.size===null){
            //     dispatchFilter(getProductPageable({formPage}))
            // //} 
            // // else if(filters.price!==priceFilter){
            // //     setPriceFilter(filters.price)
            // //     clearTimeout(timer);
            // //     const newTimer = setTimeout(() => {
            // //         dispatchFilter(getProductFilter({filters}))
            // //     }, 1000);
            // //     setTimer(newTimer)
            // } else {
            // dispatchFilter(getProductFilter({filters}));
            dispatchFilter(getProductFilter({ filters }))
            // clearTimeout(timer);
            // const newTimer = setTimeout(() => {

            // }, 2500);
            // setTimer(newTimer)
            // }
        } else {
            dispatch(getCategoryById(idCategory));
            setCurrentPage(1);
            setSearchParams({page: 1}, { replace: true });
        }
        setSearchText("")
        setData([]);
    }, [idCategory, check1, filters.size, filters.price, formPage.page]);
    const handelSize = (e) => {
        if (e.target.value !== filters.size) {
            setFilters(prev => ({ ...prev, size: e.target.value }));
            setForm(prev => ({ ...prev, size: e.target.value }));
            // setFormPage(prev=>({...prev, page: null}))
            if (e.target.value !== null) setIdCategory('0');
            setFormPage(prev => ({ ...prev, page: null }))
        } else {
            setFilters(prev => ({ ...prev, size: null }));
            if (filters.price === null || filters.price === '0') setFormPage(prev => ({ ...prev, page: 0 }));
        }
        setCurrentPage(1);
        setSearchParams({page: 1}, { replace: true });
    }

    const [timer, setTimer] = useState(null);
    const changePrice = (value) => {
        if (value === '0') {
            clearTimeout(timer);
            const newTimer = setTimeout(() => {
                setFilters(prev => ({ ...prev, price: null }));
            }, 1000);
            setTimer(newTimer);
            if (filters.size === null) setFormPage(prev => ({ ...prev, page: 0 }));
        } else {
            clearTimeout(timer);
            const newTimer = setTimeout(() => {
                setFilters(prev => ({ ...prev, price: value }));
            }, 1000);
            setTimer(newTimer);
        }
        setSearchParams({page: 1}, { replace: true });
        setCurrentPage(1);
        // setFilters(prev=>({...prev, price: e.target.value!=='0'?e.target.value:null}))
        // // console.log('c',e.target.value!=='0')
        //     clearTimeout(timer);
        //     const newTimer = setTimeout(() => {
        //         if(e.target.value!=='0'){
        //             setFilters(prev=>({...prev, price: e.target.value}));
        //             setFormPage(prev=>({...prev, page: null}))
        //     // if(filters.size===null) setFormPage(prev=>({...prev,page:0}));
        //     // if(e.target.value!==null)setIdCategory('0');
        //     // if(e.target.value==='0'&&filters.size===null) setFormPage(prev=> ({...prev, page: 0}))
        //     // else setFormPage(prev=> ({...prev, page: null}))
        //         } else {
        //             setFilters(prev=>({...prev, price:null}));
        //             if(filters.size===null) setFormPage(prev=> ({...prev, page: 0}));
        //         }
        //     }, 1000);
        //     setTimer(newTimer);

    }

    const itemInfo = {
        amount
    }
    const excludeColumns = ["id", "productInfors", "images", "status", "description",
        "createdBy", "createdDate", "modifiedBy", "modifiedDate"];
    const impCol = ["status"];
    const handleChange = value => {
        setSearchText(value);
        filterData(value);
    };
    const [check, setCheck] = useState(true);
    // filter records by search text
    const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") {
            setData([]);
            setCheck(true)
        } else {
            //console.log(products)
            const filteredData = dataList.filter(item => {
                return Object.keys(item).some(key =>
                    excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            });

            if (filteredData.length === 0) {
                setCheck(false);
            } else (setCheck(true));

            setData(filteredData)
        }
    }
    const sizeL = [
        {
            value: "3.5",
            label: "3.5UK"
        },
        {
            value: "4",
            label: "4UK"
        },
        {
            value: "4.5",
            label: "4.5UK"
        },
        {
            value: "5",
            label: "5UK"
        },
        {
            value: "5.5",
            label: "5.5UK"
        },
        {
            value: "6",
            label: "6UK"
        },
        {
            value: "6.5",
            label: "6.5UK"
        },
        {
            value: "7",
            label: "7UK"
        },
        {
            value: "7.5",
            label: "7.5UK"
        },
    ];
    const handleAddToCart = (id) => {
        if (userInfo && userInfo) {
            dispatchItem(createLineItem({ form, productId: id }))
        } else toast("Please Login To Buy Shoes", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1500 });
    }
    const ListItem = () => {
        return (
            <div className="col-md-4">
                <figure className="product__item card card-product-grid product">
                    <div className="img-wrap product-wrap">
                        {/* <Skeleton> */}
                        {/* <img className="box-shadow border w-100 mb-2 img-first"> */}
                        <Skeleton className="w-100 mb-2 img-first img-load"></Skeleton>

                        {/* </img> */}
                        {/* <Skeleton style={{backgroundImage: `url("/assets/images/image-icon.png")`}}> */}

                        {/* </Skeleton> */}
                        {/* </Skeleton> */}
                        {/* <Link reloadDocument={true}  to={{ pathname: `/product/${product.id}`}}>
                                        <img className="box-shadow border w-100 mb-2 img-first" src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} />
                                    </Link> */}
                    </div>
                    <div className="product__item__text">
                        <h5><Skeleton></Skeleton></h5>
                        {/* <Link reloadDocument={true}  to={`/product/${product.id}`} className="add-cart">View Detail</Link> */}
                        <h5><Skeleton></Skeleton></h5>
                    </div>
                </figure>
            </div>
        );
    }
    const onPageChanged = useCallback(
        (event, page) => {
            event.preventDefault();
            let search;
            if (page) {
                // setSearch(prev=>({
                //     ...prev,
                //     page: page
                // }))
                search = {
                    // search: searchText,
                    page: page
                }
            } else {
                search = undefined;

            }
            setCurrentPage(page);
            setSearchParams(search, { replace: true });
        },
        [setSearchParams]
    );
    const currentData = dataList.sort((a, b) => (b.id - a.id)).slice(
        (Number(currentPage) - 1) * LIMIT,
        (Number(currentPage) - 1) * LIMIT + LIMIT
    );
    return (
        <div>
            <section className="page-header" style={{ marginBottom: "15px" }}>
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">Shoes</h1>
                                {/* <p>Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which</p> */}

                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><Link reloadDocument={true}  to="/">Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Shoes</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-content padding-y">
                <div className="container">
                    <div className="row">
                        <aside className="col-md-3">
                            <div className="card">
                                <article className="filter-group">
                                    <header className="card-header">
                                        <form className="pb-3">
                                            <div className="input-group">
                                                <input style={{ background: "white" }}
                                                    type="text" className="form-control" placeholder="Search..."
                                                    value={searchText}
                                                    onChange={(e) => {
                                                        setSearchText(e.target.value);
                                                        filterData(e.target.value);
                                                    }}
                                                />
                                                <div className="input-group-append">
                                                    <button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
                                                </div>
                                            </div>
                                        </form>
                                    </header>
                                    {/* <header className="card-header">
                    <a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="">
                        <i className="icon-control fa fa-chevron-down"></i>
                        <h6 className="title1">Product type</h6>
                    </a>
                </header>
                <div className="filter-content collapse show" id="collapse_1">
                    <div className="card-body">
                        <form className="pb-3">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Search" 
                          value={searchText}
                          onChange={(e) => {
                              setSearchText(e.target.value);
                              filterData(e.target.value);
                          }}
                          />
                          <div className="input-group-append">
                            <button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
                          </div>
                        </div>
                        </form>
                        
                        <ul className="list-menu">
                        <li><a href="#">People  </a></li>
                        <li><a href="#">Watches </a></li>
                        <li><a href="#">Cinema  </a></li>
                        <li><a href="#">Clothes  </a></li>
                        <li><a href="#">Home items </a></li>
                        <li><a href="#">Animals</a></li>
                        <li><a href="#">People </a></li>
                        </ul>

                    </div> 
                </div>
             */}
                                </article>
                                {/* <article className="filter-group">
                                    <header className="card-header">
                                        <a href="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="">
                                            <i className="icon-control fa fa-chevron-down"></i>
                                            <h6 className="title1">Brands </h6>
                                        </a>
                                    </header>
                                    <div className="filter-content collapse show" id="collapse_2">
                                        <div className="card-body">
                                            {categories&&categories.map((item,index)=>(
                                            <>
                                            {item.status!=="0"&&
                                                <label className="custom-control custom-checkbox" >
                                                    <input type="checkbox" className="custom-control-input" onClick={handleC} value={item.id} />
                                                    <div className="custom-control-label">{item.name}
                                                <b className="badge badge-pill badge-light float-right">120</b> 
                                                    </div>
                                                </label>}
                                            </>
                                            ))}
                                        </div> 
                                    </div>
                                </article>  */}

                                <article className="filter-group">
                                    <header className="card-header">
                                        <a href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="">
                                            <i className="icon-control fa fa-chevron-down"></i>
                                            <h6 className="title1">Price max </h6>
                                        </a>
                                    </header>
                                    <div className="filter-content collapse show" id="collapse_3">
                                        <div className="card-body">
                                            <input type='range' value={priceFilter} className="custom-range" min={0} max={1000} onChange={e => { changePrice(e.target.value); setPriceFilter(e.target.value) }} />
                                            <span>${priceFilter}</span>
                                            {/* <div className="form-row">
                                            <div className="form-group col-md-6">
                                            <label>$0</label>
                                            <input className="form-control" placeholder="$0" type="number" />
                                            </div>
                                            <div className="form-group text-right col-md-6">
                                            <label>$1000</label>
                                            <input className="form-control" placeholder="$1,0000" type="number" />
                                            </div>
                                            </div> 
                                            <button className="btn btn-block btn-primary">Apply</button> */}
                                        </div>
                                    </div>
                                </article>
                                <article className="filter-group">
                                    <header className="card-header mr-auto">
                                        <a href="#" data-toggle="collapse" data-target="#collapse_4" aria-expanded="true" className="">
                                            <i className="icon-control fa fa-chevron-down"></i>
                                            <h6 className="title1">Sizes</h6>
                                        </a>
                                        {/* <button className="btn btn-light">clear</button> */}
                                    </header>
                                    <div className="filter-content collapse show" id="collapse_4">
                                        <div className="card-body">
                                            {sizeL && sizeL.map(item => (
                                                <label className="checkbox-btn mr-2">
                                                    <input type="radio" className="hide" name="myfilter_radio" value={item.value} onClick={handelSize} />
                                                    <span className={filters.size === item.value ? "btn btn-light active" : "btn btn-light"} style={{ width: "67px" }}>{item.label}</span>
                                                </label>

                                            ))}
                                            {filters.size !== null && (<label className="checkbox-btn mr-2">
                                                <input type="radio" className="hide" name="myfilter_radio" onClick={() => { setFilters(prev => ({ ...prev, size: null })); setFormPage(prev => ({ ...prev, page: 0 })); setCurrentPage(1); setSearchParams({page: 1}, { replace: true }); }} />
                                                <span className="btn btn-danger" style={{ width: "67px" }}>X</span>
                                            </label>)}
                                        </div>
                                    </div>
                                </article>
                                {/* <article className="filter-group">
                                    <header className="card-header">
                                        <a href="#" data-toggle="collapse" data-target="#collapse_5" aria-expanded="false" className="">
                                            <i className="icon-control fa fa-chevron-down"></i>
                                            <h6 className="title1">More filter </h6>
                                        </a>
                                    </header>
                                    <div className="filter-content collapse in" id="collapse_5">
                                        <div className="card-body">
                                            <label className="custom-control custom-radio">
                                            <input type="radio" name="myfilter_radio" checked="" className="custom-control-input" />
                                            <div className="custom-control-label">Any condition</div>
                                            </label>

                                            <label className="custom-control custom-radio">
                                            <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                            <div className="custom-control-label">Brand new </div>
                                            </label>

                                            <label className="custom-control custom-radio">
                                            <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                            <div className="custom-control-label">Used items</div>
                                            </label>

                                            <label className="custom-control custom-radio">
                                            <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                            <div className="custom-control-label">Very old</div>
                                            </label>
                                        </div>
                                    </div>
                                </article> 
                            */}
                            </div>
                        </aside>
                        <main className="col-md-9">
                            <header className="border-bottom mb-4 pb-3">
                                <div className="form-inline">
                                    <span className="mr-md-auto">{(check && dataList.length !== 0 && data.length === 0) ? dataList.length : data.length} Items found </span>
                                    <select className="mr-2 form-control" value={idCategory}
                                        onChange={handleC} >
                                        <option value="0">All</option>
                                        {categories && categories.map((item, index) => (
                                            <>
                                                {item.status !== "0" && (<option key={index} value={item.id}>{item.name}</option>)}
                                            </>
                                        ))};

                                    </select>
                                    <input type="hidden" name="paged" value="1" />
                                    {/* <div className="btn-group">
                        <a href="#" className="btn btn-outline-secondary" data-toggle="tooltip" title="List view"> 
                            <i className="fa fa-bars"></i></a>
                        <a href="#" className="btn  btn-outline-secondary active" data-toggle="tooltip" title="Grid view"> 
                            <i className="fa fa-th"></i></a>
                    </div> */}
                                </div>
                            </header>
                            {loading ? (
                                <div className="row">
                                    <ListItem></ListItem>
                                    <ListItem></ListItem>
                                    <ListItem></ListItem>
                                </div>
                            ) : error ? (<Message variant="alert-danger">{error}</Message>) : (
                                <div className="row">
                                    {(check && currentData.length !== 0) ?
                                        <>
                                            { (data.length === 0 ? currentData : data).sort((a, b) => (a.id - b.id)).map((product) => (
                                                <>
                                                    {product.status !== "0" && (
                                                        <div className="col-md-4">
                                                            <figure className="product__item card card-product-grid product">
                                                                <div className="img-wrap product-wrap">
                                                                    <Link reloadDocument={true}  to={{ pathname: `/product/${product.id}` }}>
                                                                        <img className="box-shadow border w-100 mb-2 img-first" src={product.images.sort((a, b) => (a.id - b.id))[0]?.link} />
                                                                    </Link>
                                                                </div>
                                                                {filters && filters.size !== null &&
                                                                    <div className="product-hover-overlay">
                                                                        <a className="circle" onClick={() => handleAddToCart(product.id)}><i className="tf-ion-android-cart"></i></a>
                                                                    </div>}
                                                                {/* <figcaption className="info-wrap">
                                                <div className="fix-height text-center">
                                                    <a href="#" className="title">{product.name}</a>
                                                    <div className="price-wrap mt-2">
                                                        <span className="price">${product.price}</span>
                                                    </div>
                                                </div>
                                                <Link reloadDocument={true}  to={{ pathname: `/product/${product.id}`}} className="btn btn-block btn-primary">View Detail</Link>
                                            </figcaption> */}
                                                                <div className="product__item__text">
                                                                    <h6>{product.name}</h6>
                                                                    <Link reloadDocument={true}  to={`/product/${product.id}`} className="add-cart">View Detail</Link>
                                                                    <h5>${product.price}</h5>
                                                                </div>
                                                            </figure>
                                                        </div>)}
                                                </>
                                            ))}
                                        </>
                                        :
                                        <div className="text-center" style={{ width: "100%" }}>
                                            <span >No Products Found To Display!</span>
                                        </div>}
                                </div>)}

                            {
                                // (filters.price===null&&filters.size===null)&&
                                // <nav className="mt-4" aria-label="Page navigation sample">
                                // <ul className="pagination">
                                //     {/* <li className="page-item disabled"><a className="page-link"></a></li> */}
                                //     <li className={formPage.page===0?"page-item active":"page-item"} onClick={()=>setFormPage(prev=>({...prev, page: 0}))}><a className="page-link">1</a></li>
                                //     <li className={formPage.page===1?"page-item active":"page-item"} onClick={()=>setFormPage(prev=>({...prev, page: 1}))}><a className="page-link">2</a></li>
                                //     <li className={formPage.page===2?"page-item active":"page-item"} onClick={()=>setFormPage(prev=>({...prev, page: 2}))}><a className="page-link">3</a></li>
                                //     <li className={formPage.page===3?"page-item active":"page-item"} onClick={()=>setFormPage(prev=>({...prev, page: 3}))}><a className="page-link">4</a></li>
                                //     {/* <li className="page-item"><a className="page-link">Next</a></li> */}
                                // </ul>
                                // </nav>
                            }
                            <Paginations
                                totalRecords={NUM_OF_RECORDS}
                                pageLimit={LIMIT}
                                pageNeighbours={2}
                                onPageChanged={onPageChanged}
                                currentPage={currentPage}
                            />
                        </main>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Shop;