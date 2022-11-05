import React from "react";

import { toast } from "react-toastify";
const Toast = (message) => {

  const show = () => {
    toast(message, {position: toast.POSITION.TOP_CENTER});
    console.log("aaaa")
  }
  return (
    <>
      {show.call}
    </>
  );
};

export default Toast;
