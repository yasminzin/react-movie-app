import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../apis/config"; // Adjust the path to where axiosInstance is located
import styles from "./Reviews.module.css";

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [noReviews, setNoReviews] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/movie/${id}/reviews`)
      .then((res) => {
        setReviews(res.data.results);
        setNoReviews("No Reviews yet!")
      })
      .catch((err) => console.error("Error fetching reviews", err));
  }, [id]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.slice(0, 3).map((review) => (
          <div key={review.id} className={styles.card}>
            <div className={styles.header}>
              <div className={styles.avatar}>
                {review.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className={styles.author}>
                  <strong>A review by {review.author}</strong>
                </p>
                <p className={styles.date}>
                  Written on{" "}
                  {new Date(review.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className={styles.content}>
              <p>{review.content.split(" ").slice(0, 40).join(" ")}...</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center fw-normal bg-light p-3 fs-5">
          {noReviews}
        </p>
      )}
    </div>
  );
};

export default Reviews;
