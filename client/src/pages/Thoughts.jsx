import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormComponent from "../components/Form";
import List from "../components/List";
import axios from "axios";

const ThoughtContext = React.createContext();
export const useThoughtContext = () => useContext(ThoughtContext);
const controller = new AbortController();

//COMPONENT STARTS HERE
const Thoughts = () => {

    const inputNames = ["name", "description", "Title"];
    const initialInputs = {
        name: "",
        description: "",
        due_date: new Date().toLocaleDateString("en-CA")
    };

    const [ APICall, setAPICall ] = useState(0);
    const [thoughts, setThoughts] = useState([]);
    const [inputValues, setInputValues] = useState(initialInputs);

    function changeHandler(e) {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
        // console.log(inputValues);
    }

    function getData() {
        try {
            axios.get(`/api/thoughts`).then( res => {
                if(res.data.status === 200) {
                    setThoughts(res.data.thoughts);
                }
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    function saveThought(e) {
        e.preventDefault();
        try {
            axios.post("/api/add-thought", inputValues).then((res) => {
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
            setThoughts([...thoughts, inputValues]);
        }
    }

    useEffect(() => {
        getData();
        return () => controller.abort();
    }, [APICall]);
    
    return (
        <ThoughtContext.Provider value={setAPICall}>
            <Card className="px-4 pt-4 container-sm my-4">
                <Card.Title className="display-6 text-danger mb-4">
                    My Thoughts
                </Card.Title>
                <Row>
                    <Col lg={6} md={12} sm={12}>
                        <FormComponent
                            names={inputNames}
                            state={inputValues}
                            changeHandler={changeHandler}
                            submitHandler={saveThought}
                        />
                    </Col>
                        <Col lg={6} md={12} sm={12}>
                            <List data={thoughts} />
                        </Col>
                </Row>
            </Card>
        </ThoughtContext.Provider>
    );
};

export default Thoughts;
