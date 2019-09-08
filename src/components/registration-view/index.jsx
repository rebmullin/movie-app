import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./styles.scss";

const Registration = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    // Clear out the error once the user is updating
    if (error) {
      setError("");
    }
    switch (e.target.id) {
      case "formBasicEmail":
        setEmail(e.target.value);
        break;
      case "formBasicUsername":
        setUsername(e.target.value);
        break;
      case "formBasicPassword":
        setPassword(e.target.value);
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("https://cool-movie-api.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email
      })
      .then(response => {
        // TODO: do something with response?
        props.onLoggedIn(username);
      })
      .catch(error => {
        console.log(error);
        // TODO: improve error message
        setError(error.message);
      });
  };

  return (
    <div className="registration-view form-view">
      <h1>Registration</h1>
      {error && <p>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formBasicEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formBasicUsername">
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formBasicPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default Registration;
