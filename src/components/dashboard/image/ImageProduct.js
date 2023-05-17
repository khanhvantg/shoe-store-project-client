import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllImages, createImageByProductId, updateImage } from '../../../redux/actions/ImageAction'
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import ImageUploader from './image-uploader';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ImageProduct = ({isShowing, hide, id, name}) => {
    const dispatch = useDispatch();
    const imageList = useSelector((state) => state.imageList);
    const { loading, error, images} = imageList;
    const productDetail = useSelector((state) => state.productDetail);
    const {product} = productDetail;
    const [isOpen, setIsOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [imageId, setImageId] = useState("");
    const handleEditImg = (imageId) =>{
        setImageId(imageId);
        setIsOpen(true);
        setIsCreate(false);
    }
    // const toggleImage = (_id) => {
    //     setIsOpen(false);
    // }
    const [link,setLink]=useState();
    const handleOpenWiget = () => {
        if(isOpen===false)
            setIsOpen(true);
        else setIsOpen(false);
        setIsCreate(true);
    }
    useEffect(() => {
        if(isShowing){
            dispatch(getAllImages({id}));
        }
    }, [dispatch,id,product]);
    const ListItem = () => {
        return (
            <div className="col-lg-3 mx-auto d-block" >
                <div className="img-thumbnail mx-auto d-block" style={{borderRadius: "0px", border: "none"}}>
                    <Skeleton className="w-100 border img-load3"/>
                </div>
                <div className="mt-1 w-25 mx-auto"> 
                    <Skeleton/>
                </div>
                <br></br>
            </div>
                    
        );
      }

    if(!isShowing)return null;
    return (
    <>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} txtrole="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="col px-xl-3">
                            <h5 className="modal-title">Images Of {name}</h5>
                            <button className="button-2" type="submit" id="upload_widget" onClick={()=>handleOpenWiget()}>Add Image</button>
                        </div>
                        <button type="button" className="close" data-dismiss="modal" onClick={hide}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <ImageUploader isOpen={isOpen} isCreate={isCreate} imageId={imageId} id={id} hide={handleOpenWiget}/>
                    <div className="modal-body">
                        <div className="py-1 ">
                            <div className="container">
                            {loading ? (
                                <div className="row">
                                    <ListItem />
                                    <ListItem />
                                    <ListItem />
                                </div>
                                ) : error ? (
                                    <Message variant="alert-danger">{error}</Message>
                                ) : (
                                <div className="row">
                                    {images&&images.map((item,index)=>(
                                        <div className="col-lg-3 mx-auto d-block" >
                                            <img src={item.link} alt="" className="img-thumbnail mx-auto d-block" style={{borderRadius: "0px"}}/>
                                            <button className="btn btn-sm btn-outline-secondary mx-auto d-block mt-1" type="button" onClick={()=>{handleEditImg(item.id)}}> 
                                                <i className="tf-ion-edit"></i>
                                            </button>
                                            <br></br>
                                        </div>
                                    ))}         
                                </div>)}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ImageProduct
