import React, { Component } from "react";

export default class MovieCard extends Component {
  render() {
    const { movie, onClick } = this.props;
    return (
      <div onClick={() => onClick(movie)} className="movie-card">
        {movie.Title}
      </div>
    );
  }
}
