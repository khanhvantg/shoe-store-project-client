import React from 'react'
import { updateOrder } from '../../redux/actions/OrderAction';
import { useDispatch, useSelector } from "react-redux";
const CofirmBox = ({noHandle,yesHanle,isShowing}) => {
    //const dispatch = useDispatch();
    // const handleCancel = () => {
    //     const orderInfo = {
    //         orderId:id,
    //         status:0
    //     }
    //     //setIsShowConfirmBox(true)
    //     dispatch(updateOrder({orderInfo}));
    // }
    if(!isShowing) return null;
  return (
    <>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} txtrole="dialog">
        <div className="modal-dialog modal-lg" style={{width:400}}>
            <div className="modal-content">
                <div class="modal-header">				
                    <h4 class="modal-title text-center">Are you sure?</h4>	
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onClick={noHandle}>&times;</button>
                </div>
                <div className="modal-body text-center">
                    <div className="py-1">
                    <p>Do you really want to do it?</p>
                    {/* {loading ? (
                        <Loading />
                        ) : error ? (
                            <Message variant="alert-danger">{error}</Message>
                        ) : ( */}
                     
                        {/* )} */}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal" onClick={noHandle}>No</button>
                    <button type="button" class="btn btn-danger" onClick={()=>{yesHanle();noHandle();}}>Yes</button>
                </div>
            </div>
        </div>
    </div>
</>
   
  )
}

export default CofirmBox
