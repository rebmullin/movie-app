import React from "react";
import axios from "axios";
import MovieCard from "../movie-card";
import MovieView from "../movie-view";

export default class MainView extends React.Component {
  constructor() {
    // Calls the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null
    };
  }

  componentDidMount() {
    // TODO: update to heroku url once othe exercise issue is fixed
    axios
      .get("https://cool-movie-api.herokuapp.com/movies")
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => console.log(error));
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie || null
    });
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing but default
  render() {
    // if the state isn't intialized, this will throw on run time
    // before the data is intiially loaded
    const { movies, selectedMovie } = this.state;

    //before the movies has been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <button onClick={() => this.onMovieClick()}>Go Back</button>
        ) : null}
        {selectedMovie ? (
          <MovieView movie={selectedMovie} />
        ) : (
          movies.map(movie => (
            <MovieCard
              movie={movie}
              key={movie._id}
              onClick={movie => this.onMovieClick(movie)}
            />
          ))
        )}
      </div>
    );
  }
}
