import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./styles.scss";

class MovieCard extends Component {
  render() {
    const { movie, onClick } = this.props;
    return (
      <Card style={{ width: "16rem" }}>
        {movie.Featured && <Card.Header>Featured</Card.Header>}
        <Card.Img variant="top" src="https://dummyimage.com/254x100/000/fff" />
        <Card.Body>
          <Button
            onClick={() => onClick(movie)}
            className="movie-card"
            variant="link"
          >
            <Card.Title as="h2">{movie.Title}</Card.Title>
          </Button>
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
  onClick: PropTypes.func.isRequired
};

export default MovieCard;
