import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MovieCard from "../../components/movieCard";
import { BaseMovieProps } from "../../types/interfaces"; 
import AddToPlaylistIcon from "../cardIcons/addToPlaylist";

const FantasyMovieList: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("fantasyMovies") || "[]");
    setMovies(storedMovies);
  }, []);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Created Movies
        </Typography>
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <MovieCard 
                movie={movie} 
                action={(movie: BaseMovieProps) => (
                    <>
                      <AddToPlaylistIcon {...movie} />
                    </>
                  )}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FantasyMovieList;
