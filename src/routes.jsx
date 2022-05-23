import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Main from "./containers/Main";
import Navigation from "./components/Navigation";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";

import AboutMe from "./containers/AboutMe";
import Skills from "./containers/Skills";
import Services from "./containers/Services";
import Products from "./containers/Products";
import ContactMe from "./containers/ContactMe";

import Calsci from "./components/Calsci/Calsci";
import GithubFinder from "./components/GithubFinder/GithubFinder";
import NotesSuitcase from "./components/NotesSuitcase/NotesSuitcase";
import CovidTracker from "./components/CovidTracker/CovidTracker";
import ToDoList from "./components/ToDoList/ToDoList";

export default (
  <React.Fragment>
    <DndProvider backend={HTML5Backend}>
      <ErrorBoundary>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/about' component={AboutMe} />
          <Route path='/myskills' component={Skills} />
          <Route path='/services' component={Services} />
          <Route exact path='/products' component={Products} />
          <Route path='/contact' component={ContactMe} />
          <Route exact path='/products/toDoList' component={ToDoList} />
          <Route
            exact
            path='/products/notesSuitcase'
            component={NotesSuitcase}
          />
          <Route exact path='/products/githubFinder' component={GithubFinder} />
          <Route exact path='/products/covidTracker' component={CovidTracker} />
          <Route
            exact
            path='/products/calsci'
            render={() => (
              <ErrorBoundary>
                <Calsci />
              </ErrorBoundary>
            )}
          />
          {/*component={Calsci} />*/}
          <Redirect to='/error' />
        </Switch>
        <ToastContainer />
      </ErrorBoundary>
    </DndProvider>
  </React.Fragment>
);
