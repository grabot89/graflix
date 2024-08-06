import React from "react";
import { Review } from "../../types/interfaces";

const TvShowReview: React.FC<Review> =  (props) => {
  return (
    <>
      <p>Review By: {props.author} </p>
      <p>{props.content} </p>
    </>
  );
};
export default TvShowReview
