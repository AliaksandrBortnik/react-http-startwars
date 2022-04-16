import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://swapi.dev/api/films/');

      if (!response.ok) {
        throw new Error('Something wrong happened, try again...');
      }

      const data = await response.json();

      const transformedMovies = data.results.map(item => ({
        id: item.episode_id,
        title: item.title,
        openingText: item.opening_crawl,
        releaseDate: item.release_date
      }));

      setMovies(transformedMovies);
    } catch (e) {
      console.dir(e)
      setError(e.message);
    }

    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        { !isLoading && !error && movies.length === 0 && <p>No data found.</p>}
        {
          isLoading ? <p>Loading data...</p> :
          <MoviesList movies={movies} />
        }
        { error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
