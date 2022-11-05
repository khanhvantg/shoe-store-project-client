import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllImages, createImageByProductId, updateImage } from '../../../redux/actions/ImageAction'
import './border.scss'
const ImageUploader = ({isOpen, isCreate, imageId, id, hide}) => {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [link,setLink]=useState();
  const fileSelect = useRef(null);

  const [isOpening,setIsOpening]=useState(isOpen);
  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();
    reader.onload = function(onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  const handleCancel = () => {
    setImageSrc(null);
    isOpen=false;
  }
  const cloudName = "dhc3ajdqs";
  const uploadPreset = "f673i5u2";
  const handleOnSubmit = async (event) => {
    const url = `https://api.cloudinary.com/v1_1/dhc3ajdqs/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total));
      console.log(Math.round((e.loaded * 100.0) / e.total));
    });
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);
        if(isCreate){
          const image = {
              link: response.secure_url
          }
          dispatch(createImageByProductId({id,image}))
        }else {
          const image = {
              link: response.secure_url
          }
          dispatch(updateImage({id,imageId,image}))
        }
        console.log(response.secure_url);
      }
    };

    fd.append(
      "upload_preset",
      uploadPreset
    );
    fd.append("tags", "browser_upload");
    fd.append("file", imageSrc);
    xhr.send(fd);
    setImageSrc(null);
  }
 const [progress, setProgress] = useState(0);
  const handleImageUpload = async () => {
    if (fileSelect) {
      fileSelect.current.click();
    }
  }
  if(!isOpen)return null
  return (
    <div>
      {imageSrc  ? (
       <div className="container">
         <img className="border-scss mx-auto d-block"
             src={imageSrc}
             style={{ height: 400, width: 312 }}
         />
         <div className="d-flex text-white justify-content-center">
             <div className="btn-group">
             <button 
                 onClick={handleCancel}
                 type="button" class="btn btn-danger">Cancel</button>
           <button 
               onClick={handleOnSubmit}
               type="button" class="btn btn-success">Save</button>
         </div>
             </div>
       </div>
     ) : (
       <div
         className="border-scss mx-auto d-block rounded-lg"
         style={{ height: 400, width: 312}}>
           <button type="button" className="close" onClick={hide}>
                            <span aria-hidden="true">×</span>
          </button>
         <form className="d-flex text-white justify-content-center align-self-center">
           <div className="rowalign-self-center">
           <button
                 onClick={handleImageUpload}
                 className="btn btn-primary btn-click-brown" type="button">Browse</button>
           </div>
           <input
             ref={fileSelect}
             type="file"
             name="file"
             accept="image/*"
             style={{ display: "none" }}
             onChange={handleOnChange}
           />
         </form>
       </div>
     )}
   </div>
)
}
export default ImageUploader