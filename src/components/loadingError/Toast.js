import React from "react";

import { toast } from "react-toastify";
const Toast = (message) => {

  const show = () => {
    toast(message, {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 1500});
  }
  return (
    <>
      {show.call}
    </>
  );
};

export default Toast;
