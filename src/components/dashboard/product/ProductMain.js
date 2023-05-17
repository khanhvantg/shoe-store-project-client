import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts} from '../../../redux/actions/ProductAction'
import { getAllcategories, getCategoryById, stopGetCategory } from '../../../redux/actions/CategoryAction'
import { CATEGORY_DETAILS_STOP, CATEGORY_DETAILS_SUCCESS,PRODUCT_DETAILS_STOP } from '../../../redux/constants/Constants'
import Status from '../../status/Status';
import ProductUpdate from "./ProductUpdate";
import ProductCreate from "./ProductCreate";
import SizeModal from "./SizeModal";
import ImageProduct from '../image/ImageProduct'
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';
import useModalCreate from '../useModalCreate';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ProductMain = () => {
    const {isShowing, toggle, id} = useModal();
    const {isShowing: isShowingSize, toggle: toggleSize, id: idSize} = useModal();
    const {isShowingImage, toggleImage, idd, toggle: toggleName, id: nameProduct} = useModal();
    const {isShowingCreate, toggleCreate} = useModalCreate();
    const  [idCategory, setIdCategory] = useState('0');
    const  [check, setCheck] = useState(0);
    const dispatch = useDispatch();
    const dispatchProduct = useDispatch();
    const dispatchCategory = useDispatch();
    const productList = useSelector((state) => state.productList);
    const categoryDetail = useSelector((state) => state.categoryDetail);
    const { loading, error, products } = idCategory==="0" ? productList : categoryDetail;
    products.sort((a,b)=>(b.id-a.id));

    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;

    const { success, category } = categoryDetail;
    useEffect(() => {
        if(check===0){
            dispatchCategory(getAllcategories());
            setCheck(1);
        }
        if(idCategory==='0'){
            dispatchProduct(getAllProducts());
        } else {
            dispatch(getCategoryById(idCategory));
        }
        
    }, [dispatchProduct, dispatchCategory, dispatch, idCategory]);

    const handleC = (e) => {
        setIdCategory(e.target.value);
    }
    const ListItem = () => {
        return (
            <tr>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
            </tr>
        ); 
    }
  return (
    // <div className="row flex-lg-nowrap">
    //     <div className="col mb-3">
            <div className="e-panel cardcus" style={{width:"100%"}}>
                <div className="card-body">
                    <div className="text-center card-title">
                        <h3 className="mr-2">Products Manage</h3>
                        <header class="mb-3">
                                <div class="form-inline">
                                    <button className="button-2 mr-auto" type="button" onClick={toggleCreate}>New Product</button>
                                    <select class="form-control mt-2" value={idCategory}
                                        onChange={handleC} >
                                        <option value="0">All</option>
                                        {categories&&categories.map((item,index)=>(
                                            <>
                                                {item.status!=="0"&&(<option key={index} value={item.id}>{item.name}</option>)}
                                            </>
                                        ))};

                                    </select>
                                    <input type="hidden" name="paged" value="1" />
                                </div>
                            </header>
                        {/* <div className="text-center" style={{width:"125px"}}>
                            <button className="btn btn-success btn-block" type="button" onClick={toggleCreate}>New Product</button>
                            <form className="ordering" style={{width:"125px"}}>
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
                        </div> */}
                    </div>
                    
                
                    <div className="e-table">
                        <div className="table-responsive table-lg mt-3">
                            <table className="table table-bordered table-hover">
                                <thead align="center">
                                    <tr>
                                        {/* <th>Id</th> */}
                                        <th>Name</th>
                                        <th>Decription</th>
                                        <th>Price</th>   
                                        <th className="sortable">Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                        <tbody align="center">
                                            <ListItem/>
                                            <ListItem/>
                                            <ListItem/>
                                            <ListItem/>
                                            <ListItem/>
                                        </tbody>
                                    ) : error ? (
                                        <tfoot align="center">
                                            <tr>
                                            <th colspan="5">
                                            <Message variant="alert-danger">{error}</Message>
                                            </th>
                                            </tr>
                                        </tfoot>
                                    ) : (
                                <tbody align="center">
                                {products&&products.map((product, index)  => (
                                    <tr onClick={()=>{toggle(product.id);toggleName(product.name)}}>
                                        {/* <td className="align-middle">{product.id}</td> */}
                                        <td className="text-nowrap align-middle">{product.name}</td>
                                        <td className="align-middle" style={{width:400,wordBreak:"break-word"}}>
                                            {product.description}
                                        </td>
                                        <td className="text-nowrap align-middle">$ {product.price}</td>
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
                                                <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={()=>{toggle(product.id);toggleName(product.name)}}> 
                                                    <i className="tf-ion-edit"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={(e)=>{e.stopPropagation();toggleSize(product.id);toggleName(product.name)}}> 
                                                    <i className="tf-ion-levels"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={(e)=>{e.stopPropagation();toggleImage(product.id);toggleName(product.name)}}> 
                                                    <i className="tf-ion-image"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>)}
                            </table>
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
            idCategory={idCategory}
            name={nameProduct}
        />
        <ImageProduct
            isShowing={isShowingImage}
            hide={toggleImage}
            id={idd}
            name={nameProduct}
        />
        <SizeModal
            isShowing={isShowingSize}
            hide={toggleSize}
            id={idSize}
            name={nameProduct}
        />
    </div>
    
  )
}

export default ProductMain
