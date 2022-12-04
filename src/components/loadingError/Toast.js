import React from "react";

import { toast } from "react-toastify";
const Toast = (message) => {

  const show = () => {
    toast(message, {position: toast.POSITION.TOP_CENTER});
  }
  return (
    <>
      {show.call}
    </>
  );
};

export default Toast;
