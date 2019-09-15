import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "../movie-card";
import { CardColumns } from "react-bootstrap";

import "./styles.scss";

export const baseURL = "https://cool-movie-api.herokuapp.com";

const ProfileView = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formUpdated, setFormUpdateStatus] = useState(false);
  const [error, setError] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoriteMovieIds"));
    setFavoriteMovies([...new Set(favs)]);

    const token = localStorage.getItem("token");
    axios
      .get(`${baseURL}/users/${props.user}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const { data } = response;
        setUsername(data.Username);
        setEmail(data.Email);
      });
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      Username: username,
      Password: password,
      Email: email
    };

    axios
      .put(`${baseURL}/users/${props.user}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const { data } = response;
        setUsername(data.Username);
        setEmail(data.Email);
        setFormUpdateStatus(true);
      });
  };

  const changeHandler = e => {
    if (error) {
      setError("");
    }
    switch (e.target.id) {
      case "profileEmail":
        setEmail(e.target.value);
        break;
      case "profilecUsername":
        setUsername(e.target.value);
        break;
      case "profilePassword":
        setPassword(e.target.value);
        break;
    }
  };

  const renderFavorites = () => {
    return props.movies
      .filter(fm => favoriteMovies.includes(fm._id))
      .map(fm => <MovieCard key={fm._id} movie={fm} />);
  };

  const deregister = e => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    axios
      .delete(`${baseURL}/users/${props.user}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const { data } = response;
        localStorage.clear();
        window.open("/", "_self");
      });
  };

  return formUpdated ? (
    <p>Your profile has been updated!</p>
  ) : (
    <div className="profile-view">
      <div className="form-view">
        <h1>Profile</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group as={Row} controlId="profileEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                defaultValue={email}
                onChange={changeHandler}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="profileUsername">
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                defaultValue={username}
                onChange={changeHandler}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="profilePassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" onChange={changeHandler} />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>

      {favoriteMovies.length > 0 && (
        <div className="profile-favorites">
          <h2>Favorites</h2>
          <CardColumns> {renderFavorites()}</CardColumns>
        </div>
      )}

      <div className="profile-deregister">
        <Button onClick={deregister}>Deregister</Button>
      </div>
    </div>
  );
};

export default ProfileView;
