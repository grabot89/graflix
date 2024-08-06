import React, { useContext} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { BaseTvShowProps } from "../../types/interfaces"; 
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { TvShowsContext } from "../../contexts/tvShowsContext";


const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface TvShowCardProps {
  tvShow: BaseTvShowProps;
  action: (m: BaseTvShowProps) => React.ReactNode;
}

const TvShowCard: React.FC<TvShowCardProps> = ({tvShow, action}) => {
  const { favourites } = useContext(TvShowsContext);//NEW

const isFavourite = favourites.find((id) => id === tvShow.id)? true : false;//NEW
 
  return (
    <Card sx={styles.card}>
    <CardHeader
      avatar={
        isFavourite ? (   //CHANGED
          <Avatar sx={styles.avatar}>
            <FavoriteIcon />
          </Avatar>
        ) : null
      }
      title={
        <Typography variant="h5" component="p">
          {tvShow.name}{" "}
        </Typography>
      }
    />
      <CardMedia
        sx={styles.media}
        image={
          tvShow.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {tvShow.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {tvShow.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {action(tvShow)}
        <Link to={`/tvshows/${tvShow.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default TvShowCard;