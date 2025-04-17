import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import MovieCard from "../../components/MovieCard/MovieCard";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router";
import axiosInstance from "../../apis/config";
import styles from "./MoviesList.module.css";
import { useSelector } from "react-redux";

const MoviesList = () => {
  const { language } = useSelector((state) => state.languages);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/movie/now_playing", { params: { page } })
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) =>
        console.error("Error fetching now playing movies", error)
      );
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  // Translated text
  const welcomeText = language === "ar" 
    ? "مرحبًا بك في تطبيق الأفلام الخاص بنا" 
    : "Welcome to our movie app";
  const descriptionText = language === "ar" 
    ? "ملايين الأفلام والبرامج التلفزيونية والأشخاص لاكتشافهم. استكشف الآن." 
    : "Millions of movies, TV shows and people to discover. Explore now.";
  const sectionTitle = language === "ar" ? "يعرض الآن" : "Now Playing";
  const placeholderText = language === "ar" ? "ابحث واكتشف..." : "Search and explore...";
  const searchButtonText = language === "ar" ? "بحث" : "Search";
  const noMoviesText = language === "ar" ? "لم يتم العثور على أفلام." : "No movies found.";

  return (
    <Container className="my-4">
      {/* Search Section */}
      <div className={styles.searchSection}>
        <h1 className={styles.welcomeText}>{welcomeText}</h1>
        <p className={styles.descriptionText}>{descriptionText}</p>
        <form onSubmit={handleSearch} className={styles.searchForm} role="search">
          <input
            className={styles.searchInput}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholderText}
            aria-label="Search"
          />
          <button className={styles.searchBtn} type="submit">
            {searchButtonText}
          </button>
        </form>
      </div>

      {/* Now Playing Section */}
      <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
      {movies.length > 0 ? (
        <Row xs={1} md={3} lg={6} className="g-4">
          {movies.map((movie) => (
            <Col key={movie.id} className="mb-4">
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>{noMoviesText}</p>
      )}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </Container>
  );
};

export default MoviesList;