// import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Tasks from './pages/Tasks';
import Thoughts from './pages/Thoughts';
import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000";

//COMPONENT STARTS HERE
const App = () => {
    
    return (
        <div className="container-fluid p-0">
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={ <Navigate replace to="/tasks" /> }/>
                    <Route exact path="/tasks" element={<Tasks />} />
                    <Route exact path="/thoughts" element={<Thoughts />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
