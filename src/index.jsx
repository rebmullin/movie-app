import React from "react";
import ReactDOM from "react-dom";
import MovieView from "./components/main-view";
import Registration from "./components/registration-view";
import LoginView from "./components/login-view";

// Import statement to indicate that you need to bundle scss
import "./index.scss";

// Main component (will eventually use all the other others)
class MyFlixApp extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <MovieView />
        {/* <Registration /> */}
        {/* <LoginView /> */}
      </div>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells react to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApp), container);
