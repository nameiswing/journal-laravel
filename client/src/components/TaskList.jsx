import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import TaskItem from "./TaskItem";
import { useTaskContext } from "../pages/Tasks";
import Spinner from "./Spinner";

const TaskList = ({ tasks }) => {
    return (
        <Container
            fluid
            className="bg-light rounded mb-4 overflow-auto p-2 border"
            style={{
                minHeight: "15rem",
                height: "calc(100% - 1.5rem)",
                maxHeight: "21.5rem",
            }}
            id="list"
        >
            {tasks.length > 0 ? (
                <ListGroup className="w-100 d-flex flex-column-reverse">
                    {tasks.reverse().map((item, index) => (
                        <TaskItem key={index} itemData={item} idx={index} />
                    ))}
                </ListGroup>
            ) : (
                <div className="d-flex h-100">
                    <Spinner />
                </div>
            )}
        </Container>
    );
};

export default TaskList;
