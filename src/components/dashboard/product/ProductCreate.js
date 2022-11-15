import React, { useState, useEffect } from "react";
import '../Modal.scss'

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, createProductByCategoryId} from '../../../redux/actions/ProductAction'

import {
    PRODUCT_CREATE_RESET,
} from '../../../redux/constants/Constants'

import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
const ProductCreate = ({isShowing, hide, categories}) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [idCategory, setIdCategory] = useState("");
    const [description, setDescription] = useState("");
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [createdBy, setCreatedBy] = useState(userInfo.username);
    const [createdDate,setCreatedDate] =useState("");
    const [modifiedBy, setModifiedBy] = useState("");
    const [modifiedDate, setModifiedDate] = useState("");
    const [status, setStatus] = useState("");
    
    const dispatch = useDispatch();

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: succsesCreate,
    } = productCreate;

    var today = new Date();
    useEffect(() => {
        setName("");
        setPrice("");
        setAmount("")
        setModifiedBy("")
        setModifiedDate("");
        setDescription("");
        setStatus("");
        if (succsesCreate) {
            dispatch({type: PRODUCT_CREATE_RESET});
            dispatch(getAllProducts());
        }else if(isShowing){
            setCreatedDate(today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
        }
    }, [dispatch, succsesCreate]);

    const productInfo = {
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

    const checkValideInput = () => {
        let isValid = true;
        const arrInput = [name,price,amount,description,status];
        const arrInput1 = ['name','price','amount','description','status'];
        if(idCategory===""){
            isValid = false;
            alert('Missing parameter: Category');
        } else {
            for(let i = 0; i < arrInput.length; i++){
                if(arrInput[i]===""){
                    isValid = false;
                    alert('Missing parameter: '+ arrInput1[i]);
                    break;
                }
            }
        }
        return isValid;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let isValid = checkValideInput();
        if(isValid){
            dispatch(createProductByCategoryId({productInfo, id:idCategory}));
        }
    };
    console.log("aaa",categories)
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
                            <form className="form" novalidate="">
                                <div className="row">
                                    <div className="col">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Create By</label>
                                                        <input 
                                                            value={createdBy}
                                                            className="form-control" type="text" name="createdBy" disabled/>
                                                    <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                <label>Name</label>
                                                                    <input 
                                                                        value={name}
                                                                        onChange={(e) => setName(e.target.value)}
                                                                        className="form-control" type="text" name="name" placeholder/>  
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Category</label>
                                                                    <form class="ordering">
                                                                        <select class="orderby form-control" value={idCategory} onChange={(e)=>setIdCategory(e.target.value)}>
                                                                            <option value="">---Select---</option>
                                                                            {categories&&categories.map((item,index)=>(
                                                                                <option value={item.id}>{item.name}</option>
                                                                            ))};
                                                                        </select>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default ProductCreate