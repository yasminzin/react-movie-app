import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router";
import HeaderLayout from "./components/HeaderLayout";
import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchResult from "./pages/searchPage/SearchResults";
import React from "react";
import Navbar from "./components/Navbar";
import  styles from './styles/Navbar.module.css'
const TVShows = lazy(() => import("./pages/TV Shows"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MoviesWishlist = lazy(() => import("./pages/MoviesWishlist"));
const TVshowswishlist = lazy(() => import("./pages/TVshowsWishlist"));
const MovieDetails = lazy(() => import("./pages/MovieDetails/MovieDetails"));
const MoviesList = lazy(() => import("./pages/MoviesList/MoviesList"));
const TVShowDetails = lazy(() =>
  import("./pages/TvShowsDetails/TvShowsDetails")
);

function App() {

  const { language } = useSelector((state) => state.languages);
  const direction = language === "ar" ? styles.rtl : styles.ltr;
  return (
    
    <div className={direction}>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route element={<HeaderLayout />}> */}
            <Route path="/tv" element={<TVShows />} />
            <Route path="/movies/wishlist" element={<MoviesWishlist />}></Route>
            <Route path="/tv/wishlist" element={<TVshowswishlist />}></Route>
            <Route path="/search" element={<SearchResult />} />
            <Route path="/" element={<MoviesList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv/:id" element={<TVShowDetails />} />
          {/* </Route> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
