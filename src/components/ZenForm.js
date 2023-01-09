import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { CommonContext } from "../App";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function ZenForm() {
  let commonContext = useContext(CommonContext);

  let [issueTypes, setIssueTypes] = useState([]);

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [mobile, setMobile] = useState("");
  let [issueType, setIssueType] = useState("");
  let [issueTitle, setIssueTitle] = useState("");
  let [issueDescription, setIssueDescription] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();

  let loadIssueTypes = async () => {
    let res = await axios.get(`${commonContext.apiurl}/issue-types`);
    if (res.data.statusCode === 200) {
      setIssueTypes(res.data.issueTypes);
      // console.log(issueTypes)
    } else {
    }
  };

  useEffect(() => {
    loadIssueTypes();
  }, []);

  let handleSubmit = async () => {
    let res = await axios.post(`${commonContext.apiurl}/issues`, {
      name,
      email,
      mobile,
      issueType,
      issueTitle,
      issueDescription,
    });
    if (res.data.statusCode === 200) {
      navigate(`/success/${res.data.issue_id}`);
    } else {
    }
  };

  return (
    <>
      <div className="wrapper-title">
        <h1>Zen Desk</h1>
        <p>Your concerns are our concerns! Drop your queries below.</p>
      </div>
      <div className="create-ticket" style={{ textAlign: "center" }}>
        <Button variant="primary" onClick={handleShow}>
          Create a Ticket
        </Button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>How can we help you?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrapper-main">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicMobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicIssue">
                <Form.Label>Issue Type</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setIssueType(e.target.value);
                  }}
                >
                  <option defaultValue={true} disabled>
                    Select the Issue Type
                  </option>
                  {issueTypes.map((e, i) => {
                    return (
                      <option value={e} key={i}>
                        {" "}
                        {e}{" "}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Issue Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setIssueTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Issue Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description"
                  onChange={(e) => setIssueDescription(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={() => handleSubmit()}>
                Submit
              </Button>
              &nbsp;&nbsp;
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ZenForm;
