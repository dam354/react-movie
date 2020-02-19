import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { MovieContextProvider } from "./MovieContext";
import { createBrowserHistory } from "history";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <MovieContextProvider>
    <Router>
      <App />
    </Router>
  </MovieContextProvider>,
  rootElement
);
