import React, { useState, useEffect } from "react";
import '../Modal.scss'

import { useDispatch, useSelector } from "react-redux";
import { updateCategory, getCategoryById, getAllcategories} from '../../../redux/actions/CategoryAction'
import {
    CATEGORY_UPDATE_RESET,
} from '../../../redux/constants/Constants'

import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
const CategoryUpdate = ({isShowing, hide, id}) => {
    //const [accountId,setAccountId] = useState({id});

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [modifiedBy, setModifedBy] = useState(userInfo.username);
    const [modifiedDate, setModifiedDate] = useState("");
    const [status, setStatus] = useState("");
    

    //const {modifiedBy} = localStorage.getItem("userInfo").username;
    var today = new Date();

    // const {modifiedDate} = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dispatch = useDispatch();

    const categoryDetail = useSelector((state) => state.categoryDetail);
    const { loading, error, category } = categoryDetail;

    const categoryUpdate = useSelector((state) => state.categoryUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = categoryUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: CATEGORY_UPDATE_RESET});
            dispatch(getAllcategories());
        } else {
            if (isShowing&&category.id!==id) {
                dispatch(getCategoryById(id));
            }else if (isShowing){
                setModifiedDate(today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
                setName(category.name);
                setCreatedBy(category.createdBy)
                setCreatedDate(category.createDate);
                setDescription(category.description);
                setStatus(category.status);
            }
        }
    }, [category, dispatch, id, successUpdate]);
    
    const categories = {
        categoryId: id,
        description,
        createdBy,
        createdDate,
        modifiedBy,
        modifiedDate,
        status
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateCategory(categories));
    };
    if(!isShowing) return null;
    return (
        <>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} txtrole="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Account</h5>
                        <button type="button" className="close" data-dismiss="modal" onClick={hide}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-1">
                        {loading ? (
                        <Loading />
                            ) : error ?(
                                <Message variant="alert-danger">{error}</Message>
                            ) : (
                                <form className="form" novalidate="">
                                <div className="row">
                                    <div className="col">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>modified By</label>
                                                        <input 
                                                            value={modifiedBy}
                                                            className="form-control" type="text" name="modifiedBy" disabled/>
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
                                    <button className="btn btn-primary btn-block" type="submit" onClick={submitHandler,hide}>Save Changes</button>
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
export default CategoryUpdate
