import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import LoadingSpinner from './LoadingSpinner';

const AllMovies = props => {
  const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
  const [allMovies, setAllMovies] = useState([]);
  const [page, setPage] = useState(2);
  const [alertOnBottom, setAlertOnBottom] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnDocumentBottom = useCallback(() => {
    if (alertOnBottom) {
      setPage(page => page + 1);
    }
  }, [alertOnBottom]);

  /* This will trigger handleOnDocumentBottom when the body of the page hits the bottom */
  useBottomScrollListener(handleOnDocumentBottom);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${REACT_APP_API_KEY}&language=en-US&page=${page}`
      );
      const all = [...allMovies, ...result.data.results];

      setAllMovies(all);
    };
    fetchData();
  }, [page]);

  if (allMovies) {
    return (
      <div id="list" className="flex items-start justify-center  mb-12">
        <div className="w-5/6">
          <h1 className="text-indigo-700 text-4xl font-medium text-left border-b-2 border-pink-500 my-4 ">
            All Movies
          </h1>
          {
            <div className=" grid  grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-8  gap-4 ">
              {allMovies.map((x, i) => {
                return <MovieCard key={i} movie={x} />;
              })}
            </div>
          }
          {isLoading && (
            <div className="m-4">
              <LoadingSpinner />
              {console.log('spinner')}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-start justify-center pt-24  ">
        <div className="w-5/6 flex justify-center flex-col">
          <h1 className="text-indigo-700 text-4xl font-medium text-left border-b-2 border-pink-500 mb-4 ">
            All Movies
          </h1>
          <LoadingSpinner />
        </div>
      </div>
    );
  }
};

export default AllMovies;
