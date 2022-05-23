import React from "react";
import { render } from "react-dom";
import { Route, Router } from "react-router";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import NoMatchComponent from "./components/NoMatchComponent";
import routes from "./routes";
import configureStore from "./store";

import ErrorBoundary from "./components/ErrorBoundary";
// import { ServerErrorComponent } from "./components";
import "./styles/index.scss";

const store = configureStore();

const appRoot = document.getElementById("root");
// const renderServerError = () => render(<ServerErrorComponent />, appRoot);

render(
  <Provider store={store}>
    <ErrorBoundary>
      <Router history={createBrowserHistory()}>
        <Route path='/error' component={NoMatchComponent} />
        {routes}
      </Router>
    </ErrorBoundary>
  </Provider>,
  appRoot,
);
