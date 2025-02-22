import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { ActorDetailsProps, MovieDetailsProps } from "../../types/interfaces";
import { getMovieCredits } from "../../api/tmdb-api";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews'
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { Link } from "react-router-dom";

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
    fab: {
        position: "fixed",
        top: 50,
        right: 2,
    },
};

const MovieDetails: React.FC<MovieDetailsProps> = (movie) => {
    const { data, error, isLoading, isError } = useQuery<ActorDetailsProps[], Error>(
        ["credits", movie.id],
        () => getMovieCredits(movie.id)
    );

    const [drawerOpen, setDrawerOpen] = useState(false); // New
    
    if (isLoading) {
        return <Spinner />;
    }
    
    if (isError) {
        return <h1>{(error as Error).message}</h1>;
    }

    const cast = data || [];
    const movieWithCast = { ...movie, cast };

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {movieWithCast.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {movieWithCast.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${movieWithCast.runtime} min.`} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${movieWithCast.revenue.toLocaleString()}`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${movieWithCast.vote_average} (${movieWithCast.vote_count}`}
                />
                <Chip label={`Released: ${movieWithCast.release_date}`} />
            </Paper>
            <Typography variant="h5" component="h3">
                Cast
            </Typography>
            <Paper component={"ul"} sx={styles.chipSet}>
                {movieWithCast.cast.map((c) => (
                    <Link to={`/actors/${c.id}`}>
                        <li key={c.name}>
                            <Chip label={c.name} />
                        </li>
                    </Link>
                ))}
            </Paper>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <MovieReviews {...movieWithCast} />
            </Drawer>
        </>
    );
};
export default MovieDetails;