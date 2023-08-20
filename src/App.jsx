import { Fragment ,lazy , Suspense} from "react";
import { NavLink, Route, Router, Routes } from "react-router-dom";
import "swiper/css"
import MovieList from "./components/movies/MovieList";
import Banner from "./components/banner/Banner";
import Header from "./components/layout/header";
import Main from "./components/layout/Main";
import Page404 from "./pages/Page404";
// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailPage from "./pages/MovieDetailPage";
const HomePage = lazy(() => import("./pages/HomePage"))
const MoviePage = lazy(() => import("./pages/MoviePage"))
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"))
function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
            <Route element={<Main></Main>}>
                <Route path="/" element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage></>
                }></Route>
                <Route path="/movies" element={<><MoviePage></MoviePage></>}></Route>
              <Route path="/movie/:movieID" element={<MovieDetailPage></MovieDetailPage>}></Route>
            </Route>
            <Route path="*" element={<Page404></Page404>}></Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
