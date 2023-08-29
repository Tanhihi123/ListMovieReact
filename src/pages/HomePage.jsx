import React, { Fragment, useEffect } from "react";
import MovieList from "../components/movies/MovieList";
import Banner from "../components/banner/Banner";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home Page";
  },[]);
  return (
    <Fragment>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-white mb-10 text-2xl font-bold">
          Now Playing
        </h2>
        <MovieList category={"now_playing"}></MovieList>
      </section>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-white mb-10 text-2xl font-bold">
          Top Rated
        </h2>
        <MovieList category={"top_rated"}></MovieList>
      </section>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-white mb-10 text-2xl font-bold">
          Trending
        </h2>
        <MovieList category={"popular"}></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
