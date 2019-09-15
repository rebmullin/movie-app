import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import cx from "classnames";
import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { baseURL } from "../profile-view";

import "./styles.scss";

class MovieCard extends Component {
  constructor() {
    // Calls the superclass constructor
    // so React can initialize it
    super();

    this.state = {
      favorites: []
    };

    this.favorite = this.favorite.bind(this);
    this.unFavorite = this.unFavorite.bind(this);
  }

  componentDidMount() {
    const favs = JSON.parse(localStorage.getItem("favoriteMovieIds"));
    let hello = [...new Set(favs)];
    this.setState({
      favorites: hello
    });
  }

  favorite() {
    const {
      movie: { _id }
    } = this.props;

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .post(
        `${baseURL}/users/${user}/Movies/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        const { data } = response;
        this.setState({
          favorites: data.FavoriteMovies
        });

        localStorage.setItem(
          "favoriteMovieIds",
          JSON.stringify(data.FavoriteMovies)
        );
      });
  }

  unFavorite() {
    const {
      movie: { _id }
    } = this.props;
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .delete(`${baseURL}/users/${user}/Movies/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const { data } = response;

        localStorage.setItem(
          "favoriteMovieIds",
          JSON.stringify(data.FavoriteMovies)
        );

        this.setState({
          favorites: data.FavoriteMovies
        });
      });
  }

  render() {
    const { movie, location, size } = this.props;
    const { favorites } = this.state;
    const isFavorited = Boolean(favorites.find(fm => fm === movie._id));

    return !isFavorited && location.pathname === "/profile" ? null : (
      <Card style={{ width: size ? `${size}rem` : "16rem" }}>
        <Card.Header
          className={cx({
            "favorite-movie": true,
            "favorited-movie": isFavorited
          })}
        >
          {!isFavorited && <span onClick={this.favorite}> &hearts;</span>}
          {isFavorited && <span onClick={this.unFavorite}>&hearts;</span>}
        </Card.Header>
        <Card.Img variant="top" src="https://dummyimage.com/254x100/000/fff" />
        <Card.Body>
          <Link
            to={`/movies/${movie._id}`}
            className="movie-card"
            variant="link"
          >
            <Button variant="link">
              <Card.Title as="h2">{movie.Title}</Card.Title>
            </Button>
          </Link>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  size: PropTypes.number
};

export default withRouter(MovieCard);
