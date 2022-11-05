import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [id, setId] = useState("");
  const toggle = (_id) => {
    setIsShowing(!isShowing);
    setId(_id);
  }
  return {
    isShowing,
    toggle,
    id
  }
};

export default useModal