import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

interface Movie {
  title: string
  description: string
  imgUrl: string
  imdbUrl: string
  imdbId: string
}

function getVisibleMovies(query: string, movies: Movie[]) {
  return movies.filter(movie => {
    return (
      movie.title
        .toLowerCase()
        .includes(query.toLowerCase().trim())
    || movie.description
      .toLowerCase()
      .includes(query.toLowerCase().trim())
    );
  });
}

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const visibleMovies = getVisibleMovies(query, moviesFromServer);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={query}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">
        Sidebar goes here
      </div>
    </div>
  );
};