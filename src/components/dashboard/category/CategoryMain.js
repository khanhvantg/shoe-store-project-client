import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllcategories } from '../../../redux/actions/CategoryAction'
import CategoryUpdate from "./CategoryUpdate";
import CategoryCreate from "./CategoryCreate";
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';
import useModalCreate from '../useModalCreate';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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

    const ListItem = () => {
        return (
            <tr>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
            </tr>
        ); 
    }

    return (
                <div className="card-body">
                    <div className="text-center card-title">
                        <h3 className="mr-2">Categories Manage</h3>
                    </div>
                    <button className="button-2" style={{marginBottom: "5px"}} type="button" onClick={toggleCreate}>New Category</button>
                    <div className="e-table">
                        <div className="table-responsive table-lg mt-3">
                            <table className="table table-bordered table-hover">
                                <thead align="center">
                                    <tr>
                                        {/* <th>Id</th> */}
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
                                            <th colspan="8">
                                            <Message variant="alert-danger">{error}</Message>
                                            </th>
                                            </tr>
                                        </tfoot>
                                    ) : (
                                <tbody align="center">
                                { categories && categories.sort((a,b)=>(b.id-a.id)).map((category, index) => (
                                    <tr onClick={()=>{toggle(category.id)}}>
                                        {/* <td className="align-middle">{category.id}</td> */}
                                        <td className="text-nowrap align-middle">{category.name}</td>
                                        <td className="align-middle" style={{width:400,wordBreak:"break-word"}}>{category.description}</td>
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
                                </tbody>)}
                            </table>
                        </div>
                    </div>
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
