import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import MovieDetail from "./components/MovieDetail";

const ListMovie = React.lazy(() => import("./components/ListMovie"));

function App() {
  return (
    <div className="movie-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/movie" />} />
          <Route
            path="/movie"
            element={<ListMovie movieType="movie popular" />}
          />
          <Route
            path="/movie/now-playing"
            element={<ListMovie movieType="movie now playing" />}
          />
          <Route
            path="/movie/top-rated"
            element={<ListMovie movieType="movie top rated" />}
          />
          <Route path="/movie/*">
            <Route path=":movieId" element={<MovieDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
