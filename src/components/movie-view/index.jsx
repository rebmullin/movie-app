import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

class MovieView extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { movie } = this.props;

    if (!movie) return null;
    return (
      <Card className="movie-view">
        <Card.Title as="h1">{movie.Title}</Card.Title>
        <Card.Body>
          <Card.Img src="https://dummyimage.com/500x250/000/fff" />
          <Card.Text>
            {movie.Description}
            {movie.Genre && movie.Genre.Name}
            {movie.Director && movie.Director.Name}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired
};

export default MovieView;
