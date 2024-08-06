import React, {MouseEvent, useContext} from "react";
import IconButton from "@mui/material/IconButton";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import {BaseActorProps} from "../../types/interfaces"
import { ActorsContext } from "../../contexts/actorsContext";

const AddToFollowingIcon: React.FC<BaseActorProps> = (actor) => {
  const context = useContext(ActorsContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFollows(actor);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <AccessibilityIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFollowingIcon;