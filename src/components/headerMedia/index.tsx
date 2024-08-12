import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import { BaseMediaProps } from "../../types/interfaces";

const styles = {
  root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

// Accept a generic type for movie, actor, or TV show
const MediaHeader: React.FC<BaseMediaProps> = (media) => {
  const favourites = JSON.parse(localStorage.getItem("favourites") || '[]');

  // Determine whether to use title or name based on what exists
  const displayName = media.title || media.name;

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      {favourites.some((favourite: BaseMediaProps) => favourite.id === media.id) ? 
        <Avatar sx={styles.avatar}>
          <FavoriteIcon />
        </Avatar> : null}

      <Typography variant="h4" component="h3">
        {displayName}{"   "}
        {media.homepage && (
          <a href={media.homepage}>
            <HomeIcon color="primary" fontSize="large" />
          </a>
        )}
        <br />
        {media.tagline && <span>{media.tagline}</span>}
      </Typography>

      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MediaHeader;
