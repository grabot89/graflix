import type { Meta, StoryObj } from '@storybook/react';
import TvShowCard from "../components/tvShowCard";
import SampleTvShow from "./sampleTvShowData";
import { MemoryRouter } from "react-router";
import AddToFavouritesIcon from "../components/cardIcons/addToTVFavourites";
import TvShowsContextProvider from '../contexts/tvShowsContext';

const meta = {
  title: 'TvShowCard',
  component: TvShowCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <TvShowsContextProvider>{Story()}</TvShowsContextProvider>,
  ],
} satisfies Meta<typeof TvShowCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (tvShow ) => <AddToFavouritesIcon {...tvShow} />,
    tvShow: SampleTvShow,

  }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleTvShow, poster_path: undefined };
export const Exceptional: Story = {
  args: {
    tvShow: sampleNoPoster,
    action: (tvShow ) => <AddToFavouritesIcon {...tvShow} />,
  }
};
Exceptional.storyName = "Exception";