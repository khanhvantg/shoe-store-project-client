import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../../../redux/actions/UserAction'
import Status from '../../status/Status'
import UserUpdate from "./UserUpdate";
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Paginations from "../../pagination/Paginations";
import { Link, useNavigate, useParams, useSearchParams  } from "react-router-dom";
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

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(searchParams.get('page'));
    let LIMIT = 8;
    let NUM_OF_RECORDS = users&&users.length;
    const onPageChanged = useCallback(
        (event, page) => {
            event.preventDefault();
            let search;
            if (page) {
              search = {
                // search: searchText,
                page: page
              }
            } else {
                search = undefined;

            }
            setCurrentPage(page);
            setSearchParams(search, { replace: true });
        },
        [setSearchParams]
      );
      const currentData = users&&users.sort((a,b)=>(b.id-a.id)).slice(
        (Number(currentPage) - 1) * LIMIT,
        (Number(currentPage) - 1) * LIMIT + LIMIT
    );
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
                            <h3 className="mr-2">Users Manage</h3>
                        </div>
                        <div className="e-table">
                            <div className="table-responsive table-lg mt-3">
                                <table className="table table-bordered table-hover">
                                    <thead align="center">
                                        <tr>
                                            {/* <th>Id</th> */}
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
                                            <th colspan="9">
                                            <Message variant="alert-danger">{error}</Message>
                                            </th>
                                            </tr>
                                        </tfoot>
                                    ) : (
                                    <tbody align="center">
                                    { currentData.map((user, index) => (
                                        <tr onClick={()=>{toggle(user.id)}}>
                                            {/* <td className="align-middle">{user.id}</td> */}
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
                                    </tbody>)}
                                </table>
                            </div>
                        </div>
                    </div>
                {/* </div>
            </div> */}
            <Paginations
                totalRecords={NUM_OF_RECORDS}
                pageLimit={LIMIT}
                pageNeighbours={2}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
            />
            <UserUpdate 
                isShowing={isShowing}
                hide={toggle}
                id={id}/>
        </div>
    )
}

export default UserMain
