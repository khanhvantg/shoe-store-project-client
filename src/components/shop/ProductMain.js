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
    const { loading, error, products} = idCategory==="0" ? productList : categoryDetail;
    
    //const { success, category, loading, error, products } = categoryDetail;
    useEffect(() => {
        if (!loading) {
            if(idCategory==="0"){
                dispatch(getAllProducts());
            } 
            else {
                dispatch(getCategoryById(idCategory));
            }
        }
    }, [dispatch,idCategory]);

    const itemInfo = {
        amount
    }

    const handleAddToCart = (productId) => {
        dispatchItem(createLineItem({itemInfo,productId}))
    }

    return (
        <div className="container">
            {loading ? ( <Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : (
            <div className="row">
                { products&&products.sort((a, b) => (a.id-b.id)).map((product)=>(
                    <div class="col-lg-3 col-12 col-md-6 col-sm-6 mb-5" >
                        <div class="product">
                            <div class="product-wrap">
                                <Link to={{ pathname: `/product/${product.id}`}}>
                                    <img className="img-thumbnail w-100 mb-3 img-first"  src={product.images.sort((a, b) => (a.id-b.id))[0]?.link} />
                                </Link>                      
                            </div>
                            {/* <span class="onsale">Sale</span> */}
                            {/* <div class="product-hover-overlay">
                                <a className="circle" onClick={()=>handleAddToCart(product.id)}><i class="tf-ion-android-cart"></i></a>
                                
                            </div> */}
                            {/* <a className="circle" ><i class="tf-ion-ios-heart"></i></a> */}
                            <div class="product-info">
                                <h2 class="product-title h5 mb-0"><Link to={{ pathname: `/product/${product.id}`}}>{product.name}</Link></h2>
                                <span class="price">
                                    $ {product.price}
                                </span>
                            </div>
                        </div>
                    </div>))}
            </div>)}
        </div>
    )
}

export default ProductMain
