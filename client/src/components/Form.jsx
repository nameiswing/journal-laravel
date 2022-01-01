// import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
//COMPONENT STARTS HERE
const FormComponent = ({ names, state, changeHandler, submitHandler }) => {

    return (
        <Form className="container-fluid p-0" onSubmit={submitHandler}>
            <Row className="mb-4">
                <Col lg={7} md={8} sm={7}>
                    <Form.Group>
                        <Form.Label htmlFor={names[0]}>{names[2]}</Form.Label>
                        <Form.Control
                            name={names[0]}
                            type="text"
                            value={state.name}
                            onChange={changeHandler}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col lg={5} md={4} sm={5}>
                    <Form.Group>
                        <Form.Label htmlFor="date">Date</Form.Label>
                        <Form.Control
                            name="due_date"
                            type="date"
                            value={state.due_date}
                            onChange={changeHandler}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <Form.Label htmlFor={names[1]}>Details</Form.Label>
                    <Form.Control
                        as="textarea"
                        name={names[1]}
                        value={state.description}
                        onChange={changeHandler}
                        rows={5}
                        required
                    ></Form.Control>
                </Col>
            </Row>
            <Row>
                <Col className="d-grid mb-4">
                    <Button
                        type="submit"
                        variant="danger"
                    >
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default FormComponent;
