import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";
//https://api.themoviedb.org/3/movie/now_playing?api_key=9d4f7d890ff379705bfcdca8f46aec9d
const MovieList = ({ category }) => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${category}?api_key=9d4f7d890ff379705bfcdca8f46aec9d`,
    fetcher
  );
  const movies = data?.results || [];
  // console.log(movies);
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
