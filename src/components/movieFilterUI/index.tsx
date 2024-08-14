import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseMovieProps } from "../../types/interfaces";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
    if (value === "") {
        return true;
    }
    return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
    const genreId = Number(value);
    const genreIds = movie.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

export const qualityFilter = (movie: BaseMovieProps, value: string): boolean => {
    console.log(value);
    console.log(movie);
    if (value === "All") {
        return true;
    } else if (value === "1") {
        return movie.vote_average < 2;
    } else if (value === "2") {
        return movie.vote_average >= 2 && movie.vote_average < 3;
    } else if (value === "3") {
        return movie.vote_average >= 3 && movie.vote_average < 4;
    } else if (value === "4") {
        return movie.vote_average >= 4 && movie.vote_average < 5;
    } else if (value === "5") {
        return movie.vote_average >= 5 && movie.vote_average < 6;
    } else if (value === "6") {
        return movie.vote_average >= 6 && movie.vote_average < 7;
    } else if (value === "7") {
        return movie.vote_average >= 7 && movie.vote_average < 8;
    } else if (value === "8") {
        return movie.vote_average >= 8 && movie.vote_average < 9;
    } else if (value === "9") {
        return movie.vote_average >= 9;
    }
    return true;
};

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface MovieFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    qualityFilter: string;
}


const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter, qualityFilter }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                    qualityFilter={qualityFilter}
                />
            </Drawer>
        </>
    );
};

export default MovieFilterUI;