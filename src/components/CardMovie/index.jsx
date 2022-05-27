import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./CardMovie.scss";
import { NavLink } from "react-router-dom";
CardMovie.propTypes = {};

function CardMovie(props) {
  const movie = props.movie;
  const movieHef = `/movie/${movie.id}`;
  const imagePath = `https://www.themoviedb.org/t/p/w260_and_h390_bestv2${movie.backdrop_path}`;
  return (
    <Card className="card-movie" style={{ minWidth: "10rem" }}>
      <NavLink to={movieHef}>
        <Card.Img variant="top" src={imagePath} />
      </NavLink>
      <Card.Body>
        <NavLink className="card-movie__title" to={movieHef}>
          <Card.Title>{movie.original_title}</Card.Title>
        </NavLink>
        <Card.Text>{movie.release_date}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardMovie;
