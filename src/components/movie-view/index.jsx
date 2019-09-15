import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./styles.scss";

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
        {/* <Link to="/" className="back-link">
          <Button variant="link">Go Back</Button>
        </Link> */}
        <Card.Title as="h1">{movie.Title}</Card.Title>
        <Card.Body>
          <Card.Img src="https://dummyimage.com/500x250/000/fff" />
          <Card.Text>{movie.Description}</Card.Text>

          {movie.Genre && (
            <Card.Text>
              <Link to={`/genre/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
              </Link>
            </Card.Text>
          )}

          {movie.Director && (
            <Card.Text>
              <Link to={`/director/${movie.Director.Name}`}>
                <Button variant="link">Director</Button>
              </Link>
            </Card.Text>
          )}
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
