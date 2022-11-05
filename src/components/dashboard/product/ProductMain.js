import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../../../redux/actions/ProductAction'
import Status from '../../status/Status';
import ProductUpdate from "./ProductUpdate";
import ProductCreate from "./ProductCreate";
import ImageProduct from '../image/ImageProduct'
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';
import useModalCreate from '../useModalCreate';
const ProductMain = () => {
    const {isShowing, toggle, id} = useModal();
    const {isShowingImage, toggleImage, idd} = useModal();
    const {isShowingCreate, toggleCreate} = useModalCreate();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products} = productList;

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

  return (
    <div className="row flex-lg-nowrap">
    <div className="col mb-3">
        <div className="e-panel card">
            <div className="card-body">
                <div className="text-center card-title">
                    <h3 className="mr-2">Products</h3>
                    <form class="ordering " method="get">
                                            <select name="orderby" class="orderby form-control" aria-label="Shop order" >
                                                <option value="" selected="selected">All</option>
                                                <option value="">Loại 1</option>
                                                <option value="">Loại 2</option>
                                                <option value="">Loại 3</option>
                                                <option value="">Loại 4</option>
                                            </select>
                                            <input type="hidden" name="paged" value="1" />
                                        </form>
                </div>
                <div className="text-center px-xl-3">
                    <button className="btn btn-success btn-block" type="button" onClick={toggleCreate}>New Product</button>
                </div>
                {/* <div class="col-md-9">
                        <div class="row align-items-center">
                            <div class="col-lg-12 mb-4 mb-lg-0">
                                <div class="section-title">
                                    <h2 class="d-block text-left-sm">Shop</h2>
                                    <div class="heading d-flex justify-content-between mb-5">
                                        <p class="result-count mb-0"> Showing 1–6 of 17 results</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div> */}
                <div className="e-table">
                    <div className="table-responsive table-lg mt-3">
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <Message variant="alert-danger">{error}</Message>
                    ) : (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Decription</th>
                                    <th>Price</th>
                                    <th>Amount</th>   
                                    <th className="sortable">Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            { products && products.map((product, index) => (
                                <tr>
                                    <td className="align-middle">{product.id}</td>
                                    <td className="text-nowrap align-middle">{product.name}</td>
                                    <td className="text-nowrap align-middle">{product.description}</td>
                                    <td className="text-nowrap align-middle">{product.price}</td>
                                    <td className="text-nowrap align-middle">{product.amount}</td>
                                    {/* <td className="text-nowrap align-middle">
                                    {product.roles && product.roles.map((item,index) => (
                                        <div>
                                            {item.name==="ROLE_USER" ? <span>User </span> : item.name==="ROLE_MODERATOR" ? <span>Moderator </span> : <span>Admin </span> } 
                                        </div>
                                    ))}
                                    </td> */}
                                    <td className="text-nowrap align-middle">
                                        {product.status ==="1" ? <Status check="checked" /> : <Status check=""/>}
                                    </td>
                                    <td className="text-center align-middle">
                                        <div className="btn-group align-top">
                                            <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={()=>{toggle(product.id)}}> 
                                                <i className="tf-ion-edit"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={()=>{toggleImage(product.id)}}> 
                                                <i className="tf-ion-image"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ProductCreate 
        isShowing={isShowingCreate}
        hide={toggleCreate}/>
    <ProductUpdate
        isShowing={isShowing}
        hide={toggle}
        id={id}/>
    <ImageProduct
        isShowing={isShowingImage}
        hide={toggleImage}
        id={idd}
    />
    </div>
    
    
  )
}

export default ProductMain
