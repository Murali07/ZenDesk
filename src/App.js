import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ZenForm from "./components/ZenForm";
import Success from "./components/Success";
import Status from "./components/Status";
import Dashboard from "./components/Dashboard";
import Issues from "./components/Issues";
import Navbar from "./helpers/Navbar";
import Contact from "./components/Contact";
import Home from "./components/Home";
export const CommonContext = React.createContext();

const apiurl = "https://zendesk.onrender.com";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CommonContext.Provider value={{ apiurl }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/new-issue" element={<ZenForm />} />
            <Route path="/success/:id" element={<Success />} />
            <Route path="/track-issue" element={<Status />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/issue/:id" element={<Issues />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/new-issue" />} />
          </Routes>
        </CommonContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
