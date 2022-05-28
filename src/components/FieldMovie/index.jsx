import React from "react";
import { NavLink } from "react-router-dom";
import "./FieldMovie.scss";
FiledMovie.propTypes = {};

function FiledMovie(props) {
  const movie = props.movie;
  const movieHef = `/movie/${movie.id}`;
  const imagePath = `https://www.themoviedb.org/t/p/w260_and_h390_bestv2${movie.backdrop_path}`;
  return (
    <div className="poster">
      <NavLink to={movieHef}>
        <div className="poster-img">
          <img src={imagePath} alt="" />
        </div>
      </NavLink>

      <div className="poster-detail">
        <NavLink className="poster-detail__title" to={movieHef}>
          <h2>{movie.original_title}</h2>
        </NavLink>
        <div className="poster-detail__date">
          <p>{movie.release_date}</p>
        </div>
        <div className="poster-detail__overview">
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default FiledMovie;
