import React from 'react';
// import "./styles.css";npm

import Header from './components/Header';

import { Switch, Route } from 'react-router';
import MoviePage from './pages/MoviePage';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';

export default function App() {
  return (
    <div className="App bg-gray-300">
      <Header />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/movie/:movieId">
          <MoviePage />
        </Route>
        <Route path="/search/:query">
          <SearchResults />
        </Route>
      </Switch>

      <footer className="h-20 bg-black text-white text-xl font-bold items-center sticky bot-0" />
    </div>
  );
}
