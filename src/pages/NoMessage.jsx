import React from "react";

import nomessage from "../assets/nomessage.gif";

function NoMessage() {
  return (
    <div className="h-100  d-flex flex-column align-items-center justify-content-center">
      <img src={nomessage} alt="" style={{ height: 200, width: 300 }} />
      <h4 className="mt-4 text-muted fw-bold">No Message Selected!</h4>
    </div>
  );
}

export default NoMessage;
