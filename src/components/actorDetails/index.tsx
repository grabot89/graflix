
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import CakeIcon from '@mui/icons-material/Cake';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import StarIcon from '@mui/icons-material/Star';
import Typography from "@mui/material/Typography";
import { ActorDetailsProps } from "../../types/interfaces";

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

const ActorDetails: React.FC<ActorDetailsProps> = (actor) => {

    return (
        <>
            <Typography variant="h5" component="h3">
                {actor.name}
            </Typography>

            <Typography variant="h6" component="p">
                {actor.biography}
            </Typography>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<CakeIcon />} label={`Birthday: ${actor.birthday}`} />
                <Chip icon={<ChildCareIcon />} label={`Born: ${actor.place_of_birth}`} />
                <Chip icon={<StarIcon />} label={`Popularity: ${actor.popularity}`} />
            </Paper>
        </>
    );
};
export default ActorDetails;