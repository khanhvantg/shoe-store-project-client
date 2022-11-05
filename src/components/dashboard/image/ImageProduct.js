import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllImages, createImageByProductId, updateImage } from '../../../redux/actions/ImageAction'
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import ImageUploader from './image-uploader';
const ImageProduct = ({isShowing, hide, id}) => {
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

    if(!isShowing)return null;
    return (
    <>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} txtrole="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="col px-xl-3">
                            <h5 className="modal-title">Images Of Product</h5>
                            <button className="btn btn-primary cloudinary-button" type="submit" id="upload_widget" onClick={()=>handleOpenWiget()}>Add Image</button>
                        </div>
                        <button type="button" className="close" data-dismiss="modal" onClick={hide}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <ImageUploader isOpen={isOpen} isCreate={isCreate} imageId={imageId} id={id} hide={handleOpenWiget}/>
                    <div className="modal-body">
                        <div className="py-1 ">
                            <div class="container">
                            {loading ? (
                                <Loading />
                                ) : error ? (
                                    <Message variant="alert-danger">{error}</Message>
                                ) : (
                                <div class="row">
                                    {images&&images.map((item,index)=>(
                                        <div class="col-lg-3 mx-auto d-block" >
                                            <img src={item.link} alt="" class="img-thumbnail mx-auto d-block"/>
                                            <button className="btn btn-sm btn-outline-secondary mx-auto d-block " type="button" onClick={()=>{handleEditImg(item.id)}}> 
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
