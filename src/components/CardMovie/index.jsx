import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./CardMovie.scss";
CardMovie.propTypes = {};

function CardMovie(props) {
  const movie = props.movie;
  const imagePath = `https://www.themoviedb.org/t/p/w260_and_h390_bestv2${movie.backdrop_path}`;
  return (
    <Card className="card-movie" style={{ minWidth: "10rem" }}>
      <Card.Img variant="top" src={imagePath} />
      <Card.Body>
        <Card.Title>{movie.original_title}</Card.Title>
        <Card.Text>{movie.release_date}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardMovie;
