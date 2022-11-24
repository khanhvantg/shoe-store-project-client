import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllcategories } from '../../../redux/actions/CategoryAction'
import Status from '../../status/Status'
import CategoryUpdate from "./CategoryUpdate";
import CategoryCreate from "./CategoryCreate";
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';
import useModalCreate from '../useModalCreate';
import Layout from "../../../screen/Layout";
const CategoryMain = () => {
    const dispatch = useDispatch();
    const {isShowingCreate, toggleCreate} = useModalCreate();
    const {isShowing, toggle, id} = useModal();
    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories} = categoryList;
    //categories.sort((a,b)=>(a.id-b.id));
    useEffect(() => {
        dispatch(getAllcategories());
    }, [dispatch]);

    console.log(categories)
    return (
        // <div className="row flex-lg-nowrap">
        //     <div className="col mb-3">
                <div className="e-panel card">
                    <div className="card-body">
                        <div className="text-center card-title">
                            <h3 className="mr-2">Categories Manage</h3>
                        </div>
                        <div className="text-center px-xl-3">
                            <button className="btn btn-success btn-block" type="button" onClick={toggleCreate}>New Category</button>
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
                                            <th>Description</th>
                                            <th>Create By</th>
                                            <th>Create Date</th>
                                            <th>Modified By</th>
                                            <th>Modified Date</th>
                                            <th className="sortable">Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { categories && categories.map((category, index) => (
                                        <tr>
                                            <td className="align-middle">{category.id}</td>
                                            <td className="text-nowrap align-middle">{category.name}</td>
                                            <td className="text-nowrap align-middle" style={{wordBreak:"break-word"}}>{category.description}</td>
                                            <td className="text-nowrap align-middle">{category.createdBy}</td>
                                            <td className="text-nowrap align-middle">{category.createdDate}</td>
                                            <td className="text-nowrap align-middle">{category.modifiedBy}</td>
                                            <td className="text-nowrap align-middle">{category.modifiedDate}</td>
                                            {/* <td className="text-nowrap align-middle">
                                                {category.status ==="1" ? <Status check="checked" /> : <Status check=""/>}
                                            </td> */}
                                            {category.status ==="0" ? (
                                                <td className="text-nowrap align-middle" style={{color:"red"}}>Inactive</td>
                                            ):(
                                                <td className="align-middle" style={{color:"green"}}>Active</td>
                                            )}
                                            <td className="text-center align-middle">
                                                <div className="btn-group align-top">
                                                    <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={()=>{toggle(category.id)}}> 
                                                        <i className="tf-ion-edit"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>)}
                            </div>
                        </div>
                    </div>
                {/* </div>
            </div> */}
            <CategoryCreate
                    isShowing={isShowingCreate}
                    hide={toggleCreate}/>
                <CategoryUpdate
                    isShowing={isShowing}
                    hide={toggle}
                    id={id}/>    
        </div>
    )
}

export default CategoryMain
