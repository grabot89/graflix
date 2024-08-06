import React, { useState } from "react";
import FilterActorsCard from "../filterActorsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseActorProps } from "../../types/interfaces";

export const nameFilter = (actor: BaseActorProps, value: string): boolean => {
    return actor.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const adultFilter = (actor: BaseActorProps, value: boolean): boolean => {
    return value ? actor.adult : true;
};

export const genderFilter = (actor: BaseActorProps, value: number): boolean => {
    return value === actor.gender;
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

interface ActorFilterUIProps {
    onFilterValuesChange: (f: string, s: string | boolean) => void;
    nameFilter: string;
    adultFilter: boolean;
    genderFilter: string;
}


const ActorFilterUI: React.FC<ActorFilterUIProps> = ({ onFilterValuesChange, nameFilter, adultFilter, genderFilter }) => {
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
                <FilterActorsCard
                    onUserInput={onFilterValuesChange}
                    nameFilter={nameFilter}
                    adultFilter={adultFilter}
                    genderFilter={genderFilter}
                />
            </Drawer>
        </>
    );
};

export default ActorFilterUI;