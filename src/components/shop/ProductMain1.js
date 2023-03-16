import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductFilter} from '../../redux/actions/ProductAction';
import { getAllcategories, getCategoryById, stopGetCategory } from '../../redux/actions/CategoryAction'
import { Link } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import { createLineItem } from '../../redux/actions/WishlistAction'
import {toast} from 'react-toastify';
const ProductMain1 = () => {
    const [form,setForm]=useState({
        amount: 1,
        size: '',
    })
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(1);
    const [productId,setProductId]=useState(null);
    const dispatch = useDispatch();
    const dispatchItem = useDispatch();
    const dispatchFilter = useDispatch();
    const dispatchCategory = useDispatch();
    const [check1,setCheck1] = useState(0);

    const userLogin = useSelector((state) => state.userLogin);
    const { success, userInfo } = userLogin;

    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;
    const  [idCategory, setIdCategory] = useState('0');
    // const categoryDetail = useSelector((state) => state.categoryDetail);
    // const { success, category } = categoryDetail;
    // useEffect(() => {
    //     dispatchCategory(getAllcategories());
    // }, [dispatchCategory]);

    const handleC = (e) => {
        setIdCategory(e.target.value);
    }
    //-new
    const [filters,setFilters] = useState({
        price: null,
        size: null
    })
    const [searchText, setSearchText] = useState("");
    const handelSize = (e) => {
        if(e.target.value!==filters.size){
            setFilters(prev=>({...prev,size:e.target.value}));
            setForm(prev=>({...prev,size:e.target.value}));
        }else setFilters(prev=>({...prev,size:null}));
    }

    const [timer,setTimer]=useState(null);
    const changePrice = (e) => {
        // setFilters(prev=>({...prev, price: e.target.value!=='0'?e.target.value:null}))
        if(e.target.value!==filters.price){
            setFilters(prev=>({...prev,price:e.target.value!=='0'?e.target.value:null}));
        }
    }
    const productList = useSelector((state) => state.productList);
    const categoryDetail = useSelector((state) => state.categoryDetail);
    const { loading, error, products } = idCategory==="0" ? productList : categoryDetail;
    const dataList = products&&products.filter(item=>item.status==="1");
    const [data, setData] = useState([])
    console.log("data",products)
    useEffect(() => {
        if(check1===0){
            dispatchCategory(getAllcategories());
            setCheck1(1);
        }
        if(idCategory==="0"){
            clearTimeout(timer);
            const newTimer = setTimeout(() => {
                dispatchFilter(getProductFilter({filters}))
            }, 1000);
            setTimer(newTimer) 
        } 
        else {
            dispatch(getCategoryById(idCategory));
        }
        setSearchText("")
        setData([]);
    }, [idCategory, check1, filters.size, filters.price]);

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
     const[check,setCheck]=useState(true);
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

          if(filteredData.length===0){
            setCheck(false);
          }else(setCheck(true));

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
            if(userInfo&&userInfo) {
                dispatchItem(createLineItem({form,productId:id}))
            } else  toast("Please Login To Buy Shoes", {position: toast.POSITION.TOP_CENTER});
        }
    return (
        <div>
            <section className="page-header" style={{marginBottom: "15px"}}>
                <div className="overly"></div> 	
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="content text-center">
                                    <h1 className="mb-3">Shoes</h1>
                                    {/* <p>Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which</p> */}
                        
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Shoes</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <section class="section-content padding-y">
                <div class="container">
                    <div class="row">
                        <aside class="col-md-3">
                            <div class="card">
                                <article class="filter-group">
                                    <header class="card-header">
                                        <form class="pb-3">
                                            <div class="input-group">
                                                <input style={{background:"white"}}
                                                type="text" class="form-control" placeholder="Search..." 
                                                value={searchText}
                                                onChange={(e) => {
                                                    setSearchText(e.target.value);
                                                    filterData(e.target.value);
                                                }}
                                                />
                                                <div class="input-group-append">
                                                    <button class="btn btn-light" type="button"><i class="fa fa-search"></i></button>
                                                </div>
                                            </div>
                                        </form>
                                    </header>
                {/* <header class="card-header">
                    <a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" class="">
                        <i class="icon-control fa fa-chevron-down"></i>
                        <h6 class="title1">Product type</h6>
                    </a>
                </header>
                <div class="filter-content collapse show" id="collapse_1">
                    <div class="card-body">
                        <form class="pb-3">
                        <div class="input-group">
                          <input type="text" class="form-control" placeholder="Search" 
                          value={searchText}
                          onChange={(e) => {
                              setSearchText(e.target.value);
                              filterData(e.target.value);
                          }}
                          />
                          <div class="input-group-append">
                            <button class="btn btn-light" type="button"><i class="fa fa-search"></i></button>
                          </div>
                        </div>
                        </form>
                        
                        <ul class="list-menu">
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
                                {/* <article class="filter-group">
                                    <header class="card-header">
                                        <a href="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" class="">
                                            <i class="icon-control fa fa-chevron-down"></i>
                                            <h6 class="title1">Brands </h6>
                                        </a>
                                    </header>
                                    <div class="filter-content collapse show" id="collapse_2">
                                        <div class="card-body">
                                            {categories&&categories.map((item,index)=>(
                                            <>
                                            {item.status!=="0"&&
                                                <label class="custom-control custom-checkbox" >
                                                    <input type="checkbox" class="custom-control-input" onClick={handleC} value={item.id} />
                                                    <div class="custom-control-label">{item.name}
                                                <b class="badge badge-pill badge-light float-right">120</b> 
                                                    </div>
                                                </label>}
                                            </>
                                            ))}
                                        </div> 
                                    </div>
                                </article>  */}
                                
                                <article class="filter-group">
                                    <header class="card-header">
                                        <a href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" class="">
                                            <i class="icon-control fa fa-chevron-down"></i>
                                            <h6 class="title1">Price max </h6>
                                        </a>
                                    </header>
                                    <div class="filter-content collapse show" id="collapse_3">
                                        <div class="card-body">
                                            <input type="range" value={filters.price===null?0:filters.price} class="custom-range" min="0" max="1000" onChange={changePrice}/>
                                            <span>${filters.price===null?0:filters.price}</span>
                                            {/* <div class="form-row">
                                            <div class="form-group col-md-6">
                                            <label>$0</label>
                                            <input class="form-control" placeholder="$0" type="number" />
                                            </div>
                                            <div class="form-group text-right col-md-6">
                                            <label>$1000</label>
                                            <input class="form-control" placeholder="$1,0000" type="number" />
                                            </div>
                                            </div> 
                                            <button class="btn btn-block btn-primary">Apply</button> */}
                                        </div>
                                    </div>
                                </article> 
                                <article class="filter-group">
                                    <header class="card-header mr-auto">
                                        <a href="#" data-toggle="collapse" data-target="#collapse_4" aria-expanded="true" class="">
                                            <i class="icon-control fa fa-chevron-down"></i>
                                            <h6 class="title1">Sizes</h6>
                                        </a>
                                        {/* <button className="btn btn-light">clear</button> */}
                                    </header>
                                    <div class="filter-content collapse show" id="collapse_4">
                                        <div class="card-body">
                                        {sizeL&&sizeL.map(item=>(
                                            <label class="checkbox-btn mr-2">
                                                <input type="radio" className="hide" name="myfilter_radio" value={item.value} onClick={handelSize}/>
                                                <span class={filters.size===item.value?"btn btn-light active":"btn btn-light"}  style={{width:"67px"}}>{item.label}</span>
                                            </label>
                                            
                                        ))}
                                            {filters.size!==null&&(<label class="checkbox-btn mr-2">
                                                <input type="radio" className="hide" name="myfilter_radio" onClick={()=>setFilters(prev => ({...prev,size: null}))}/>
                                                <span class="btn btn-danger" style={{width:"67px"}}>X</span>
                                            </label>)}
                                    </div>
                                    </div>
                                </article> 
                                {/* <article class="filter-group">
                                    <header class="card-header">
                                        <a href="#" data-toggle="collapse" data-target="#collapse_5" aria-expanded="false" class="">
                                            <i class="icon-control fa fa-chevron-down"></i>
                                            <h6 class="title1">More filter </h6>
                                        </a>
                                    </header>
                                    <div class="filter-content collapse in" id="collapse_5">
                                        <div class="card-body">
                                            <label class="custom-control custom-radio">
                                            <input type="radio" name="myfilter_radio" checked="" class="custom-control-input" />
                                            <div class="custom-control-label">Any condition</div>
                                            </label>

                                            <label class="custom-control custom-radio">
                                            <input type="radio" name="myfilter_radio" class="custom-control-input" />
                                            <div class="custom-control-label">Brand new </div>
                                            </label>

                                            <label class="custom-control custom-radio">
                                            <input type="radio" name="myfilter_radio" class="custom-control-input" />
                                            <div class="custom-control-label">Used items</div>
                                            </label>

                                            <label class="custom-control custom-radio">
                                            <input type="radio" name="myfilter_radio" class="custom-control-input" />
                                            <div class="custom-control-label">Very old</div>
                                            </label>
                                        </div>
                                    </div>
                                </article> 
                            */}
                            </div> 
                        </aside> 
                        <main class="col-md-9">
                            <header class="border-bottom mb-4 pb-3">
                                <div class="form-inline">
                                    <span class="mr-md-auto">{(check&&dataList.length!==0&&data.length===0)?dataList.length:data.length} Items found </span>
                                    <select class="mr-2 form-control"value={idCategory}
                                        onChange={handleC} >
                                        <option value="0">All</option>
                                        {categories&&categories.map((item,index)=>(
                                            <>
                                                {item.status!=="0"&&(<option key={index} value={item.id}>{item.name}</option>)}
                                            </>
                                        ))};

                                    </select>
                                    <input type="hidden" name="paged" value="1" />
                    {/* <div class="btn-group">
                        <a href="#" class="btn btn-outline-secondary" data-toggle="tooltip" title="List view"> 
                            <i class="fa fa-bars"></i></a>
                        <a href="#" class="btn  btn-outline-secondary active" data-toggle="tooltip" title="Grid view"> 
                            <i class="fa fa-th"></i></a>
                    </div> */}
                                </div>
                            </header>
                            {loading ? ( <Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : (
                            <div class="row">
                                {(check&&dataList.length!==0)? 
                                    <>
                                    { (data.length===0?dataList:data).sort((a, b) => (a.id-b.id)).map((product)=>(
                                    <>
                                    {product.status!=="0"&&(
                                    <div class="col-md-4">
                                        <figure class="card card-product-grid product">
                                            <div class="img-wrap product-wrap"> 
                                                {/* <span class="badge badge-danger"> NEW </span> */}
                                                <Link to={{ pathname: `/product/${product.id}`}}>
                                                    <img className="img-thumbnail w-100 mb-3 img-first" src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} />
                                                </Link>
                                                {/* <a class="btn-overlay" href="#"><i class="fa fa-search-plus"></i> Quick view</a> */}
                                            </div> 
                                            {filters&&filters.size!==null&&
                                             <div className="product-hover-overlay">
                                                <a className="circle" onClick={()=>handleAddToCart(product.id)}><i className="tf-ion-android-cart"></i></a>
                                            </div>}
                                            <figcaption class="info-wrap">
                                                <div class="fix-height text-center">
                                                    <a href="#" class="title">{product.name}</a>
                                                    <div class="price-wrap mt-2">
                                                        <span class="price">${product.price}</span>
                                                        {/* <del class="price-old">$ {product.price}</del> */}
                                                    </div>
                                                </div>
                                                <Link to={{ pathname: `/product/${product.id}`}} class="btn btn-block btn-primary">View Detail</Link>
                                            </figcaption>
                                        </figure>
                                    </div>)}
                                    </>
                                    ))}
                                    </>
                                    :
                                    <div className="text-center" style={{width: "100%"}}>
                                        <span >No Products Found To Display!</span>
                                    </div>}    
                            </div> )}
        {/* <nav class="mt-4" aria-label="Page navigation sample">
          <ul class="pagination">
            <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav> */}
                        </main>
                    </div>
                </div> 
            </section>
        </div>
  )
}

export default ProductMain1;