
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaHeart } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishlsit,
} from "../../store/slices/WishListSlice";
import "react-circular-progressbar/dist/styles.css";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.value || []);

  const isLiked = wishlist.some((item) => item.id === movie.id);

  const handleLike = (e) => {
    e.preventDefault(); // Prevent link click
    if (isLiked) {
      dispatch(removeFromWishlsit(movie));
    } else {
      dispatch(addToWishlist({ ...movie, type: "movie" }));
    }
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card className={`${styles.movieCard} shadow-sm`}>
        <div className={styles.posterWrapper}>
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className={`${styles.cardImg}`}
          />
          <div className={styles.ratingCircle}>
            <CircularProgressbar
              value={movie.vote_average * 10}
              text={`${Math.round(movie.vote_average * 10)}%`}
              styles={buildStyles({
                textSize: "30px",
                textColor: "#fff",
                pathColor: "#21d07a",
                trailColor: "#204529",
              })}
            />
          </div>
          <FaHeart
            className={`${styles.heartIcon} ${isLiked ? styles.liked : ""}`}
            onClick={handleLike}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          />
        </div>
        <Card.Body>
          <Card.Title className={`fs-6 ${styles.head}`}>
            {movie.title.split(" ").slice(0, 3).join(" ")}
          </Card.Title>
          <Card.Text className="text-muted">
            {new Date(movie.release_date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MovieCard;