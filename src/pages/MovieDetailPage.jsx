import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";
import MovieCard from "../components/movies/MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
const MovieDetailPage = () => {
  const { movieID } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=9d4f7d890ff379705bfcdca8f46aec9d`,
    fetcher
  );
  useEffect(() => {
    document.title = "Movie Detail";
  },[])
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[450px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <h2 className="text-white text-center text-4xl font-bold mb-10">
        {title}
      </h2>
      {genres.length > 0 && (
        <div className="flex justify-center items-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border-primary text-primary border"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};
function MovieCredits() {
  const { movieID } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=9d4f7d890ff379705bfcdca8f46aec9d`,
    fetcher
  );
  console.log(data);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  console.log(cast);
  return (
    <div className="py-10">
      <h2 className="text-center text-3xl mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.splice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
              className="w-full h-[350px] object-cover rounded-lg"
            />
            <h3 className="text-xl text-center">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieVideos() {
  const { movieID } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=9d4f7d890ff379705bfcdca8f46aec9d`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  //   console.log(results);
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.splice(0, 2).map((item) => (
          <div className="" key={item.id}>
            <h3 className="flex justify-center items-center">
              <span className="mb-5 text-xl font-medium p-4 bg-secondary rounded-lg">
                {item.name}
              </span>
            </h3>
            <div className="w-full aspect-video">
              <iframe
                width="965"
                height="509"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="Youtube video Player"
                // frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullscreen
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieSimilar() {
  const { movieID } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=9d4f7d890ff379705bfcdca8f46aec9d`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10 text-center border border-secondary py-2">
        Similar movies
      </h2>
      <div className="movie-list">
        <Swiper
          grabCursor={"true"}
          spaceBetween={40}
          slidesPerView={"auto"}
          autoplay={{ delay: 3000 }}
        >
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailPage;
