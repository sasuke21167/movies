import movieApi from "api/movieApi";
import CardMovie from "components/CardMovie";
import FiledMovie from "components/FieldMovie";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Spinner,
} from "react-bootstrap";
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
  const [checked, setChecked] = useState(false);
  const [searchMovie, setSearchMovie] = useState("");
  const [valueSearch, setValueSearch] = useState("");

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
  const handlecheckChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    const fetchMovieSearchList = async (valueSearch) => {
      try {
        const params = {
          page: 1,
          query: valueSearch,
        };
        if ((valueSearch = "" || !valueSearch)) return;
        const response = await movieApi.getMovieSearch(params);
        setLoading(false);
        setMovieList(response.results);
      } catch (error) {
        setError(error);
        console.log("Failed to fetch product list", error);
      }
    };
    fetchMovieSearchList(valueSearch);
    setLoading(true);
  }, [valueSearch]);

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    setValueSearch(searchMovie);
  };
  return (
    <div>
      <Container>
        {loading && <Spinner animation="border" variant="primary" />}
        <br />
        <Button className="mb-2" variant="primary" onClick={handleRefesh}>
          refresh
        </Button>
        <br />

        <Form>
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              id="list"
              label="list"
              onChange={handlecheckChange}
            />
          </div>
        </Form>

        <Form className="d-flex mb-3" onSubmit={handleSubmitSearch}>
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2 "
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
            aria-label="Search"
          />
          <Button type="submit" variant="outline-success">
            Search
          </Button>
        </Form>

        {error && <Alert variant="danger">{error}</Alert>}
        {checked === false && (
          <Row className="movie-grid" gap={3}>
            {movieList.map((movie) => (
              <Col key={movie.id} xs="12" md="6" lg="3" className="col-card">
                <CardMovie movie={movie} />
              </Col>
            ))}
          </Row>
        )}
        {checked === true && (
          <Container className="movie-field">
            {movieList.map((movie) => (
              <FiledMovie key={movie.id} movie={movie} />
            ))}
          </Container>
        )}
      </Container>
    </div>
  );
}

export default ListMovie;
