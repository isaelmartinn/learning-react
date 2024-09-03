import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";

function useSearch() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query === "";
      return;
    }

    if (query === "") {
      setError("Cannot search an empty movie");
      return;
    }

    if (query.match(/^\d+$/)) {
      setError("Cannot search a movie with numbers");
      return;
    }

    if (query.length < 3) {
      setError("The search needs to be graether than 3 chars");
      return;
    }

    setError(null);
  }, [query]);

  return { query, setQuery, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { query, setQuery, error } = useSearch();
  const { movies, getMovies, isLoading } = useMovies({ search: query, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => getMovies({ search }), 500),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search: query });
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setQuery(newSearch);

    debouncedGetMovies(newSearch);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Movie searcher</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={query}
            name="query"
            placeholder="Avengers, Alien, Star Wars..."
          />

          <input type="checkbox" onChange={handleSort} checked={sort} />

          <button type="submit">Search</button>
        </form>

        {error && <p style={{ color: "orangered" }}>{error}</p>}
      </header>

      <main>{isLoading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
