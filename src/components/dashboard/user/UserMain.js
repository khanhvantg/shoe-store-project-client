import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../../../redux/actions/UserAction'
import Status from '../../status/Status'
import UserUpdate from "./UserUpdate";
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';

const UserMain = () => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [checked,setChecked]=useState();
    const {isShowing, toggle, id} = useModal();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users} = userList;

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        // <div className="row flex-lg-nowrap">
        //     <div className="col mb-3">
                <div className="e-panel card">
                    <div className="card-body">
                        <div className="text-center card-title">
                            <h3 className="mr-2">Users Manage</h3>
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
                                            <th >Name</th>
                                            <th>Age</th>
                                            <th>Gender</th>
                                            <th>Address</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Type</th>
                                            <th className="sortable">Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { users && users.sort((a,b)=>(a.id-b.id)).map((user, index) => (
                                        <tr>
                                            <td className="align-middle">{user.id}</td>
                                            <td className="text-nowrap align-middle">{user.name}</td>
                                            <td className="text-nowrap align-middle">{user.age}</td>
                                            <td className="text-nowrap align-middle">{user.gender}</td>
                                            <td className="text-nowrap align-middle">{user.address}</td>
                                            <td className="text-nowrap align-middle">{user.phone}</td>
                                            <td className="text-nowrap align-middle">{user.email}</td>
                                            {user.type ==="1" ? (
                                                <td className="align-middle" style={{color:"gold"}}>Vip</td>
                                            ):(
                                                <td className="text-nowrap align-middle" style={{color:"blue"}}>Normal</td>
                                            )}
                                            {user.status ==="0" ? (
                                                <td className="text-nowrap align-middle" style={{color:"red"}}>Inactive</td>
                                            ):(
                                                <td className="align-middle" style={{color:"green"}}>Active</td>
                                            )}
                                            {/* <td className="text-nowrap align-middle">{user.type}</td> */}
                                            {/* <td className="text-nowrap align-middle">
                                                {user.status ==="1" ? <Status check="checked" /> : <Status check=""/>}
                                            </td> */}
                                            <td className="text-center align-middle">
                                                <div className="btn-group align-top">
                                                    <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={()=>{toggle(user.id)}}> 
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
            <UserUpdate 
                isShowing={isShowing}
                hide={toggle}
                id={id}/>
        </div>
    )
}

export default UserMain
