import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts} from '../../../redux/actions/ProductAction'
import { getAllcategories, getCategoryById, stopGetCategory } from '../../../redux/actions/CategoryAction'
import { CATEGORY_DETAILS_STOP, CATEGORY_DETAILS_SUCCESS } from '../../../redux/constants/Constants'
import Status from '../../status/Status';
import ProductUpdate from "./ProductUpdate";
import ProductCreate from "./ProductCreate";
import SizeModal from "./SizeModal";
import ImageProduct from '../image/ImageProduct'
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';
import useModalCreate from '../useModalCreate';
const ProductMain = () => {
    const {isShowing, toggle, id} = useModal();
    const {isShowing: isShowingSize, toggle: toggleSize, id: idSize} = useModal();
    const {isShowingImage, toggleImage, idd} = useModal();
    const {isShowingCreate, toggleCreate} = useModalCreate();
    const  [idCategory, setIdCategory] = useState('0');
    const dispatch = useDispatch();
    const dispatchProduct = useDispatch();
    const dispatchCategory = useDispatch();
    const productList = useSelector((state) => state.productList);
    const categoryDetail = useSelector((state) => state.categoryDetail);
    const { loading, error, products } = idCategory==="0" ? productList : categoryDetail;
    products.sort((a,b)=>(a.id-b.id));

    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;

    const { success, category } = categoryDetail;
    useEffect(() => {
        dispatchCategory(getAllcategories());
        console.log(idCategory)
        if(idCategory==='0'){
            dispatchProduct(getAllProducts());
        } 
        else {
            dispatch(getCategoryById(idCategory));
        }
        
    }, [dispatchProduct, dispatchCategory, dispatch, idCategory]);

    const handleC = (e) => {
        setIdCategory(e.target.value);
    }
  return (
    // <div className="row flex-lg-nowrap">
    //     <div className="col mb-3">
            <div className="e-panel card">
                <div className="card-body">
                    <div className="text-center card-title">
                        <h3 className="mr-2">Products Manage</h3>
                        <form className="ordering">
                            <select className="orderby form-control"
                                    value={idCategory}
                                    onChange={handleC} >
                                    <option value="0">All</option>
                                    {categories&&categories.map((item,index)=>(
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))};
                            </select>
                            <input type="hidden" name="paged" value="1" />
                        </form>
                    </div>
                    <div className="text-center px-xl-3">
                        <button className="btn btn-success btn-block" type="button" onClick={toggleCreate}>New Product</button>
                    </div>
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
                                        <th className="sortable">Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {products&&products.map((product, index)  => (
                                    <tr>
                                        <td className="align-middle">{product.id}</td>
                                        <td className="text-nowrap align-middle">{product.name}</td>
                                        <td className="text-nowrap align-middle" style={{wordBreak:"break-word"}}>{product.description}</td>
                                        <td className="text-nowrap align-middle">{product.price}</td>
                                        {/* <td className="text-nowrap align-middle">
                                            {product.status ==="1" ? <Status check="checked" /> : <Status check=""/>}
                                        </td> */}
                                        {product.status ==="0" ? (
                                                <td className="text-nowrap align-middle" style={{color:"red"}}>Inactive</td>
                                            ):(
                                                <td className="align-middle" style={{color:"green"}}>Active</td>
                                            )}
                                        <td className="text-center align-middle">
                                            <div className="btn-group align-top">
                                                <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={()=>{toggle(product.id)}}> 
                                                    <i className="tf-ion-edit"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={()=>{toggleSize(product.id)}}> 
                                                    <i className="tf-ion-levels"></i>
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
            {/* </div>
        </div> */}
        <ProductCreate 
            isShowing={isShowingCreate}
            hide={toggleCreate}
            categories={categories}/>
        <ProductUpdate
            isShowing={isShowing}
            hide={toggle}
            id={id}
            idCategory={idCategory}/>
        <ImageProduct
            isShowing={isShowingImage}
            hide={toggleImage}
            id={idd}
        />
        <SizeModal
            isShowing={isShowingSize}
            hide={toggleSize}
            id={idSize}
        />
    </div>
    
  )
}

export default ProductMain
