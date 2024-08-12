import React from "react";
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
  const displayedTvShows = filterFunction(tvShows);

  return (
    <>
      <PageTemplate
        title="Discover TV Shows"
        tvShows={displayedTvShows}
        action={(tvShow: BaseTvShowProps) => {
          return <AddToFavouritesIcon {...tvShow} />
        }}
      />
      <TvShowsFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default DiscoverTvShowsPage;