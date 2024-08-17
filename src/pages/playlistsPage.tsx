import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { GenreContext } from "../contexts/genresContext";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

const PlaylistsPage: React.FC = () => {
  const { playlist, themedPlaylists } = useContext(MoviesContext);
  const { genres } = useContext(GenreContext);
  const navigate = useNavigate();

  const getGenreName = (genreId: number) => {
    const genre = genres.find((g) => g.id === genreId);
    return genre ? genre.name : `Genre ${genreId}`;
  };

  const allPlaylists = [
    { id: "original", name: "My Playlist", movieIds: playlist },
    ...Object.keys(themedPlaylists).map((genreId) => ({
      id: genreId,
      name: `${getGenreName(Number(genreId))} Playlist`,
      movieIds: themedPlaylists[Number(genreId)],
    })),
  ];

  const handleCardClick = (id: string) => {
    navigate(`/playlists/${id}`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Playlists
      </Typography>
      <Grid container spacing={3}>
        {allPlaylists.map((playlist) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={playlist.id}>
            <Card onClick={() => handleCardClick(playlist.id)}>
              <CardContent>
                <Typography variant="h6">{playlist.name}</Typography>
                <Typography variant="body2">
                  {playlist.movieIds.length} movies
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlaylistsPage;
