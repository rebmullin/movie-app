import React from "react";
import axios from "axios";
import MovieCard from "../movie-card";
import MovieView from "../movie-view";
import LoginView from "../login-view";
import Registration from "../registration-view";
import { CardColumns } from "react-bootstrap";
import Button from "react-bootstrap/Button";

class MainView extends React.Component {
  constructor() {
    // Calls the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      loginView: false
    };

    this.toggleView = this.toggleView.bind(this);
    this.onMovieClick = this.onMovieClick.bind(this);
    this.onLoggedIn = this.onLoggedIn.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://cool-movie-api.herokuapp.com/movies")
      // .get("http://localhost:3000/movies")
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

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  toggleView() {
    this.setState({
      loginView: !this.state.loginView
    });
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing but default
  render() {
    // if the state isn't intialized, this will throw on run time
    // before the data is intiially loaded
    const { movies, selectedMovie, user, loginView } = this.state;
    const viewName = loginView ? "Login" : "Register";
    const StartView = !loginView ? (
      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    ) : (
      <Registration onLoggedIn={user => this.onLoggedIn(user)} />
    );

    if (!user) {
      return (
        <React.Fragment>
          <Button onClick={this.toggleView}>{viewName}</Button>
          {StartView}
        </React.Fragment>
      );
    }

    //before the movies has been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <div>
            <MovieView movie={selectedMovie} />
            <Button onClick={() => this.onMovieClick()}>Go Back</Button>
          </div>
        ) : (
          <CardColumns>
            movies.map(movie => (
            <MovieCard
              movie={movie}
              key={movie._id}
              onClick={movie => this.onMovieClick(movie)}
            />
            ))
          </CardColumns>
        )}
      </div>
    );
  }
}

export default MainView;
