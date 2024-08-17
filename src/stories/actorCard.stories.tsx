import type { Meta, StoryObj } from '@storybook/react';
import ActorCard from "../components/actorCard";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import ActorsContextProvider from "../contexts/actorsContext";
import AddToFollowingIcon from '../components/cardIcons/addToFollowing';

const meta = {
  title: 'Home Page/ActorCard',
  component: ActorCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <ActorsContextProvider>{Story()}</ActorsContextProvider>,
  ],
} satisfies Meta<typeof ActorCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (actor ) => <AddToFollowingIcon {...actor} />,
    actor: SampleActor,

  }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleActor, poster_path: undefined };
export const Exceptional: Story = {
  args: {
    actor: sampleNoPoster,
    action: (actor ) => <AddToFollowingIcon {...actor} />,
  }
};
Exceptional.storyName = "Exception";