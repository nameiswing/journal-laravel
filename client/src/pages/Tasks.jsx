import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import FormComponent from "../components/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import List from "../components/List";
import swal from "sweetalert/";

const TaskContext = React.createContext();
export const useTaskContext = () => useContext(TaskContext);
const controller = new AbortController();

//COMPONENT STARTS HERE
const Tasks = () => {
    const inputNames = ["name", "description", "Task"];
    const initialInputs = {
        name: "",
        description: "",
        due_date: new Date().toLocaleDateString("en-CA"),
        is_completed: false,
    };

    const [ APICall, setAPICall ] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [inputValues, setInputValues] = useState(initialInputs);

    function changeHandler(e) {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
        // console.log(inputValues);
    }

    function getTasks() {
        try {
            axios.get("/api/tasks").then((res) => {
                setTasks(res.data.tasks);
            });
        } catch (err) {
            console.log(err.message);
        }
    } // get data from sql db via laravel server

    let headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
            "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };
    function saveTask(e) {
        e.preventDefault();
        try {
            axios.post("/api/add-task", inputValues, headers).then((res) => {
                if (res.data.status === 200) {
                    console.log(res.data.message);
                    setInputValues(initialInputs);
                    swal('Success!', res.data.message, 'success');
                    setAPICall( count => count += 1);
                } else {
                    console.log("Something went wrong.");
                }
            });
        } catch (err) {
            console.log(err.message);
        } finally {
            setTasks([...tasks, inputValues]);
        }
    }

    const contextValues = {
        tasks,
        setTasks,
        setAPICall
    };

    useEffect(() => {
        getTasks();
        return () =>{
            controller.abort();
            setTasks([]);
        };
    }, [APICall]);

    return (
        <TaskContext.Provider value={contextValues}>
            <Card className="px-4 pt-4 container-sm my-4">
                <Card.Title className="display-6 text-danger mb-4">
                    Tasks
                </Card.Title>
                <Row className="p-0">
                    <Col lg={6} md={12} sm={12}>
                        <FormComponent
                            names={inputNames}
                            state={inputValues}
                            changeHandler={changeHandler}
                            submitHandler={saveTask}
                        />
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                        <List data={tasks} />
                    </Col>
                </Row>
            </Card>
        </TaskContext.Provider>
    );
};

export default Tasks;
