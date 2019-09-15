import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./styles.scss";

const Header = props => {
  const [loginLinkName, toggleLoginLinkName] = useState("Register");

  useEffect(() => {
    if (location.pathname === "/register") {
      toggleLoginLinkName("Login");
    }
  }, []);

  const toggleView = e => {
    e.preventDefault();
    const { location } = props;
    if (location.pathname === "/") {
      toggleLoginLinkName("Login");
      props.history.push("/register");
    } else if (location.pathname === "/register") {
      toggleLoginLinkName("Register");
      props.history.push("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("favoriteMovieIds");
    window.open("/", "_self");
  };

  const goBack = e => {
    e.preventDefault();
    props.history.goBack();
  };

  return (
    <header className="app-header">
      {props.user && (
        <Link to="/" onClick={goBack}>
          <Button variant="link">Go Back</Button>
        </Link>
      )}
      {!props.user && <div />}
      <strong>Movie App</strong>
      {!props.user && (
        <React.Fragment>
          <Link onClick={toggleView} to="/">
            <Button variant="link">{loginLinkName}</Button>
          </Link>
        </React.Fragment>
      )}
      {props.user && (
        <ul>
          <li>
            <Link to={"/profile"}>
              <Button variant="link">Profile</Button>
            </Link>
          </li>
          <li>
            <Button onClick={logout}>Logout</Button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default withRouter(Header);
