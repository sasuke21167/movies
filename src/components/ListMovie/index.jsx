import movieApi from "api/movieApi";
import CardMovie from "components/CardMovie";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ListMovie.scss";

ListMovie.propTypes = {
  movieType: PropTypes.string,
};

function ListMovie(props) {
  const movieType = props.movieType;
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const params = {
          page: 1,
        };
        let response;
        if (!movieType) {
          return;
        }
        if (movieType === "movie popular") {
          response = await movieApi.getAllMovie(params);
        }
        if (movieType === "movie now playing") {
          response = await movieApi.getAllMovieNowPlaying(params);
        }
        if (movieType === "movie top rated") {
          response = await movieApi.getAllMovieTopRated(params);
        }
        setMovieList(response.results);
      } catch (error) {
        console.log("Failed to fetch product list", error);
      }
    };

    fetchMovieList();
  }, [movieType]);

  return (
    <div>
      <Container>
        <Row className="movie-grid" gap={3}>
          {movieList.map((movie) => (
            <Col key={movie.id} xs="12" md="6" lg="3" className="col-card">
              <CardMovie movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ListMovie;
