import { useState } from 'react';

const useModalCreate = () => {
  const [isShowingCreate, setIsShowingCreate] = useState(false);
  const [id, setId] = useState("");
  const toggleCreate = () => {
    setIsShowingCreate(!isShowingCreate);
  }
  return {
    isShowingCreate,
    toggleCreate
  }
};

export default useModalCreate