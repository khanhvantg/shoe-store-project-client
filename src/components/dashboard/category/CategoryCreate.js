import React, { useState, useEffect } from "react";
import '../Modal.scss'

import { useDispatch, useSelector } from "react-redux";
import { updateCategory, getCategoryById, getAllcategories, creatCategory} from '../../../redux/actions/CategoryAction'
import {
    CATEGORY_CREATE_RESET,
} from '../../../redux/constants/Constants'

import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
const CategoryCreate = ({isShowing, hide}) => {
    //const [accountId,setAccountId] = useState({id});

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [createdBy, setCreatedBy] = useState(userInfo.username);
    const [createdDate,setCreatedDate] =useState("");
    const [modifiedBy, setModifiedBy] = useState("");
    const [modifiedDate, setModifiedDate] = useState("");
    const [status, setStatus] = useState("");
    
    const dispatch = useDispatch();

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: succsesCreate,
    } = categoryCreate;
    
    var today = new Date();
    useEffect(() => {
        if (succsesCreate) {
            dispatch({type: CATEGORY_CREATE_RESET});
            dispatch(getAllcategories());
        }else if(isShowing){
            setCreatedDate(today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
        }
    }, [dispatch, succsesCreate]);

    const categoryInfo = {
        name,
        description,
        createdBy,
        createdDate,
        modifiedBy,
        modifiedDate,
        status
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(creatCategory({categoryInfo}));
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
                            <form className="form" novalidate="">
                                <div className="row">
                                    <div className="col">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Created By</label>
                                                        <input 
                                                            value={createdBy}
                                                            className="form-control" type="text" name="createdBy" disabled/>
                                                    <label>Name</label>
                                                    <input 
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="form-control" type="text" name="name" placeholder/>
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
export default CategoryCreate