import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import ActorList from "../actorList";
import { ActorListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const ActorListPageTemplate: React.FC<ActorListPageTemplateProps> = ({ actors, title, action })=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
      <ActorList action={action} actors={actors}></ActorList>
      </Grid>
    </Grid>
  );
}
export default ActorListPageTemplate;