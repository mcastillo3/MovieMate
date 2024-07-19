import { useEffect, useState } from "react";

//const KEY = "139c695e";
//const url = `http://www.omdbapi.com/?&apikey=${KEY}&s=${query}`;

export function useMovies(query, KEY) {
  const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/movies/")
  //     .then((response) => response.json())
  //     .then((data) => setMovies(data));
  // }, []);

  useEffect(
    function () {
      async function fetchMovies() {
        const res = await fetch(
          `http://localhost:8000/api/movies/?title=${query}`
        );
        const data = await res.json();
        setMovies(data);
      }

      if (query.length < 3) return setMovies([]);

      fetchMovies();
    },
    [query]
  );

  return { movies };

  // const controller = new AbortController();

  // async function fetchMovies() {
  //   try {
  //     setIsLoading(true);
  //     setError("");

  //     const res = await fetch(
  //       `http://www.omdbapi.com/?&apikey=${KEY}&s=${query}`,
  //       { signal: controller.signal }
  //     );

  //     if (!res.ok)
  //       throw new Error("Something went wrong with fetching movies");

  //     const data = await res.json();

  //     if (data.Response === "False") throw new Error("Movie not found");

  //     setMovies(data.Search);
  //     setError("");
  //   } catch (err) {
  //     if (err.name !== "AbortError") {
  //       console.log(err.message);
  //       setError(err.message);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // if (query.length < 3) {
  //   setMovies([]);
  //   setError("");
  //   return;
  // }

  // fetchMovies();

  // return function () {
  //   controller.abort();
  // };
  // },
  // [query, KEY]);
  // return { movies, isLoading, error };
}
