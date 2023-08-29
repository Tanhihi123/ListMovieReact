import React, { useEffect, useState } from "react";
import MovieList from "../components/movies/MovieList";
import MovieCard from "../components/movies/MovieCard";
import useSWR from "swr";
import { fetcher } from "../config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
// Search ( useEffect(else) -> load -> filter -> filterdebounce -> useEffect(if) -> load(dataoffilterdebounce))
// const pageCount = 5;
const itemsPerPage = 20;
const MoviePage = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [swapPage, setSwapPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/movie/popular?api_key=9d4f7d890ff379705bfcdca8f46aec9d"
  );
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  // console.log(url)
  const { data, error, isLoading } = useSWR(url, fetcher);
  // console.log(data);
  useEffect(() => {
    document.title = "Movie Detail";
  },[])
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=9d4f7d890ff379705bfcdca8f46aec9d&query=${filterDebounce}&page=${swapPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=9d4f7d890ff379705bfcdca8f46aec9d&page=${swapPage}`
      );
    }
  }, [filterDebounce, swapPage]);
  const movies = data?.results || [];
  // if(!data) return null;
  // const { page, total_pages } = data;
  // console.log(data);
  useEffect(() => {
    if (!data || !data.total_results) return;
    const endOffset = itemOffset + itemsPerPage;
    setPageCount(Math.min(Math.ceil(data.total_results / itemsPerPage)),20);
  }, [data, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setSwapPage(event.selected + 1)
  };
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10 ">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here to search ...."
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 bg-primary text-white rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 460 512"
            className="w-5 h-5"
          >
            <path d="M220.6 130.3l-67.2 28.2V43.2L98.7 233.5l54.7-24.2v130.3l67.2-209.3zm-83.2-96.7l-1.3 4.7-15.2 52.9C80.6 106.7 52 145.8 52 191.5c0 52.3 34.3 95.9 83.4 105.5v53.6C57.5 340.1 0 272.4 0 191.6c0-80.5 59.8-147.2 137.4-158zm311.4 447.2c-11.2 11.2-23.1 12.3-28.6 10.5-5.4-1.8-27.1-19.9-60.4-44.4-33.3-24.6-33.6-35.7-43-56.7-9.4-20.9-30.4-42.6-57.5-52.4l-9.7-14.7c-24.7 16.9-53 26.9-81.3 28.7l2.1-6.6 15.9-49.5c46.5-11.9 80.9-54 80.9-104.2 0-54.5-38.4-102.1-96-107.1V32.3C254.4 37.4 320 106.8 320 191.6c0 33.6-11.2 64.7-29 90.4l14.6 9.6c9.8 27.1 31.5 48 52.4 57.4s32.2 9.7 56.8 43c24.6 33.2 42.7 54.9 44.5 60.3s.7 17.3-10.5 28.5zm-9.9-17.9c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z" />
          </svg>
        </button>
      </div>
      {isLoading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!isLoading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
      <div className="flex items-center justify-center gap-x-5 mt-8 hidden">
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </span>
        {new Array(pageCount).fill(0).map((item, index) => (
          <span
            className="cursor-pointer inline-block px-4 py-2 bg-white text-slate-900"
            key={index}
            onClick={() => setSwapPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MoviePage;
