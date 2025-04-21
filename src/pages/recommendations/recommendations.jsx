import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axiosInstance from "../../apis/config"; // Adjust the path to where axiosInstance is located
import styles from "./Recommendations.module.css";

const Recommendations = () => {
  const { id } = useParams();
  const [recommended, setRecommended] = useState([]);
  const [noRecommendations, setNoRecommendations] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/movie/${id}/recommendations`)
      .then((res) => {
        setRecommended(res.data.results);
        setNoRecommendations("No Recommendations yet!")
      })
      .catch((err) => console.error("Error fetching recommendations", err));
  }, [id]);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Recommendations</h2>
      <Row>
        {recommended.length > 0 ? (
          recommended.slice(0, 6).map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={2} className="mb-4">
              <Card className={`${styles.movieCard} shadow-sm`}>
                <div className={styles.posterWrapper}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.cardImg}
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
                </div>
                <Card.Body>
                  <Card.Title className="fs-6 mt-3">
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
            </Col>
          ))
        ) : (
          <p className="text-center fw-normal bg-light p-3 fs-5"></p>
        )}
      </Row>
    </div>
  );
};

export default Recommendations;
