import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState();
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    )
      .then(res => res.json())
      .then(data => setResults(data.results));
  }, [query]);

  return (
    <div>
      <h3 className="mx-auto max-w-3xl text-3xl text-left font-semibold leading-tight pt-24 mt-1 text-gray-900 mb-4   ">
        Search results
      </h3>
      <div className="container mx-auto px-4  w-full lg:max-w-3xl  bg-white ">
        {results &&
          results.map((movie, i) => {
            return (
              <Link key={i} to={`/movie/${movie.id}`}>
                <div className="border-b-2  flex flex-row">
                  <img
                    className="w-20 py-4 "
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="p-4 flex flex-row items-center">
                    <h1 className="text-3xl">{movie.title}</h1>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SearchResults;
