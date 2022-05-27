import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import "./MovieDetail.scss";
import movieApi from "api/movieApi";

MovieDetail.propTypes = {};

function MovieDetail(props) {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  let postImg = "";
  let backGroup = "";
  if (movieDetail.poster_path && movieDetail.backdrop_path) {
    postImg = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetail.poster_path}`;
    backGroup = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movieDetail.backdrop_path}`;
  }

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await movieApi.getMovieDetail(movieId);
        setMovieDetail(response);
      } catch (error) {
        console.log("Failed to fetch product list", error);
      }
    };

    fetchMovieDetail();
  }, [movieId]);
  // const postBackGround
  return (
    <div
      className="container-fluid"
      style={{ backgroundImage: `url(${backGroup})` }}
    >
      <div className="movie-background">
        <Container>
          <div className="movie-detail">
            <div className="poster">
              <Card.Img className="poster__img" src={postImg} alt="poster" />
            </div>
            <div className="poster-detail">
              <div className="poster-detail__title">
                <h2>{movieDetail.title}</h2>
              </div>
              <div className="poster-detail__fact">
                <span>{movieDetail.release_date}</span>
              </div>
              <div className="poster-detail__tagline">
                {movieDetail.genres?.map((genre) => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
              </div>
              <div className="poster-detail__overview">
                <h4>Over view</h4>
                <p>{movieDetail.overview}</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default MovieDetail;
