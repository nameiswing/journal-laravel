import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import TaskItem from "./TaskItem";
import Spinner from "./Spinner";
import ThoughtItem from "./ThoughtItem";

const List = ({ data }) => {

    const [ path ] = useState(window.location.pathname);
    const [ isEmpty, setIsEmpty ] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout( () => {
            setIsEmpty(true)
        }, 5000);
        return () => clearTimeout(timer);
    }, []);
    
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
            {data.length > 0 ? (
                <ListGroup className="w-100 d-flex flex-column-reverse">
                    {data.map((item, index) => {
                        if(path === "/tasks") return <TaskItem key={index} itemData={item} idx={index} />
                        if(path === "/thoughts") return <ThoughtItem key={index} itemData={item} idx={index} />
                    })}
                </ListGroup>
            ) : (
                <div className="d-flex h-100">
                    {
                        data.length === 0 && isEmpty ?
                        <p className="m-auto text-secondary text-center">List is empty.</p> :
                        <Spinner />
                    }
                </div>
            )}
        </Container>
    );
};

export default List;
