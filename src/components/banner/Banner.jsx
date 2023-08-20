import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=9d4f7d890ff379705bfcdca8f46aec9d`,
    fetcher
  );
  const navigate = useNavigate();
  const movies = data?.results || [];
  // console.log(movies);
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden ">
      <Swiper grabCursor={true} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const { title, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg select-none"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text_banner mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md hover:border-pink-400 cursor-pointer">
            Action
          </span>
          <span className="py-2 px-4 border border-white rounded-md hover:border-pink-400 cursor-pointer">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md hover:border-pink-400 cursor-pointer">
            Drama
          </span>
        </div>
        {/* <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
              Watch Now
            </button> */}
        <Button onClick={() => navigate(`/movie/${id}`)} bgColor="secondary" className="w-auto">
          Detail
        </Button>
      </div>
    </div>
  );
}
export default Banner;
