import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LoginView = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    if (error) {
      setError("");
    }

    switch (e.target.id) {
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

    setLoading(true);

    /* Send a request to the server for authentication */
    axios
      //.post("http://localhost:3000/login", {
      .post(`https://cool-movie-api.herokuapp.com/login`, {
        Username: username,
        Password: password
      })
      .then(response => {
        const { data } = response;
        props.onLoggedIn(data);
      })
      .catch(error => {
        console.log("No such user");
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="login-view form-view">
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group required as={Row} controlId="formBasicUsername">
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

        <Form.Group required as={Row} controlId="formBasicPassword">
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

export default LoginView;
