import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [isShowingImage, setIsShowingImage] = useState(false);
  const [id, setId] = useState("");
  const [idd, setIdd] = useState("");
  const toggle = (_id) => {
    setIsShowing(!isShowing);
    setId(_id);
  }
  const toggleImage = (_id) => {
    setIsShowingImage(!isShowingImage);
    setIdd(_id);
  }
  return {
    isShowing,
    isShowingImage,
    toggle,
    toggleImage,
    id,
    idd
  }
};

export default useModal