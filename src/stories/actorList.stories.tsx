
import type { Meta } from '@storybook/react';
import ActorList from "../components/actorList";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";

import AddToFollowingIcon from "../components/cardIcons/addToFollowing";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";


const meta = {
  title: "Home Page/ActorList",
  component: ActorList,
  decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
      (Story) => <MoviesContextProvider><Story /></MoviesContextProvider>,
    ],
    
} satisfies Meta<typeof ActorList>;
export default meta;


export const Basic = () => {
  const actors = [
    { ...SampleActor, id: 1 },
    { ...SampleActor, id: 2 },
    { ...SampleActor, id: 3 },
    { ...SampleActor, id: 4 },
    { ...SampleActor, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <ActorList
        actors={actors}
        action={(actor) => <AddToFollowingIcon {...actor} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";


