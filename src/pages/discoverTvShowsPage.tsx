import React, { useState } from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { getTVShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TvShowsFilterUI, {
  nameFilter,
  genreFilter,
} from "../components/tvShowFilterUI";
import { BaseTvShowProps, DiscoverTvShows } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToTVFavourites';
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Fuse from 'fuse.js';

const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const DiscoverTvShowsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tvShowsPerPage] = useState(8);
  
  const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>("discoverTvShows", getTVShows);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [nameFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "name"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const tvShows = data ? data.results : [];

  const fuse = new Fuse(tvShows, {
    keys: ['name'],
    threshold: 0.5,
  });

  const displayedTvShows = filterFunction(tvShows);

  const filteredTvShows = filterValues[0].value ? 
    fuse.search(filterValues[0].value).map(result => result.item) : 
    displayedTvShows;

  const indexOfLastTvShow = currentPage * tvShowsPerPage;
  const indexOfFirstMovie = indexOfLastTvShow - tvShowsPerPage;
  const currentTvShows = filteredTvShows.slice(indexOfFirstMovie, indexOfLastTvShow);

  const totalPages = Math.ceil(filteredTvShows.length / tvShowsPerPage);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Discover TV Shows"
        tvShows={currentTvShows}
        action={(tvShow: BaseTvShowProps) => {
          return <AddToFavouritesIcon {...tvShow} />
        }}
      />
      <TvShowsFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ 
            backgroundColor: 'maroon',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        />
      </Box>
    </>
  );
};
export default DiscoverTvShowsPage;