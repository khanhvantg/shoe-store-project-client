import React from "react";

const Loading = ({a}) => {
  return (
    <div className="d-flex justify-content-center" style={{position: "initial"}}>
      <div
        className="spinner-border"
        role="status"
        style={{ width: a===undefined?"50px":a, height: a===undefined?"50px":a, color: "#00DDEB", position: "initial"}}
      >
        {/* <span className="sr-only">Loading...</span> */}
      </div>
    </div>
  );
};

export default Loading;
