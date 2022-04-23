import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  // const dummyMovies = [];
  const [movies, setMovies]= useState([]);
  const [isLoading, setIsLoading]= useState(false);

  // function fetchMovies(){
  //   fetch('https://swapi.py4e.com/api/films')
  //   .then((response)=> {return response.json()})
  //   .then((data)=> {
  //     const transformedMovies = data.results.map((movieData) =>{
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }}
        
  //     );
  //     console.log(transformedMovies)
  //     setMovies(transformedMovies);
  //   })
  // }


  async function fetchMovies(){
    setIsLoading(true);
    const response = await fetch('https://swapi.py4e.com/api/films')
    const data = await response.json();
   
    const transformedMovies = data.results.map((movieData) =>{
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }}
        
      );
      console.log(transformedMovies)
      setMovies(transformedMovies);
      setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0  && <MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && <p>No Movies Found</p>}
        {isLoading && <p>Loading..</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
