import React from "react";
import MyFantasyMovie from "../components/myFantasyMovie";
import FantasyMovieList from "../components/fantasyMovieList";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";

const FantasyMoviesPage: React.FC = () => {
  return (
    <Container className="container">
      <Paper elevation={3} className="paper">
      <MyFantasyMovie />
      <FantasyMovieList />
      </Paper>
    </Container>
  );
};

export default FantasyMoviesPage;
