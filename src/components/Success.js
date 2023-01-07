import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function Success() {
  let params = useParams();

  let [toggle, setToggle] = useState(false);

  let handleCopy = () => {
    setToggle(true);
    navigator.clipboard.writeText(params.id);
    setTimeout(() => {
      setToggle(false);
    }, 1000);
  };

  return (
    <div className="success-wrapper">
      <CheckCircleOutlineIcon sx={{ fontSize: 90 }} />
      <h1>Success</h1>
      <p>
        Your Ticket is {params.id}&nbsp;
        <span onClick={() => handleCopy()} className="copy">
          <ContentCopyIcon />
          {toggle ? <span>Copied</span> : <></>}
        </span>
      </p>
      <p>
        Visit <Link to="/track-issue">here</Link> to find the status of the
        ticket
      </p>
    </div>
  );
}

export default Success;
