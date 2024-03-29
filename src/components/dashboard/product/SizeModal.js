import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSizes, createSizeByProductId, updateSize, deleteSize, getSizeById } from '../../../redux/actions/SizeAction'
import {
    SIZE_CREATE_RESET,
    SIZE_UPDATE_RESET,
    SIZE_DETAILS_STOP,
} from '../../../redux/constants/Constants'
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import Input from '../../checkValidate/Input'
import Radio from '../../checkValidate/Radio'
import Select from '../../checkValidate/Select'
import CofirmBox from "../../cofirmBox/CofirmBox";
import useModal from "../useModal";
const SizeModal = ({isShowing, hide, id, name}) => {
    const [form, setForm] = useState({
        idSize: '',
        size: '',
        amount: '',
      });
    const {isShowing:isShowConfirmBox, toggle:toggleConfirmBox, id: idSize} = useModal();
    const [isOpen,setIsOpen]=useState(false)
    const [isAdd,setIsAdd]=useState(false)
    const [edit,setEdit]=useState(false)
    const dispatch = useDispatch();
    const sizeList = useSelector((state) => state.sizeList);
    const { loading, error, sizes} = sizeList;
    const sizeCreate = useSelector((state) => state.sizeCreate);
    const { success: succsesCreate} = sizeCreate;
    const sizeUpdate = useSelector((state) => state.sizeUpdate);
    const { success: succsesUpdate} = sizeUpdate;
    const sizeDetail = useSelector((state) => state.sizeDetail);
    const { size } = sizeDetail;
    const sizeL = [
        {
            value: "3.5",
            label: "3.5 UK"
        },
        {
            value: "4",
            label: "4 UK"
        },
        {
            value: "4.5",
            label: "4.5 UK"
        },
        {
            value: "5",
            label: "5 UK"
        },
        {
            value: "5.5",
            label: "5.5 UK"
        },
        {
            value: "6",
            label: "6 UK"
        },
        {
            value: "6.5",
            label: "6.5 UK"
        },
        {
            value: "7",
            label: "7 UK"
        },
        {
            value: "7.5",
            label: "7.5 UK"
        },
    ];
    useEffect(() => {
        setForm({})
        if(succsesCreate){
            dispatch({type: SIZE_CREATE_RESET});
            dispatch(getAllSizes({id}));
        } else if (succsesUpdate){
            dispatch({type: SIZE_UPDATE_RESET});
            dispatch(getAllSizes({id}));
            setIsOpen(false)
        } else {
            if (isShowing&&!isOpen) {
                dispatch(getAllSizes({id}));
            }else if (isOpen&&size&&size.id!==form.idSize){
                setForm({
                    idSize:size.id,
                    size: size.size,
                    amount:size.amount,
                })
            }
        }
        if(!isShowing){
            setIsOpen(false)
            setForm({
                idSize:'',
                size:'',
                amount:'',
            })
            setErrorInput({
                size: {
                    isReq: true,
                    errorMsg: '',
                    onValidateFunc: onInputValidate
                },
                amount: {
                    isReq: true,
                    reqType: 'NUMBER',
                    errorMsg: '',
                    onValidateFunc: onInputValidate
                }
            })
        }
        // if (isOpen&&size&&size.id!==form.idSize){
        //     setForm({
        //         idSize:size.id,
        //         size:size.size,
        //         amount:size.amount,
        //     })
        // }
        
        // if(isShowing){
        //     dispatch(getAllSizes({id}));
        // }
    }, [dispatch,id,succsesCreate,succsesUpdate,size]);

    const onInputValidate = (value, name) => {
        setErrorInput(prev => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }));
        }
         
    const [errorInput, setErrorInput] = useState({
        size: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        amount: {
            isReq: true,
            reqType: 'NUMBER',
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
    });
         
    const onSelectChange = useCallback((label, value, name) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const onInputChange = useCallback((value, name) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);
        
    const validateForm = () => {
        let isInvalid = false;
        Object.keys(errorInput).forEach(x => {
            const errObj = errorInput[x];
            if (errObj.errorMsg) {
                isInvalid = true;
            } else if (errObj.isReq && (Array.isArray(form[x]) ? !form[x].length : !form[x]) /*!form[x]*/) {
                isInvalid = true;
                onInputValidate(true, x);
            }
        });
        return !isInvalid;
    }

    const submitHandler = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(createSizeByProductId({id,form}));
        }
    };

    const editHandler = (itemId) => {
        setIsOpen(true)
        setIsAdd(true)
        dispatch(getSizeById({itemId}))
    }
    const deleteHandler = () => {
        dispatch(deleteSize({idSize}));
    }
    const handleCancel = () => {
        setIsOpen(false)
        setIsAdd(false)
        setForm({})
    }
    const handleOnSubmit = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(updateSize({form}))
        }
        setIsOpen(false)
        setIsAdd(false)
    }
    const handleOnAdd = () => {
        setIsAdd(true)
    }
    const [isHoveringNo, setIsHoveringNo] = useState(true);
    const [isHoveringYes, setIsHoveringYes] = useState(true);
    const handleMouseEnterNo = () => {
        setIsHoveringNo(false);
    };

    const handleMouseLeaveNo = () => {
        setIsHoveringNo(true);
    };

    const handleMouseEnterYes = () => {
        setIsHoveringYes(false);
    };

    const handleMouseLeaveYes = () => {
        setIsHoveringYes(true);
    };
    if(!isShowing)return null;
    return (
    <>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} txtrole="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="col px-xl-3">
                            <h5 className="modal-title">Sizes Of {name}</h5>
                            {/* <button className="btn btn-primary cloudinary-button" type="submit" id="upload_widget" onClick={()=>handleOpenWiget()}>Add Image</button> */}
                        </div>
                        <button type="button" className="close" data-dismiss="modal" onClick={hide}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    {/* <ImageUploader isOpen={isOpen} isCreate={isCreate} imageId={imageId} id={id} hide={handleOpenWiget}/> */}
                    <div className="modal-body">
                        <div className="py-1 ">
                            <div className="form" novalidate="">
                            {!isAdd?
                            <button className="button-2 mr-auto" type="button" onClick={handleOnAdd}>Add Size</button>:
                            !isOpen&&
                            <button type="button" className="button-2" style={{
                                                                        border: "1px solid #ff4d4d",
                                                                        background: isHoveringNo ? '#ff4d4d' : 'white',
                                                                        color: isHoveringNo ? 'white' : '#ff4d4d',
                                                                    }} 
                                                                onMouseEnter={handleMouseEnterNo}
                                                                onMouseLeave={handleMouseLeaveNo} 
                                                                data-dismiss="modal" 
                                                                onClick={()=>{setIsHoveringNo(true);setIsAdd(false)}}>Cancel Add</button>}
                            {isAdd&&<div className="row">   
                                <div className="col">
                                    <div className="row">
                                         <div className="col">
                                            <Select
                                                name="size"
                                                title="Size"
                                                value={form.size}
                                                options={sizeL}
                                                onChangeFunc={onSelectChange}
                                                {...errorInput.size}
                                            />
                                        </div>
                                       <div className="col">
                                            <Input
                                                name="amount"
                                                title="Amount"
                                                value={form.amount}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.amount}
                                            />
                                        </div>
                                    </div>
                                    </div>
                                </div>}
                                <div className="col text-center px-xl-3">
                                {isOpen&&isOpen?
                                    <div className="d-flex text-white justify-content-center">
                                        <div className="btn-group">
                                        <button 
                                            onClick={handleCancel}
                                            type="button" className="btn btn-danger">Cancel</button>
                                    <button 
                                        onClick={handleOnSubmit}
                                        type="button" className="btn btn-success">Save</button>
                                    </div>
                                    </div>
                                    : isAdd&&
                                    <button className="btn btn-primary btn-block" type="submit" onClick={submitHandler}>Save Create</button>  
                                }
                                    </div>
                            </div>
                        <div className="">

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
                                        
                                        <th>Size</th>
                                        <th>Amount</th>  
                                        {/* <th className="sortable">Status</th> */}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {sizes&&sizes.sort((a,b)=>Number(a.size)-Number(b.size)).map((item, index)  => (
                                    <tr>
                                        <td className="align-middle">{item.size}</td>
                                        <td className="text-nowrap align-middle">{item.amount}</td>
                                        {/* <td className="text-nowrap align-middle">
                                            {product.status ==="1" ? <Status check="checked" /> : <Status check=""/>}
                                        </td> */}
                                        {/* {product.status ==="0" ? (
                                                <td className="text-nowrap align-middle" style={{color:"red"}}>Inactive</td>
                                            ):(
                                                <td className="align-middle" style={{color:"green"}}>Active</td>
                                            )} */}
                                        <td className="text-center align-middle">
                                            <div className="btn-group align-top">
                                                <button 
                                                    onClick={()=>editHandler(item.id)}
                                                    className="btn btn-sm btn-outline-secondary badge" type="button"> 
                                                    <i className="tf-ion-edit"></i>
                                                </button>
                                                <button 
                                                    onClick={()=>toggleConfirmBox(item.id)}
                                                    className="btn btn-sm btn-outline-secondary badge" type="button"> 
                                                    <i className="tf-ion-android-delete"></i>
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
                        </div>
                        
                    </div>
                </div>
            </div>
            <CofirmBox 
                isShowing={isShowConfirmBox}
                noHandle={toggleConfirmBox}
                yesHanle={deleteHandler}
            />
        </div>
    </>
  )
}

export default SizeModal
