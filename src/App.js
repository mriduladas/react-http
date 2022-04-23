import React, {useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  // const dummyMovies = [];
  const [movies, setMovies]= useState([]);
  const [isLoading, setIsLoading]= useState(false);
  const [error, setError] = useState(null);

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

  //This download the json to PC
  const handleSaveToPC = (jsonData,filename) => {
    //Uncomment to download
    // const fileData = JSON.stringify(jsonData);
    // const blob = new Blob([fileData], {type: "text/plain"});
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.download = `${filename}.json`;
    // link.href = url;
    // link.click();
  }



  const fetchMovies =useCallback(async ()=>{
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch('https://swapi.py4e.com/api/films')
      if(!response.ok){
        throw new Error('Something went wrong')
      }
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
        handleSaveToPC(data,'abcd');
        setMovies(transformedMovies);
        
    }catch(error){
      setError(error.message);
    }
    setIsLoading(false);

  },[]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies])

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0  && <MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && !error && <p>No Movies Found</p>}
        {isLoading && <p>Loading..</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
