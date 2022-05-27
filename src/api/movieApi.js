import axiosClient from "./axiosClient";
const apiKey = "?api_key=d5afa24d4b034764624f71bb875ab88d";
const productApi = {
  getAllMovie: (params) => {
    const url = `/movie/popular${apiKey}`;
    return axiosClient.get(url, { params });
  },
  getAllMovieNowPlaying: (params) => {
    const url = `/movie/now_playing${apiKey}`;
    return axiosClient.get(url, { params });
  },
  getAllMovieTopRated: (params) => {
    const url = `/movie/top_rated${apiKey}`;
    return axiosClient.get(url, { params });
  },
  getMovieDetail: (id) => {
    const url = `/movie/${id}${apiKey}`;
    return axiosClient.get(url);
  },
};

export default productApi;
