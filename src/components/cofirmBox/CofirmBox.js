import React, { useState } from 'react'
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
    if(!isShowing) return null;
  return (
    <>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} txtrole="dialog">
        <div className="modal-dialog modal-lg" style={{width:400}}>
            <div className="modal-content">
                <div className="modal-header">				
                    <h4 className="modal-title text-center">Confirm Box</h4>	
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={noHandle}>&times;</button>
                </div>
                <div className="modal-body text-center">
                    <div className="py-1">
                        <p>Do you really want to do it?</p>
                    </div>
                </div>
                <div className="modal-footer" style={{justifyContent: "center"}}>
                    <button type="button" className="button-2" style={{
                                                                        border: "1px solid #ff4d4d",
                                                                        background: isHoveringNo ? '#ff4d4d' : 'white',
                                                                        color: isHoveringNo ? 'white' : '#ff4d4d',
                                                                    }} 
                                                                onMouseEnter={handleMouseEnterNo}
                                                                onMouseLeave={handleMouseLeaveNo} 
                                                                data-dismiss="modal" 
                                                                onClick={()=>{setIsHoveringNo(true);noHandle()}}>No</button>
                    <button type="button" className="button-2" style={{
                                                                        border: "1px solid #00ff55",
                                                                        background: isHoveringYes ? '#00ff55' : 'white',
                                                                        color: isHoveringYes ? 'white' : '#00ff55',
                                                                    }} 
                                                                onMouseEnter={handleMouseEnterYes}
                                                                onMouseLeave={handleMouseLeaveYes} 
                                                                onClick={()=>{setIsHoveringYes(true); yesHanle(); noHandle();}}>Yes</button>
                </div>
            </div>
        </div>
    </div>
</>
   
  )
}

export default CofirmBox
