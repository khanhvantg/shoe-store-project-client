import React from "react";

const Message = ({ variant, children }) => {
  return (
    <div className="d-flex justify-content-center col-12" style={{position: "initial"}}>
      <div className={`alert ${variant}`} style={{position: "initial"}}>{children}</div>
    </div>
  );
};

Message.defaultProps = {
  variant: "alert-info",
};

export default Message;
