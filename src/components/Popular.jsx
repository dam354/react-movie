import React, { useContext } from "react";
import MovieCard from "./MovieCard";

import LoadingSpinner from "./LoadingSpinner";

import { MovieContext } from "../MovieContext";

const Popular = () => {
  const { popularMovieList } = useContext(MovieContext);

  if (popularMovieList) {
    return (
      <div className="flex items-start justify-center pt-24  ">
        <div className="w-5/6">
          <h1 className="text-indigo-700 text-4xl font-medium text-left border-b-2 border-pink-500 mb-4 ">
            Popular Movies
          </h1>

          {
            // <div className="  flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:-mx-2 lg:-mx-2 xl:-mx-1 ">
            <div className=" grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5   gap-4 ">
              {popularMovieList.map(x => {
                return (
                  <MovieCard key={x.title} movie={x} rating={x.vote_average} />
                );
              })}
            </div>
          }
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-start justify-center pt-24  ">
        <div className="w-5/6 flex justify-center flex-col">
          <h1 className="text-indigo-700 text-4xl font-medium text-left border-b-2 border-pink-500 mb-4 ">
            Popular Movies
          </h1>
          <LoadingSpinner />
        </div>
      </div>
    );
  }
};

export default Popular;
