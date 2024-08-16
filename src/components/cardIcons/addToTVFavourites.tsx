import React, {MouseEvent, useContext} from "react";
import { TvShowsContext } from "../../contexts/tvShowsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BaseTvShowProps} from "../../types/interfaces"
import { toast } from "react-toastify";

const AddToFavouritesIcon: React.FC<BaseTvShowProps> = (tvShow) => {
  const context = useContext(TvShowsContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(tvShow);
    toast.success("TV Show added to favourites");
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;