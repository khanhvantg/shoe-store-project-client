import React, { useState, useEffect } from "react";
import '../Modal.scss';
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getProductById, getAllProducts} from '../../../redux/actions/ProductAction'
import { getAllcategories, getCategoryById, stopGetCategory } from '../../../redux/actions/CategoryAction'
import {
    PRODUCT_UPDATE_RESET,
} from '../../../redux/constants/Constants'

import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
const ProductUpdate = ({isShowing, hide, id, idCategory}) => {
    //const [accountId,setAccountId] = useState({id});

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [modifiedBy, setModifedBy] = useState(userInfo.username);
    const [modifiedDate, setModifiedDate] = useState("");

    //const {modifiedBy} = localStorage.getItem("userInfo").username;
    var today = new Date();

    // const {modifiedDate} = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dispatch = useDispatch();
    const dispatchCategory = useDispatch();
    const productDetail = useSelector((state) => state.productDetail);
    const { loading, error, product} = productDetail;
    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    useEffect(() => {
        setName("");
        setPrice("");
        setAmount("")
        setCreatedBy("")
        setCreatedDate("");
        setDescription("");
        setStatus("");
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch(getAllProducts());
            dispatchCategory(getCategoryById(idCategory))
        } else {
            if (isShowing&&product.id!==id) {
                dispatch(getProductById(id));
            }else if (isShowing){
                setModifiedDate(today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
                setName(product.name);
                setPrice(product.price);
                setAmount(product.amount)
                setCreatedBy(product.createdBy)
                setCreatedDate(product.createdDate);
                setDescription(product.description);
                setStatus(product.status);
                //console.log(description)
            }
        }
    }, [product, dispatch, dispatchCategory, id, successUpdate, idCategory]);
    
    const productInfo = {
        productId: id,
        name,
        price,
        amount,
        description,
        createdBy,
        createdDate,
        modifiedBy,
        modifiedDate,
        status
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({productInfo}));
    };

    if(!isShowing) return null;
    return (
        <>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} txtrole="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create A Category</h5>
                        <button type="button" className="close" data-dismiss="modal" onClick={hide}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-1">
                        {loading ? (
                            <Loading />
                            ) : error ? (
                                <Message variant="alert-danger">{error}</Message>
                            ) : (
                            <form className="form" novalidate="">
                                <div className="row">
                                    <div className="col">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Modifie By</label>
                                                        <input 
                                                            value={modifiedBy}
                                                            className="form-control" type="text" name="modifiedBy" disabled/>
                                                    <label>Name</label>
                                                    <input 
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="form-control" type="text" name="name" placeholder/>
                                                    <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Price</label>
                                                                    <input 
                                                                        value={price}
                                                                        onChange={(e) => setPrice(e.target.value)}
                                                                        className="form-control" type="text" name="price" placeholder/>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Amount</label>
                                                                    <input 
                                                                        value={amount}
                                                                        onChange={(e) => setAmount(e.target.value)}
                                                                        className="form-control" type="text" name="gender" placeholder/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    <label>Description</label>
                                                        <input 
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            className="form-control" type="text" name="description" placeholder/>
                                                    <label>Status</label>
                                                        <input 
                                                        value={status}
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        className="form-control" type="text" name="status" placeholder/>                
                                                </div>
                                            </div>
                                        </div> 
                                </div>
                                <div className="col text-center px-xl-3">
                                    <button className="btn btn-primary btn-block" type="submit" onClick={submitHandler}>Save Changes</button>
                                </div>
                            </form>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default ProductUpdate
