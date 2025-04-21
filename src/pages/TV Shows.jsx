import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axiosInstance from "../apis/config";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./TVShows.module.css";
import { Rating } from "primereact/rating";
import {
  addToWishlist,
  removeFromWishlsit,
} from "../store/slices/WishlistSlice";
import { useNavigate } from "react-router";

export default function TVShows() {
  const [tvShows, setTVShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Wishlist = useSelector((state) =>
    state.wishlist.value?.filter((item) => item.type === "show") || []
  );

  useEffect(() => {
    axiosInstance
      .get(`/tv/popular`, {
        params: { page },
      })
      .then((res) => {
        setTVShows(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const handleViewDetails = (id) => {
    navigate(`/tv/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">TV Shows</h1>
      <form
        onSubmit={handleSearch}
        className="d-flex w-75 mx-auto mb-5"
        role="search"
      >
        <input
          className="form-control me-2 rounded-5"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a TV show ..."
          aria-label="Search"
        />
        <button className="btn btn-warning rounded-5" type="submit">
          Search
        </button>
      </form>

      {tvShows.length > 0 ? (
        <Row xs={1} md={3} lg={6} className="g-4">
          {tvShows.map((show) => (
            <Col key={show.id} className="mb-4">
              <Card className={`${styles.movieCard} shadow-sm h-100`}>
                <div className={styles.posterWrapper}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                    alt={show.name}
                    className={styles.cardImg}
                    onClick={() => handleViewDetails(show.id)}
                  />
                  <div className={styles.ratingCircle}>
                    <CircularProgressbar
                      value={show.vote_average * 10}
                      text={`${Math.round(show.vote_average * 10)}%`}
                      styles={buildStyles({
                        textSize: "30px",
                        textColor: "#fff",
                        pathColor: "#21d07a",
                        trailColor: "#204529",
                      })}
                    />
                  </div>
                </div>
                <Card.Body>
                  <Card.Title
                    className={`fs-6 mt-3 ${styles.cardTitle}`}
                    onClick={() => handleViewDetails(show.id)}
                  >
                    {show.name.split(" ").slice(0, 3).join(" ")}
                  </Card.Title>
                  <Rating
                    className={`${styles.rating} text-warning my-1`}
                    value={show.vote_average / 2}
                    readOnly
                    cancel={false}
                  />
                  <Card.Text className="text-muted">
                    <span className="d-block mb-1">{show.first_air_date}</span>
                    {Wishlist.find((item) => item.id === show.id) ? (
                      <i
                        className="bi bi-heart-fill text-warning d-flex"
                        onClick={() => dispatch(removeFromWishlsit(show))}
                        aria-label="Remove from wishlist"
                        style={{cursor:"pointer"}}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-heart text-warning d-flex"
                        onClick={() =>
                          dispatch(addToWishlist({ ...show, type: "show" }))
                        }
                        aria-label="Add to wishlist"
                        style={{cursor:"pointer"}}
                      ></i>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No TV shows found.</p>
      )}

      <div className="w-100 d-flex justify-content-center my-5">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              onClick={() =>
                page > 1 ? setPage((prev) => prev - 1) : setPage(1)
              }
              aria-label="Previous"
            >
              <span aria-hidden="true">«</span>
            </a>
          </li>
          {[1, 2, 3].map((p) => (
            <li key={p} className="page-item">
              <a className="page-link" onClick={() => setPage(p)}>
                {p}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              onClick={() =>
                page < totalPages
                  ? setPage((prev) => prev + 1)
                  : setPage(totalPages)
              }
              aria-label="Next"
            >
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </div>
    </Container>
  );
}