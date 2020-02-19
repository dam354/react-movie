import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const MovieCard = props => {
  const { movie, rating } = props;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 150 }}
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="flex flex-col rounded overflow-hidden shadow-lg bg-white font-sans">
          <div className="relative">
            <img
              className="w-full "
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            {rating && (
              <div className="text-sm  font-medium absolute rounded-full h-10 w-10  text-white bg-pink-500 right-0 top-0 m-2 flex items-center justify-center">
                {Math.floor(movie.vote_average)}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
