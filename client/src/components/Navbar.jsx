import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";


//COMPONENTS STARTS HERE
const NavComponent = () => {

    
    function selectHandler(e) {
        if (window.location.pathname === '/tasks' && e.target.id === 'thoughts') {
            tasks.classList.remove("bg-white", "text-dark");
            thoughts.classList.add("bg-white", "text-dark");
        } 
        else if (window.location.pathname === '/thoughts' && e.target.id === 'tasks') {
            thoughts.classList.remove("bg-white", "text-dark");
            tasks.classList.add("bg-white", "text-dark");
        }
    }

    useEffect(() => {
        if (window.location.pathname === '/tasks') {
            tasks.classList.add("bg-white", "text-dark");
            thoughts.classList.remove("bg-white", "text-dark");
        } 
        else if (window.location.pathname === '/thoughts') {
            thoughts.classList.add("bg-white", "text-dark");
            tasks.classList.remove("bg-white", "text-dark");
        }
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Container fluid="md">
                <Navbar.Brand>My Coding Journal</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"> <FiMenu /></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <li className="nav-item">
                            <Link
                                className="nav-link py-1 px-3 rounded me-1 d-inline-block"
                                to="/tasks"
                                id="tasks"
                                onClick={selectHandler}
                            >
                                Tasks
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link py-1 px-3 rounded d-inline-block"
                                to="/thoughts"
                                id="thoughts"
                                onClick={selectHandler}
                            >
                                Thoughts
                            </Link>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavComponent;
