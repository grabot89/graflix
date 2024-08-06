import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { ActorDetailsProps, TvShowDetailsProps } from "../../types/interfaces";
import { getTvShowCredits } from "../../api/tmdb-api";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { Link } from "react-router-dom";
import TvShowReviews from "../tvShowReviews";

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

const TvShowDetails: React.FC<TvShowDetailsProps> = (tvShow) => {
    const { data, error, isLoading, isError } = useQuery<ActorDetailsProps[], Error>(
        ["credits", tvShow.id],
        () => getTvShowCredits(tvShow.id)
    );

    const [drawerOpen, setDrawerOpen] = useState(false);
    
    if (isLoading) {
        return <Spinner />;
    }
    
    if (isError) {
        return <h1>{(error as Error).message}</h1>;
    }

    const cast = data || [];
    const tvShowWithCast = { ...tvShow, cast };

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {tvShowWithCast.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {tvShowWithCast.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${tvShowWithCast.number_of_seasons} seasons.`} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${tvShowWithCast.number_of_episodes} episodes.`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${tvShowWithCast.vote_average} (${tvShowWithCast.vote_count}`}
                />
                <Chip label={`First aired: ${tvShowWithCast.first_air_date}`} />
            </Paper>
            <Typography variant="h5" component="h3">
                Cast
            </Typography>
            <Paper component={"ul"} sx={styles.chipSet}>
                {tvShowWithCast.cast.map((c) => (
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
                <TvShowReviews {...tvShowWithCast} />
            </Drawer>
        </>
    );
};
export default TvShowDetails;