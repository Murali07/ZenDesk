import React, { useState, useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { CommonContext } from "../App";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

function Dashboard() {
  let [count, setCount] = useState({ open: 0, inProgress: 0, closed: 0 });
  let commonContext = useContext(CommonContext);

  let [data, setData] = useState([]);
  let [stage, setStage] = useState("");

  let navigate = useNavigate();

  let loadCount = async () => {
    let res = await axios.get(`${commonContext.apiurl}/issues-count`);
    // console.log(res.data)
    if (res.data.statusCode === 200) {
      setCount(res.data);
    }
  };

  useEffect(() => {
    loadCount();
  }, []);

  let loadStage = async (stage) => {
    // console.log(stage)
    let res = await axios.get(`${commonContext.apiurl}/issues-by-status/${stage}`)
    if(res.data.statusCode === 200){
        setStage(stage)
        setData(res.data.issues)
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="head-wrapper">
        <Card className="cards">
          <Card.Body onClick={() => loadStage("Open")}>
            <Card.Title> Open Issues {count.open} </Card.Title>
          </Card.Body>
        </Card>

        <Card className="cards">
          <Card.Body onClick={() => loadStage("In Progress")}>
            <Card.Title> In Progress Issues {count.inProgress} </Card.Title>
          </Card.Body>
        </Card>

        <Card className="cards">
          <Card.Body onClick={() => loadStage("Closed")}>
            <Card.Title> Closed Issues {count.closed} </Card.Title>
          </Card.Body>
        </Card>
      </div>
      
      <div className="main-wrapper">
        {
            stage !== "" ? <h1 className="heading">List of {stage} Issues</h1> : <></>
        }
        {
            data.length ? <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Issue Title</th>
                <th>Issue Type</th>
                <th>Created Date</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
                {
                    data.map((e, i) => {
                        return <tr key={i} style={{"cursor":"pointer"}} onClick={()=>{navigate(`/issue/${e._id}`)}} >
                            
                                <td data-label="#"> {i+1} </td>
                                <td data-label="Issue Title"> {e.issueTitle} </td>
                                <td data-label="Issue Type"> {e.issueType} </td>
                                <td data-label="Created Date"> {e.createdAt} </td>
                                <td data-label="Name"> {e.name} </td> 
                                <td data-label="Mobile"> {e.mobile} </td>
                                <td data-label="Email"> {e.email} </td>
                            
                        </tr>
                    })
                }              
            </tbody>
          </Table> : <></>
        }
      </div>
    </div>
  );
}

export default Dashboard;
