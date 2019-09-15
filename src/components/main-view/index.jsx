import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { CardColumns } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import MovieCard from "../movie-card";
import MovieView from "../movie-view";
import LoginView from "../login-view";
import Registration from "../registration-view";
import DirectorView from "../director-view";
import GenreView from "../genre-view";
import Header from "../app-header";
import ProfileView from "../profile-view";

import "./styles.scss";

class MainView extends React.Component {
  constructor() {
    // Calls the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      loginUrl: "/",
      loading: false
    };

    this.onLoggedIn = this.onLoggedIn.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    localStorage.setItem(
      "favoriteMovieIds",
      JSON.stringify(authData.user.FavoriteMovies)
    );

    this.getMovies(authData.token);
  }

  getMovies(token) {
    this.setState({
      loading: true
    });
    axios
      .get("https://cool-movie-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing but default
  render() {
    // if the state isn't intialized, this will throw on run time
    // before the data is intiially loaded
    const { movies, user, loading } = this.state;

    if (!movies) return <div className="main-view" />;

    // TODO: move header to its own component - can use withRouter then?
    return (
      <Router>
        <Header user={user} />
        <div className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!user) {
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              }

              if (loading) {
                return <p>Loading...</p>;
              }

              const featuredMovies = movies
                .filter(m => m.Featured)
                .map(m => <MovieCard size={20} key={m._id} movie={m} />);

              const nonFeaturedMovies = movies
                .filter(m => !m.Featured)
                .map(m => <MovieCard key={m._id} movie={m} />);

              return (
                <div className="movies-wrapper">
                  <h2 className="section-title">Featured</h2>
                  <CardColumns>{featuredMovies}</CardColumns>

                  <CardColumns>{nonFeaturedMovies}</CardColumns>
                </div>
              );
            }}
          />
          <Route
            path="/register"
            render={() => (
              <Registration onLoggedIn={user => this.onLoggedIn(user)} />
            )}
          />
          <Route
            exact
            path="/movies/:movieId"
            render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <MovieView
                  movie={movies.find(m => m._id === match.params.movieId)}
                />
              );
            }}
          />
          <Route
            path="/director/:name"
            render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <DirectorView
                  director={
                    movies.find(m => m.Director.Name === match.params.name)
                      .Director
                  }
                  id={
                    movies.find(m => m.Director.Name === match.params.name)._id
                  }
                />
              );
            }}
          />
          <Route
            path="/genre/:name"
            render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <GenreView
                  genre={
                    movies.find(m => m.Genre.Name === match.params.name).Genre
                  }
                  id={movies.find(m => m.Genre.Name === match.params.name)._id}
                />
              );
            }}
          />
          <Route
            path="/profile"
            render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <ProfileView movies={movies} user={user} />;
            }}
          />
        </div>
      </Router>
    );
  }
}

export default MainView;
