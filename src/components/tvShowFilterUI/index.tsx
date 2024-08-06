import React, { useState } from "react";
import FilterTvShowsCard from "../filterTvShowsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseTvShowProps } from "../../types/interfaces";

export const nameFilter = (tvShow: BaseTvShowProps, value: string): boolean => {
    return tvShow.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (tvShow: BaseTvShowProps, value: string) => {
    const genreId = Number(value);
    const genreIds = tvShow.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
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
        backgroundColor: "#f50057",
    },
};

interface TvShowFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    nameFilter: string;
    genreFilter: string;
}


const TvShowFilterUI: React.FC<TvShowFilterUIProps> = ({ onFilterValuesChange, nameFilter, genreFilter }) => {
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
                <FilterTvShowsCard
                    onUserInput={onFilterValuesChange}
                    nameFilter={nameFilter}
                    genreFilter={genreFilter}
                />
            </Drawer>
        </>
    );
};

export default TvShowFilterUI;