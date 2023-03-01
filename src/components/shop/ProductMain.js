import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts} from '../../redux/actions/ProductAction';
import { getAllcategories, getCategoryById, stopGetCategory } from '../../redux/actions/CategoryAction'
import { Link } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import { createLineItem } from '../../redux/actions/WishlistAction'
const ProductMain = ({idCategory}) => {
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(1);
    const [productId,setProductId]=useState(null);
    const dispatch = useDispatch();
    const dispatchItem = useDispatch();
    const productList = useSelector((state) => state.productList);
    const categoryDetail = useSelector((state) => state.categoryDetail);
    const { loading, error, products } = idCategory==="0" ? productList : categoryDetail;
    const dataList = products&&products.filter(item=>item.status==="1");
    const [data, setData] = useState([])
    useEffect(() => {

        if(idCategory==="0"){
            dispatch(getAllProducts());
        } 
        else {
            dispatch(getCategoryById(idCategory));
        }
    }, [idCategory]);

    const itemInfo = {
        amount
    }
    const [searchText, setSearchText] = useState("");
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
    return (
        <div className="container">
            <div className="form-group has-search">
                <span className="tf-ion-search form-control-feedback"></span>
                <input 
                    style={{marginBottom:"1rem", background:"white"}}
                    type="text" className="form-control" placeholder="Search"
                    placeholder="Type to search..."
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        filterData(e.target.value);
                    }}
                    />
                <p style={{color: "black"}}>Results: {(check&&dataList.length!==0&&data.length===0)?dataList.length:data.length}</p>
            </div>
            
            {loading ? ( <Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : (
            <div className="row">
                {
                    (check&&dataList.length!==0)? 
                    <>
                    { (data.length===0?dataList:data).sort((a, b) => (a.id-b.id)).map((product)=>(
                    <>
                    {product.status!=="0"&&(
                    <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5" >
                        <div className="product">
                            <div className="product-wrap">
                                <Link to={{ pathname: `/product/${product.id}`}}>
                                    <img className="img-thumbnail w-100 mb-3 img-first"  src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} />
                                </Link>                      
                            </div>
                            {/* <span className="onsale">Sale</span> */}
                            {/* <div className="product-hover-overlay">
                                <a className="circle" onClick={()=>handleAddToCart(product.id)}><i className="tf-ion-android-cart"></i></a>
                                
                            </div> */}
                            {/* <a className="circle" ><i className="tf-ion-ios-heart"></i></a> */}
                            <div className="product-info">
                                <h2 className="product-title h5 mb-0"><Link to={{ pathname: `/product/${product.id}`}}>{product.name}</Link></h2>
                                <span className="price">
                                    $ {product.price}
                                </span>
                            </div>
                        </div>
                    </div>)}
                    </>
                    ))}
                    </>
                    :
                    <div className="text-center" style={{width: "100%"}}>
                        <span >No Products Found To Display!</span>
                    </div>
                }
                
                    {/* //{data.length === 0 && <span className="text-center">No records found to display!</span>} */}
            </div>)}
            
        </div>
    )
}

export default ProductMain
