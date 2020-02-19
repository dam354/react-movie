import React, { useState, useEffect } from 'react';
import axios from 'axios';
const MovieContext = React.createContext();

const MovieContextProvider = props => {
  const [popularMovieList, setPopularMovieList] = useState([]);
  const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.themoviedb.org/3/movie/popular?api_key=${REACT_APP_API_KEY}&language=en-US&page=1`
      );
      setPopularMovieList(result.data['results']);
    };
    fetchData();
  }, []);

  return (
    <MovieContext.Provider value={{ popularMovieList }}>
      {props.children}
    </MovieContext.Provider>
  );
};

export { MovieContextProvider, MovieContext };
