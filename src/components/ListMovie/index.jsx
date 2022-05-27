import movieApi from "api/movieApi";
import CardMovie from "components/CardMovie";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import "./ListMovie.scss";

ListMovie.propTypes = {
  movieType: PropTypes.string,
};
ListMovie.defaultProps = {
  movieType: "",
};

function ListMovie(props) {
  let movieType = props.movieType;
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setLoading(false);
      setMovieList(response.results);
    } catch (error) {
      setError(error);
      console.log("Failed to fetch product list", error);
    }
  };
  useEffect(() => {
    fetchMovieList();
    setLoading(true);
  }, [movieType]);

  const handleRefesh = () => {
    window.location.reload();
  };
  return (
    <div>
      <Container>
        <Button variant="primary" onClick={handleRefesh}>
          refresh
        </Button>
        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger">{error}</Alert>}
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
