import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "primereact/rating";
import axiosInstance from "../../apis/config"; // Adjust the path to where axiosInstance is located
import styles from "./TvShowsDetails.module.css";
import TVShowReviews from "../TvShowsReviews/TvShowReviews"; // Adjust the path as needed

const TVShowDetails = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/tv/${id}`)
      .then((response) => setTvShow(response.data))
      .catch((error) =>
        console.error("Error fetching TV show details:", error)
      );
  }, [id]);

  return (
    <div className={styles.container}>
      {tvShow && (
        <div className={styles.card}>
          <div className={styles.imgContainer}>
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
              alt={tvShow.name}
            />
          </div>
          <div className={styles.details}>
            <h1 className={styles.title}>{tvShow.name}</h1>
            <p className={styles.date}>
              First Air Date:{" "}
              {new Date(tvShow.first_air_date).toLocaleDateString()}
            </p>
            <div className={styles.rating}>
              <Rating value={tvShow.vote_average / 2} readOnly cancel={false} />
            </div>
            <p className={styles.overview}>{tvShow.overview}</p>
            <div className={styles.genres}>
              {tvShow.genres.map((genre) => (
                <span key={genre.id} className={styles.genre}>
                  {genre.name}
                </span>
              ))}
            </div>
            <p className={styles.language}>
              <strong>Language:</strong> {tvShow.original_language}
            </p>
            <p className={styles.seasons}>
              <strong>Seasons:</strong> {tvShow.number_of_seasons}
            </p>
            <div className={styles.production}>
              <div className={styles.productionList}>
                {tvShow.production_companies.map(
                  (company) =>
                    company.logo_path && (
                      <div>
                        <strong key={company.id}>Production Companies:</strong>
                        <div className={styles.company}>
                          <img
                            src={`${import.meta.env.VITE_TMDB_IMG_URL}${
                              company.logo_path
                            }`}
                            alt={company.name}
                            className="img-fluid"
                            style={{width: "200px"}}
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <TVShowReviews />
    </div>
  );
};

export default TVShowDetails;
