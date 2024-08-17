import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface PlaylistCardProps {
  id: string;
  name: string;
  movieCount: number;
  onClick: (id: string) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ id, name, movieCount, onClick }) => {
  return (
    <Card onClick={() => onClick(id)}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">{movieCount} movies</Typography>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
