import React, { useState } from "react";
import FilterActorsCard from "../filterActorsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseActorProps } from "../../types/interfaces";

export const nameFilter = (actor: BaseActorProps, value: string): boolean => {
    if (value === "") {
        return true;
    }
    return actor.name.toLowerCase().search(value.toLowerCase()) !== -1;
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
        backgroundColor: "#5fe723",
    },
};

interface ActorFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    nameFilter: string;
}


const ActorFilterUI: React.FC<ActorFilterUIProps> = ({ onFilterValuesChange, nameFilter }) => {
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
                />
            </Drawer>
        </>
    );
};

export default ActorFilterUI;