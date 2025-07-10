import React from "react";
// { useEffect, useState }
// Style
import "../style/movieCard.scss";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";
  return (
    <div>
      <div className="card">
        <div className="img_box">
          <img src={imageUrl} alt={movie.title} />
        </div>
        <h4>{movie.title}</h4>
      </div>
    </div>
  );
};

export default MovieCard;
