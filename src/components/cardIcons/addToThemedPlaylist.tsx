import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import { BaseMovieProps } from "../../types/interfaces";
import { toast } from 'react-toastify';

const AddToThemedPlaylistIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToThemedPlaylist(movie);
    toast.success("Movie added to themed playlists");
  };

  return (
    <IconButton aria-label="add to themed playlists" onClick={onUserSelect}>
      <QueuePlayNextIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToThemedPlaylistIcon;
