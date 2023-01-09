import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { CommonContext } from "../App";

function Status() {
  let commonContext = useContext(CommonContext);

  let [data, setData] = useState(null);
  let [ticket, setTicket] = useState("");

  let handleLoadTicket = async () => {
    let res = await axios.get(`${commonContext.apiurl}/issues/${ticket}`);
    if (res.data.statusCode === 200) {
      setData(res.data.issue[0]);
    }
  };

  return (
    <div className="wrapper-status col-5 mx-auto">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Ticket Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ticket number"
            onChange={(e) => setTicket(e.target.value)}
          />
        </Form.Group>

        <div style={{"textAlign":"center"}}>
          <Button variant="primary" onClick={() => handleLoadTicket()}>
            Submit
          </Button>
        </div>
      </Form>
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
              <b>Comments:</b> {data.comments}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Status;