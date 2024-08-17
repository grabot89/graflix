import type { Meta, StoryObj } from '@storybook/react';
import MediaHeader from "../components/headerMedia";
import SampleMovie from "./sampleMovieData";
import { MemoryRouter } from "react-router";

import React from 'react';

const meta = {
    title: "Movie Details Page/MediaHeader",
    component: MediaHeader,
    decorators: [
        (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    ],
} satisfies Meta<typeof MediaHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: {
        ...SampleMovie
    }
};
Basic.storyName = "Default";