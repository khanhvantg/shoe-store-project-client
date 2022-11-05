import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts} from '../../redux/actions/ProductAction'
import { Link } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import { addItemToCart } from '../../redux/actions/CartAction'
const ProductMain = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products} = productList;
    
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);
    const [quantity,setQuantity] = useState (1);
    const handleAddToCart = (product) => {
        console.log(quantity)
        dispatch(addItemToCart(product,quantity));
    }
    return (
        <div className="container">
            {loading ? ( <Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : (
            <div className="row">
                {products&&products.map((product)=>(
                    <div class="col-lg-3 col-12 col-md-6 col-sm-6 mb-5" >
                        <div class="product">
                            <div class="product-wrap">
                                <Link to={{ pathname: `/product/${product.id}`}}>
                                    <img className="img-thumbnail w-100 mb-3 img-first"  src={product.images[0]?.link} />
                                </Link>                      
                            </div>
                            {/* <span class="onsale">Sale</span> */}
                            <div class="product-hover-overlay">
                                <a className="circle" onClick={()=>handleAddToCart(product)}><i class="tf-ion-android-cart"></i></a>
                                <a className="circle" ><i class="tf-ion-ios-heart"></i></a>
                            </div>
                            <div class="product-info">
                                <h2 class="product-title h5 mb-0"><a href="/product-single">{product.name}</a></h2>
                                <span class="price">
                                    {product.price}
                                </span>
                            </div>
                        </div>
                    </div>))}
            </div>)}
        </div>
    )
}

export default ProductMain
