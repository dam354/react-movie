import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useToggler from '../hooks/useToggle';
import MovieCard from '../components/MovieCard';
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
const REACT_APP_OMDB = process.env.REACT_APP_OMDB;

const ScrollToTopOnMount = ({ id }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return null;
};
const timeConvert = num => {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return `${hours}h ${minutes}min`;
};

const MoviePage = () => {
  const history = useHistory();
  const { movieId: id } = useParams();
  const [movie, setMovie] = useState({});
  const [altMovie, setAltMovie] = useState({});

  const [cast, setCast] = useState([]);
  const [moreActors, toggleMoreActors] = useToggler(false);

  const [recomendations, setRecomendations] = useState([]);

  const actorToggle = !moreActors ? 6 : cast.length;

  useEffect(() => {
    toggleMoreActors(false);
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${REACT_APP_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(data => setMovie(data));

    toggleMoreActors(false);
  }, [id]);

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?i=${movie.imdb_id}&apikey=${REACT_APP_OMDB}`
    )
      .then(res => res.json())
      .then(data => setAltMovie(data));
  }, [movie.imdb_id, id]);

  useEffect(() => {
    fetch(`
    https://api.themoviedb.org/3/movie/${id}/credits?api_key=${REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => setCast(data.cast));
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${REACT_APP_API_KEY}&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(data => setRecomendations(data.results));
  }, [id]);

  return (
    <>
      <ScrollToTopOnMount id={id} />
      <div className="container mx-auto px-4 max-w-3xl ">
        <button
          onClick={history.goBack}
          className="text-white text-xl z-40 block absolute mt-24 max-w-3xl  mx-auto"
        >
          Back
        </button>
      </div>
      <main className="">
        <section className="relative block " style={{ height: '390px' }}>
          {movie.backdrop_path && (
            <div
              className="absolute left-0 top-0 mt-16 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
              }}
            >
              <span className="w-full h-full left-0 absolute opacity-50 bg-black" />
            </div>
          )}
        </section>

        <section className="relative py-2 bg-gray-300 ">
          <div className="container mx-auto px-4 max-w-3xl ">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="flex flex-wrap justify-center">
                <div className="w-4/12  ">
                  {movie.poster_path && (
                    <img
                      alt={movie.title}
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      className="shadow-xl max-h-full rounded-lg rounded-b-none  rounded-r-none h-auto  border-none   "
                    />
                  )}
                </div>

                <div className="w-8/12  flex flex-col items-start justify-start px-2 py-2">
                  <h3 className="text-3xl text-left font-semibold leading-tight mt-1 text-gray-900   mr-16">
                    {movie.title}
                    <span className="text-gray-800 text-xl ml-2 ">
                      ({altMovie.Year})
                    </span>
                  </h3>
                  <div className="text-sm  font-medium absolute rounded-full h-10 w-10  text-white bg-pink-500 right-0 top-0 mr-5 mt-4 flex items-center justify-center">
                    {altMovie.imdbRating}
                  </div>

                  <div className="text-xs text-left leading-normal mb-2 text-gray-700 font-bold ">
                    {altMovie.Rated} | {timeConvert(movie.runtime)} |{' '}
                    {altMovie.Genre &&
                      altMovie.Genre.split(',')
                        .slice(0, 3)
                        .join(',')}{' '}
                    | {altMovie.Released} (USA)
                  </div>

                  <p className=" text-sm font-semibold leading-normal text-gray-900">
                    PLOT
                  </p>
                  <p className="mb-4 text-lg text-left leading-relaxed text-gray-800">
                    {movie.overview}
                  </p>
                </div>
                <div className="text-sm  font-medium absolute rounded-full h-10 w-10  text-white bg-pink-500 right-0 top-0 mr-5 mt-4 flex items-center justify-center">
                  {altMovie.imdbRating}
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="w-1/3 text-left  flex flex-col items-start justify-start p-4">
                  <div className="flex flex-col ">
                    <p className=" text-sm font-semibold leading-normal text-gray-900">
                      Director
                    </p>
                    <p className="mb-4 text-sm text-left leading-relaxed text-gray-800">
                      {altMovie.Director}
                    </p>
                  </div>
                  <div className="flex flex-col ">
                    <p className=" text-sm font-semibold leading-normal text-gray-900">
                      Writer
                    </p>
                    <p className="mb-4 text-sm text-left leading-relaxed text-gray-800">
                      {altMovie.Writer}
                    </p>
                  </div>
                  <div className="flex flex-col ">
                    <p className=" text-sm font-semibold leading-normal text-gray-900">
                      Language
                    </p>
                    <p className="mb-4 text-sm text-left leading-relaxed text-gray-800">
                      {altMovie.Language}
                    </p>
                  </div>
                  <div className="flex flex-col ">
                    <p className=" text-sm font-semibold leading-normal text-gray-900">
                      Awards
                    </p>
                    <p className="mb-4 text-sm text-left leading-relaxed text-gray-800">
                      {altMovie.Awards}
                    </p>
                  </div>
                  <div className="flex flex-col ">
                    <p className=" text-sm font-semibold leading-normal text-gray-900">
                      Production
                    </p>
                    <p className="mb-4 text-sm text-left leading-relaxed text-gray-800">
                      {altMovie.Production}
                    </p>
                  </div>
                  <div className="flex flex-col ">
                    <p className=" text-sm font-semibold leading-normal text-gray-900">
                      Website
                    </p>
                    <p className="mb-4 text-sm text-left leading-relaxed text-gray-800">
                      <a href={altMovie.Website}>{altMovie.Website}</a>
                    </p>
                  </div>

                  {movie.budget > 0 && (
                    <div className="flex flex-col">
                      <p className=" text-sm font-semibold leading-normal text-gray-900">
                        Budget
                      </p>
                      <p className="w-full mb-4 text-xs text-left leading-relaxed text-gray-800">
                        $
                        {new Intl.NumberFormat('en-us', {
                          maximumSignificantDigits: 2
                        }).format(movie.budget)}
                      </p>
                    </div>
                  )}

                  {movie.revenue > 0 && (
                    <div className="flex flex-col">
                      <p className=" text-sm font-semibold leading-normal text-gray-900">
                        Revenue
                      </p>
                      <p className="w-full mb-4 text-xs text-left leading-relaxed text-gray-800">
                        $
                        {new Intl.NumberFormat('en-us', {
                          maximumSignificantDigits: 2
                        }).format(movie.revenue)}
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-2/3 text-left  flex flex-wrap  items-start justify-between p-2">
                  <div className="flex w-full flex-row justify-between">
                    <h3 className="text-3xl text-left font-semibold leading-tight mt-1 text-gray-900   ">
                      Cast
                    </h3>
                    <button
                      onClick={toggleMoreActors}
                      className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 rounded w-32"
                    >
                      Show {!moreActors ? 'more' : 'less'}
                    </button>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    {cast &&
                      cast.map((x, i) => {
                        const image = x.profile_path
                          ? `https://image.tmdb.org/t/p/original${x.profile_path}`
                          : `http://www.behrmancap.com/wp-content/uploads/2015/03/person-placeholder.jpg`;
                        if (i < actorToggle) {
                          return (
                            <div key={i} className="w-1/3 p-2">
                              <div className="w-full  rounded overflow-hidden shadow-lg">
                                <img
                                  className="w-full"
                                  src={image}
                                  alt="Sunset in the mountains"
                                />
                                <div className="p-2">
                                  <div className=" text-md ">{x.name}</div>
                                  <p className="text-gray-700  text-sm text-base">
                                    {x.character}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </div>
                  <div className="flex w-full flex-wrap -mx-2 justify-center">
                    <button
                      onClick={toggleMoreActors}
                      className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 rounded w-32"
                    >
                      Show {!moreActors ? 'more' : 'less'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full text-left  flex flex-wrap  items-center justify-between p-4">
                <div className="flex w-full flex-row justify-center">
                  <h3 className="text-3xl text-left font-semibold leading-tight mt-1 text-gray-900 mb-4   ">
                    Recomendations
                  </h3>
                </div>
                <div className=" grid  grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5  gap-4 ">
                  {recomendations.map((x, i) => {
                    return <MovieCard key={i} movie={x} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MoviePage;
