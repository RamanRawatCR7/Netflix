import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
      async function fetchData() {
        const request = await axios.get(fetchURL);
        setMovies(request.data.results);
        // console.log(request.data.results);
        return request;
      }
      fetchData();
  }, [fetchURL]);
    
  const handleClick = (movie) => {
    if(trailerUrl){
      setTrailerUrl('');
    }else{
      movieTrailer(movie?.original_title || movie?.name || "")
      .then((url) => {
        console.log(movie?.name);
        console.log(url);
        console.log(url.substr(10));
        const urlParams = new URLSearchParams(new URL(url).search);
        console.log(urlParams.get('v'));
        setTrailerUrl(urlParams.get('v'));
      }).catch(error => console.log(error))
    }
  }

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row_posters'>
        {movies.map(movie =>(
          <img
          key={movie.id}
          onClick={() => handleClick(movie)}
          className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          src={base_url + (isLargeRow ? movie.poster_path : movie.backdrop_path)}
          alt={movie.name}/>
        ))}
      </div>
    <div style={{marginLeft:'-20px'}}>
      {trailerUrl && <iframe width="100%" height="390" title='movie'
      src={`https://www.youtube.com/embed/${trailerUrl}?&autoplay=1`} frameborder="0" allowFullScreen="1"/>}
    </div>
  </div>
  )
}

export default Row