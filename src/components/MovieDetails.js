import { useState, useEffect } from "react";
import { useKey } from "../hooks/useKey";
import Loader from "./Loader";
import StarRating from "./StarRating";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.id).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.id === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie = {
      id: movie.id,
      title: movie.title,
      year: movie.year,
      poster: movie.poster,
      imdbRating: Number(movie.imdb_rating),
      runtime: Number(movie.run_time.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/movies/")
  //     .then((response) => response.json())
  //     .then((data) => setMovie(data));
  // }, []);

  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `http://3.145.150.247:8000/api/movies/${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  // useEffect(
  //   function () {
  //     async function getMovieDetails() {
  //       setIsLoading(true);
  //       const res = await fetch(
  //         `http://www.omdbapi.com/?&apikey=${KEY}&i=${selectedId}`
  //       );
  //       const data = await res.json();
  //       setMovie(data);
  //       setIsLoading(false);
  //     }
  //     getMovieDetails();
  //   },
  //   [selectedId, KEY]
  // );

  useEffect(
    function () {
      if (!movie.title) return;
      document.title = `Movie | ${movie.title}`;

      return function () {
        document.title = "MovieMate";
      };
    },
    [movie.title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.poster} alt={`Poster of ${movie.title}`} />
            <div className="details-overview">
              <h2>{movie.title}</h2>
              <p>
                {movie.released} &bull; {movie.run_time}
              </p>
              <p>{movie.genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdb_rating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating}
                  <span>⭐</span>'s
                </p>
              )}
            </div>
            <p>
              <em>{movie.plot}</em>
            </p>
            <p>Starring {movie.actors}</p>
            <p>Directed by {movie.director}</p>
          </section>
        </>
      )}
    </div>
  );
}
