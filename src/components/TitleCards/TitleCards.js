import React, { useEffect, useState } from 'react'
import "./TitleCards.css"
import { Link } from 'react-router-dom';

function TitleCards({title, category}) {
  const [apiData, setApiData] = useState([]);
  const url = `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjllN2E5NTE3ZjNmZTdlZjNjZmI4OTE3Y2FhOGNmZiIsIm5iZiI6MTc0NzAyMzg1Ni43NzUsInN1YiI6IjY4MjE3N2YwYWZjOTY2NGQ4NTVhMjk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ap80tdRoRcofjCzHA8UGgwpYTNQf-_uarwNRvlpUT9w'
    }
  };
  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        setApiData(res.results ? res.results : []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='title-cards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className='card-list'>
          {apiData.map((card, index) => {
            return <Link to={`/player/${card.id}`} className='card' key={index}>
              <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt=""/>
              <p>{card.original_title}</p>
            </Link>
          })}
        </div>
    </div>
  )
}

export default TitleCards