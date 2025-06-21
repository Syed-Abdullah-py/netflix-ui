import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state added

  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
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
      .then(data => {
        setApiData(data.results?.[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='player'>
      <img
        src={back_arrow_icon}
        alt='Go Back'
        className='back-arrow'
        onClick={() => navigate(-1)}
      />

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : apiData?.key ? (
        <>
          <iframe
            width='90%'
            height='90%'
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title='Movie Trailer'
            frameBorder='0'
            allowFullScreen
          ></iframe>
          <div className='player-info'>
            <p>{apiData.published_at?.slice(0, 10)}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
        </>
      ) : (
        <p className='no-video'>Trailer not available.</p>
      )}
    </div>
  );
};

export default Player;
