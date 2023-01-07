import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { CommonContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

function Issues() {
  let commonContext = useContext(CommonContext);

  let params = useParams();

  let [data, setData] = useState(null);

  let [comment, setComment] = useState("");

  let navigate = useNavigate();

  let handleLoadTicket = async () => {
    let res = await axios.get(`${commonContext.apiurl}/issues/${params.id}`);
    if (res.data.statusCode === 200) {
      setData(res.data.issue[0]);
      setComment(res.data.issue[0].comments);
    }
  };

  useEffect(() => {
    handleLoadTicket();
  }, []);

  let nextStage = async(stage) => {
    let res = await axios.put(`${commonContext.apiurl}/change-status/${params.id}`, {comments: comment});
    if(res.data.statusCode === 200){
      navigate("/dashboard")
    }
  };

  return (
    <div className="wrapper-status col-5 mx-auto">
      {data !== null ? (
        <>
          <div style={{ textAlign: "left", paddingTop: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Welcome to Zen Desk</h2>
            <h5>Issue Title: {data.issueTitle} </h5>
            <div>
              <b>Issue Type:</b> {data.issueType}
            </div>
            <div>
              <b>Issue Description:</b> {data.issueDescription}
            </div>
            <div>
              <b>Status:</b>&nbsp;
              <span
                style={
                  data.status === "Open"
                    ? { color: "red" }
                    : data.status === "In Progress"
                    ? { color: "orange" }
                    : { color: "green" }
                }
              >
                {data.status}
              </span>
            </div>

            <div>
              <b>Created Date:</b> {data.createdAt}
            </div>
            {data.status === "In Progress" || data.status === "Closed" ? (
              <div>
                <b>Opened Date:</b> {data.inProgressDate}
              </div>
            ) : (
              <></>
            )}
            {data.status === "Closed" ? (
              <div>
                <b>Closed Date:</b> {data.closedDate}
              </div>
            ) : (
              <></>
            )}
            <div>
              <b>Comments:</b> <input type={"textArea"} value={comment} onChange={(e)=>{setComment(e.target.value)}} ></input>
            </div>
            <br></br>
            <Button
              variant="primary"
              onClick={() => {
                navigate(`/dashboard`);
              }}
            >
              Go Back to Dashboard
            </Button> &nbsp;

            {data.status === "Open" ? (
              <Button variant="warning" onClick={()=>{nextStage()}}>In Progress</Button>
            ) : data.status === "In Progress" ? (
              <Button variant="success" onClick={()=>{nextStage()}}>Close</Button>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Issues;
